import requests

response = requests.get("https://nooks-takehome-server.ngrok.io/get_neighbors?node=A");
print (response.json())