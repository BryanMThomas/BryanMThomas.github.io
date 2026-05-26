#!/usr/bin/env python3
"""Generate images with Gemini 'Nano Banana' (gemini-2.5-flash-image).
Reads GEMINI_API_KEY from ~/.gemini/.env. Never prints the key.
Usage: python3 nanobanana.py "<prompt>" <output.png> [model] [input_image.png]
"""
import sys, os, json, base64, urllib.request, urllib.error, pathlib

def load_key():
    env = pathlib.Path.home() / ".gemini" / ".env"
    key = None
    for line in env.read_text().splitlines():
        line = line.strip()
        if line.startswith("GEMINI_API_KEY="):
            key = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not key:
        for line in env.read_text().splitlines():
            if line.strip().startswith("GOOGLE_API_KEY="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    return key

def main():
    prompt = sys.argv[1]
    out = sys.argv[2]
    model = sys.argv[3] if len(sys.argv) > 3 else "gemini-2.5-flash-image"
    input_img = sys.argv[4] if len(sys.argv) > 4 else None
    key = load_key()
    if not key:
        print("ERROR: no key found"); sys.exit(2)

    parts = [{"text": prompt}]
    if input_img and os.path.exists(input_img):
        with open(input_img, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        parts.append({"inline_data": {"mime_type": "image/png", "data": b64}})

    body = json.dumps({
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["Image"]},
    }).encode()

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    req = urllib.request.Request(url, data=body, headers={
        "x-goog-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.load(r)
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:400]}"); sys.exit(1)

    # find inline image data
    img_b64 = None
    for cand in data.get("candidates", []):
        for p in cand.get("content", {}).get("parts", []):
            inline = p.get("inlineData") or p.get("inline_data")
            if inline and inline.get("data"):
                img_b64 = inline["data"]; break
        if img_b64: break
    if not img_b64:
        print("NO IMAGE in response:", json.dumps(data)[:400]); sys.exit(1)

    pathlib.Path(out).parent.mkdir(parents=True, exist_ok=True)
    with open(out, "wb") as f:
        f.write(base64.b64decode(img_b64))
    print(f"OK model={model} -> {out} ({os.path.getsize(out)} bytes)")

if __name__ == "__main__":
    main()
