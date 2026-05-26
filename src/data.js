import data from './data.json';

export default data;

export const nodesById = Object.fromEntries(data.nodes.map((n) => [n.id, n]));

export function neighborsOf(id) {
  const ids = new Set();
  for (const e of data.edges) {
    if (e.a === id) ids.add(e.b);
    if (e.b === id) ids.add(e.a);
  }
  return [...ids].map((i) => nodesById[i]);
}
