import axios from "axios";

const SERVER_URL = "https://nooks-takehome-server.ngrok.io";

// This API request gets the neighbors of node A, or fails.
const response = await axios.get(`${SERVER_URL}/get_neighbors?node=A`);

// return a list of all the nodes in the graph, sorted by their distance from the root node A
