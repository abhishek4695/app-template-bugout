# app-template-bugout

Template to start a project using node.js to connect to a <a href="https://github.com/chr15m/bugout">Bugout</a> server. This is an implementaion of the Bugout client in Node.

Steps to make it work:

1. Clone this repository
2. cd to app-template-bugout
3. Open terminal and type npm install
4. Either open the server.html in a browser window or run this command in terminal : node server.js - this will echo an address, we will use this to connect to server.
5. Run this is a separate terminal window (if running server.js) : node test-client.js
6. You should see this in terminal : Example app listening on port 3000
7. To communicate with the client, we need to give it the server's address. Run the following command in terminal (make sure curl is installed, if on windows, run the command from a bash terminal like git-bash):

curl --location --request POST 'http://localhost:3000/setAddress' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "<Server Address Here - we got from step 4>"
}'

This will take 5-10 seconds for the connection to be established. Once connected verify connection by hitting a GET request on localhost:3000/ or just enter localhost:3000 in a browser window. If you can see connected: true, the connection is successful.

8. Make a RPC call by hitting the following request using cURL:

curl --location --request POST 'http://localhost:3000/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "num1": 21,
    "num2": 34
}'

This endpoint just returns the sum of num1 and num2, along with a timestamp.

What is the Point of this?

This is just a proof of concept which can help in connecting to a BugOut server from another Node Application or even a normal app using REST API calls.
