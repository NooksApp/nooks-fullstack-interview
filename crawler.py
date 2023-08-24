import requests

SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v1"
# SERVER_URL = "https://nooks-live-takehome.nooks.in/api/v2" # for second part

"""
This API request queries a simple graph data structure
Edges are undirected & unweighted
It returns the neighbors of 'queryNode' in a list
"""


def fetchNeighbors(queryNode):
    response = requests.get(f"{SERVER_URL}/get_neighbors?node={queryNode}")
    return response.json()


print("A:", fetchNeighbors("A"))
print("B:", fetchNeighbors("B"))
print("C:", fetchNeighbors("C"))
print("D:", fetchNeighbors("D"))

"""
return a list of all the nodes in the graph, sorted by their distance from the root node A
e.g. [A, B, C, D, J, E, DD, CD, ...]
"""
