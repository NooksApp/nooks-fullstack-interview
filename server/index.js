import express from "express";
import { readFile } from "node:fs/promises";
import ngrok from "ngrok";

const app = express();
const port = 5001;

const graph = JSON.parse(await readFile("data/graph.json"));
let currentSynchronousRequests = 0;
let currentlyRateLimited = false;

await ngrok.authtoken("27o727cR7Gvf0OVv0ZObf5E2gxU_5wx7JTQFoFKyZuXeSJe1d");
const publicUrl = await ngrok.connect({
  addr: port,
  subdomain: "nooks-takehome-server",
});

const get_neighbors = async (node, config) => {
  if (currentSynchronousRequests > config.RATE_LIMIT) {
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
  }, config.RATE_LIMIT_TIMEOUT);

  if (!graph.nodes.includes(node)) {
    res.sendStatus(404);
    return;
  }

  await new Promise((r) => setTimeout(r, config.DELAY));

  if (Math.random() < config.CHANCE_TO_FAIL) {
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
};

app.get("api/v1/get_neighbors", async (req, res) => {
  await get_neighbors(req.query.node, {
    DELAY: 0,
    RATE_LIMIT: 100000,
    RATE_LIMIT_TIMEOUT: 1000,
    CHANCE_TO_FAIL: 0.0,
  });
});

app.get("api/v2/get_neighbors", async (req, res) => {
  await get_neighbors(req.query.node, {
    DELAY: 3000,
    RATE_LIMIT: 100000,
    RATE_LIMIT_TIMEOUT: 1000,
    CHANCE_TO_FAIL: 0.0,
  });
});

app.get("api/v3/get_neighbors", async (req, res) => {
  await get_neighbors(req.query.node, {
    DELAY: 3000,
    RATE_LIMIT: 5,
    RATE_LIMIT_TIMEOUT: 1000,
    CHANCE_TO_FAIL: 0.0,
  });
});

app.get("api/v4/get_neighbors", async (req, res) => {
  await get_neighbors(req.query.node, {
    DELAY: 3000,
    RATE_LIMIT: 5,
    RATE_LIMIT_TIMEOUT: 1000,
    CHANCE_TO_FAIL: 0.4,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on public URL ${publicUrl}`);
});
