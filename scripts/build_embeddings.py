#!/usr/bin/env python3
"""Embed every node (work + personal) with Gemini, project to 3D via PCA.
Proximity in the output = genuine semantic relatedness. Writes src/data.json.
Reads GEMINI_API_KEY from ~/.gemini/.env. Never prints the key.
"""
import json, base64, urllib.request, urllib.error, pathlib, sys
import numpy as np

EMBED_MODEL = "gemini-embedding-001"
SCALE = 7.0  # final coordinate radius for the 3D scene

# cluster -> color (legibility); POSITION comes from embeddings, not cluster.
CLUSTERS = {
    "ai":         {"label": "AI & Agents",      "color": "#3fd0e0"},
    "product":    {"label": "Products",         "color": "#f6b352"},
    "experience": {"label": "Experience",       "color": "#8a7cf0"},
    "interest":   {"label": "Life & Interests", "color": "#5fd38b"},
}

# id, label, cluster, blurb (panel text), url (optional), embed (text to embed)
NODES = [
    # --- AI & Agents ---
    {"id": "openclaw", "label": "OpenClaw", "cluster": "ai",
     "blurb": "An autonomous 8-agent personal-ops fleet I designed and run: an orchestrator delegating to specialized agents over MCP tool-calling, multi-model via OpenRouter, cron-scheduled.",
     "url": "https://github.com/BryanMThomas/openclaw-skeleton",
     "embed": "OpenClaw: an autonomous multi-agent system, a fleet of eight specialized AI agents coordinated by an orchestrator agent over MCP tool calling, scheduled with cron, multi-model via OpenRouter. Agent orchestration, automation, autonomy, AI infrastructure."},
    {"id": "triphelm-ai", "label": "TripHelm (Hilo)", "cluster": "ai",
     "blurb": "TripHelm's AI layer is an MCP server that exposes the whole itinerary as tool-callable data — so any AI client (Claude, ChatGPT, Perplexity) can plan a trip straight onto the canvas. Its assistant 'Hilo' is named after my corgi.",
     "url": "https://github.com/BryanMThomas/triphelm-showcase",
     "embed": "TripHelm AI assistant named Hilo, a Model Context Protocol MCP server that exposes trips and itinerary blocks as tool-callable structured data, multi-client AI travel planning through Claude ChatGPT and Perplexity, structured tool calling, the itinerary as a tool."},
    {"id": "mcp", "label": "MCP & tool-calling", "cluster": "ai",
     "blurb": "Model Context Protocol servers, sub-agents, and tool-calling — the connective tissue of agentic systems.",
     "embed": "Model Context Protocol MCP, tool calling, function calling, sub-agents, agent skills, connecting language models to tools and data."},
    {"id": "evals", "label": "Evaluation frameworks", "cluster": "ai",
     "blurb": "Evaluation and experimentation platforms that let non-engineers run prompt experiments and measure quality.",
     "embed": "LLM evaluation frameworks, evals, experimentation platforms, prompt experiments, measuring model quality, transcript analysis."},
    {"id": "prompting", "label": "Prompt engineering", "cluster": "ai",
     "blurb": "Advanced prompt engineering and conversation design for production LLM products.",
     "embed": "Advanced prompt engineering, conversation design, system prompts, in-context learning, large language models."},
    {"id": "rag", "label": "RAG & embeddings", "cluster": "ai",
     "blurb": "Retrieval-augmented generation, embeddings, and vector search — the technique this very page is built on.",
     "embed": "Retrieval augmented generation RAG, embeddings, vector databases, semantic search, vector similarity, nearest neighbors."},
    {"id": "voice", "label": "Real-time voice AI", "cluster": "ai",
     "blurb": "Prototyped a real-time voice experience with the OpenAI Realtime API + WebRTC and a backstage-supervisor agent pattern.",
     "embed": "Real-time voice AI, OpenAI Realtime API, WebRTC, speech, conversational voice agents, low latency audio."},
    {"id": "safety", "label": "AI safety layer", "cluster": "ai",
     "blurb": "A deterministic, pre-model safety layer (policy-violation engine, content filtering) that cleared enterprise responsible-AI review.",
     "embed": "AI safety, responsible AI, content filtering, policy violation detection, guardrails, deterministic pre-model evaluation, trust and safety."},

    # --- Products / Ventures ---
    {"id": "triphelm", "label": "TripHelm", "cluster": "product",
     "blurb": "An AI travel-planning product that builds trips minute by minute. Founder. Live at triphelm.com.",
     "url": "https://triphelm.com",
     "embed": "TripHelm, AI travel planning product, plan trips minute by minute, itineraries, vacations, travel app, founder, startup, SaaS."},
    {"id": "bryxbids", "label": "BryxBids", "cluster": "product",
     "blurb": "A multi-tenant SaaS proposal tool for contractors — visual editor, pixel-accurate PDF export, Stripe billing. Founder.",
     "url": "https://bryxbids.com",
     "embed": "BryxBids, contractor proposal SaaS, visual proposal editor, drag and drop canvas, PDF export, Stripe billing, multi-tenant, Next.js Supabase, founder, small business."},
    {"id": "codecapital", "label": "Code & Capital", "cluster": "product",
     "blurb": "My content endeavor — building in public about engineering, AI, and entrepreneurship.",
     "embed": "Code and Capital, content creation, YouTube, building in public, teaching engineering AI and entrepreneurship, creator."},

    # --- Experience ---
    {"id": "eve", "label": "Microsoft — EVE (Applied AI)", "cluster": "experience",
     "blurb": "Sr. Applied AI Engineer. Pitched an AI alternative to employee surveys at a hackathon → an executive-sponsored product, technical lead of the engineering squad that shipped it.",
     "embed": "Microsoft Employee Voice and Experience, senior applied AI engineer, conversational AI for employee listening, technical lead, hackathon to product, 10 engineer squad, 15000 conversations."},
    {"id": "vivapulse", "label": "Microsoft — Viva Pulse", "cluster": "experience",
     "blurb": "Software Engineer 2. Owned multi-survey scheduling end-to-end — a top-retention feature — and led a monolith → microservices transition.",
     "embed": "Microsoft Viva Pulse, software engineer, backend, multi-survey scheduling, notifications, monolith to microservices architecture."},
    {"id": "azurearc", "label": "Microsoft — Azure ARC", "cluster": "experience",
     "blurb": "Software Engineer. Built a desktop app connecting on-prem devices to Azure, deployed across enterprise environments.",
     "embed": "Microsoft Azure ARC, Windows Server, hybrid cloud, desktop application, on-premises devices, enterprise endpoints, distributed systems."},
    {"id": "godaddy", "label": "GoDaddy", "cluster": "experience",
     "blurb": "Full Stack Software Engineer on the CRM platform behind a large share of company revenue. Event-driven AWS integrations, React features.",
     "embed": "GoDaddy, full stack software engineer, CRM platform, AWS SNS SQS event-driven, React, automation workflows, call center."},
    {"id": "asu", "label": "Arizona State University", "cluster": "experience",
     "blurb": "B.S. Computer Science, Magna Cum Laude. Phoenix, Arizona.",
     "embed": "Arizona State University ASU, bachelor of science computer science, magna cum laude, Phoenix Arizona, college education."},

    # --- Life & Interests ---
    {"id": "hilo", "label": "Hilo (my corgi)", "cluster": "interest",
     "blurb": "My corgi, Hilo. TripHelm's AI assistant is named after him. 🐕",
     "embed": "Hilo my corgi dog, pet, corgi puppy, companion, the TripHelm AI assistant is named after my dog Hilo."},
    {"id": "suns", "label": "Phoenix Suns", "cluster": "interest",
     "blurb": "NBA. Phoenix Suns fan.",
     "embed": "Phoenix Suns NBA basketball team, sports fan, Phoenix Arizona basketball."},
    {"id": "cardinals", "label": "Arizona Cardinals", "cluster": "interest",
     "blurb": "NFL. Arizona Cardinals.",
     "embed": "Arizona Cardinals NFL football team, Phoenix Arizona football, sports fan."},
    {"id": "seahawks", "label": "Seattle Seahawks", "cluster": "interest",
     "blurb": "NFL. Seattle Seahawks — home team now.",
     "embed": "Seattle Seahawks NFL football team, Seattle Washington football, sports fan."},
    {"id": "steelers", "label": "Pittsburgh Steelers", "cluster": "interest",
     "blurb": "NFL. Pittsburgh Steelers.",
     "embed": "Pittsburgh Steelers NFL football team, football, sports fan."},
    {"id": "dirtbike", "label": "Dirtbiking", "cluster": "interest",
     "blurb": "Riding dirt bikes off-road — desert trails, adventure.",
     "embed": "Dirtbiking, dirt bikes, off-road riding, motocross, desert trails, adventure motorsport, Arizona outdoors."},
    {"id": "ebike", "label": "Throttle e-bike", "cluster": "interest",
     "blurb": "Commute to work on an electric bike that hits 45 mph on the throttle.",
     "embed": "Electric bike e-bike, throttle ebike that goes 45 mph, commuting to work by bike, riding, two wheels."},
    {"id": "camping", "label": "Camping", "cluster": "interest",
     "blurb": "Camping outdoors — tents, campfires, getting out into nature.",
     "embed": "Camping outdoors, tents, campfires, nature, wilderness, Arizona desert and mountains, the outdoors."},
    {"id": "golf", "label": "Golf", "cluster": "interest",
     "blurb": "Playing golf.",
     "embed": "Golf, playing golf, golf course, fairways, recreation sport."},
    {"id": "beach", "label": "OC / SD beaches", "cluster": "interest",
     "blurb": "Beach vacations in Orange County & San Diego — Laguna Beach and Dana Point are favorites.",
     "embed": "Beach vacations Orange County and San Diego, Laguna Beach, Dana Point, ocean coastline, surfing waves, relaxing by the sea, California travel."},
    {"id": "phoenix", "label": "Phoenix, AZ (home)", "cluster": "interest",
     "blurb": "Born and raised in Phoenix, Arizona.",
     "embed": "Phoenix Arizona, hometown, born and raised, desert city, the Valley, Arizona roots."},
]


def load_key():
    env = pathlib.Path.home() / ".gemini" / ".env"
    for line in env.read_text().splitlines():
        if line.strip().startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    for line in env.read_text().splitlines():
        if line.strip().startswith("GOOGLE_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def embed(text, key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{EMBED_MODEL}:embedContent"
    body = json.dumps({"model": f"models/{EMBED_MODEL}",
                       "content": {"parts": [{"text": text}]}}).encode()
    req = urllib.request.Request(url, data=body, headers={
        "x-goog-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    return data["embedding"]["values"]


def main():
    key = load_key()
    if not key:
        print("ERROR: no key"); sys.exit(2)

    print(f"Embedding {len(NODES)} nodes with {EMBED_MODEL} ...")
    vecs = []
    for n in NODES:
        vecs.append(embed(n["embed"], key))
    X = np.array(vecs, dtype=float)
    print(f"  embeddings shape: {X.shape}")

    # PCA -> 3D
    Xc = X - X.mean(axis=0)
    U, S, Vt = np.linalg.svd(Xc, full_matrices=False)
    coords = U[:, :3] * S[:3]
    coords = coords / np.abs(coords).max() * SCALE  # scale to scene radius

    out_nodes = []
    for i, n in enumerate(NODES):
        out_nodes.append({
            "id": n["id"], "label": n["label"], "cluster": n["cluster"],
            "blurb": n["blurb"], "url": n.get("url"),
            "x": round(float(coords[i, 0]), 3),
            "y": round(float(coords[i, 1]), 3),
            "z": round(float(coords[i, 2]), 3),
        })

    # nearest-neighbor edges (cosine) for "related" lines on hover
    norm = X / (np.linalg.norm(X, axis=1, keepdims=True) + 1e-9)
    sim = norm @ norm.T
    np.fill_diagonal(sim, -1)
    edges = []
    for i in range(len(NODES)):
        j = int(np.argmax(sim[i]))
        a, b = sorted([NODES[i]["id"], NODES[j]["id"]])
        edges.append({"a": a, "b": b, "w": round(float(sim[i, j]), 3)})
    # dedupe edges
    seen, uniq = set(), []
    for e in edges:
        k = (e["a"], e["b"])
        if k not in seen:
            seen.add(k); uniq.append(e)

    out = {"clusters": CLUSTERS, "nodes": out_nodes, "edges": uniq,
           "meta": {"model": EMBED_MODEL, "dims": int(X.shape[1]),
                    "method": "PCA(3) on real Gemini embeddings"}}
    out_path = pathlib.Path(__file__).resolve().parent.parent / "src" / "data.json"
    out_path.write_text(json.dumps(out, indent=2))
    print(f"  wrote {out_path} ({len(out_nodes)} nodes, {len(uniq)} edges)")

    # quick sanity: show each node's nearest neighbor
    print("\nNearest-neighbor sanity check (proximity = relatedness):")
    for i, n in enumerate(NODES):
        j = int(np.argmax(sim[i]))
        print(f"  {n['label']:28s} ~ {NODES[j]['label']}")


if __name__ == "__main__":
    main()
