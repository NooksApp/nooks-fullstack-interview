import express from "express";
import { readFile } from "node:fs/promises";
import ngrok from "ngrok";

const app = express();
const port = 3001;

const graph = JSON.parse(await readFile("data/graph.json"));
const DELAY = 2000;
const CHANCE_TO_FAIL = 0.0;

const RATE_LIMIT = 100000;
const RATE_LIMIT_TIMEOUT = 1000;
let currentSynchronousRequests = 0;
let currentlyRateLimited = false;

await ngrok.authtoken("27o727cR7Gvf0OVv0ZObf5E2gxU_5wx7JTQFoFKyZuXeSJe1d");
const publicUrl = await ngrok.connect({
  addr: port,
  subdomain: "nooks-takehome-server",
});

app.get("/get_neighbors", async (req, res) => {
  if (currentSynchronousRequests > RATE_LIMIT) {
    currentlyRateLimited = true;
    setTimeout(() => {
      currentlyRateLimited = false;
    }, 10000);
  }
  if (currentlyRateLimited) {
    res.sendStatus(429);
    return;
  }
  currentSynchronousRequests += 1;
  setTimeout(() => {
    currentSynchronousRequests -= 1;
  }, RATE_LIMIT_TIMEOUT);

  const node = req.query.node;
  if (!graph.nodes.includes(node)) {
    res.sendStatus(404);
    return;
  }

  await new Promise((r) => setTimeout(r, DELAY));

  if (Math.random() < CHANCE_TO_FAIL) {
    res.sendStatus(500);
    return;
  }

  const neighbors = [
    ...graph.edges
      .filter((edge) => edge.source === node)
      .map((edge) => edge.target),
    ...graph.edges
      .filter((edge) => edge.target === node)
      .map((edge) => edge.source),
  ];
  res.send(neighbors);
});

app.listen(port, () => {
  console.log(`Example app listening on public URL ${publicUrl}`);
});
