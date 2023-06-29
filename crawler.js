import axios from "axios";

const SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v1";
// const SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v2"; // for second part

/* This API request queries a simple graph data structure
   Edges are undirected & unweighted
   It returns the neighbors of 'queryNode' in a list
*/
const fetchNeighbors = async (queryNode) => {
  const response = await axios.get(
    `${SERVER_URL}/get_neighbors?node=${queryNode}`
  );
  return response.data;
};

fetchNeighbors("A").then((value) => {
  console.log("A:", value);
  fetchNeighbors("B").then((value) => console.log("B:", value));
  fetchNeighbors("C").then((value) => console.log("C:", value));
  fetchNeighbors("D").then((value) => console.log("D:", value));
});

// return a list of all the nodes in the graph, sorted by their distance from the root node A
// e.g. [A, B, C, D, J, E, DD, CD, ...]
