import axios from "axios";
const SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v1/";
// const SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v2/"; // for second part

// This API request queries a simple graph data structure
// The graph is simple. Edges are undirected & unweighted
// It returns the neighbors of 'queryNode' in a list
const fetchNeighbors = async (queryNode) => {
  const response = await axios.get(
    `${SERVER_URL}/get_neighbors?node=${queryNode}`
  );
  console.log(response.data);
  return response.data;
};

fetchNeighbors("A");

// queries a graph data structure
// return a list of all the nodes in the graph, sorted by their distance from the root node A
