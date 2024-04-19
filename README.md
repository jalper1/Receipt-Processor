# Receipt-Processor

## How to run application:
```
docker build -t receipt .
docker run -p 4000:4000 receipt
```
Then, using Postman or another tool that can send HTTP requests, first send a POST request with your specific receipt with the JSON as the body of the request. This will generate an id for that receipt and send a response with that id. Then, send a GET request using that specific id to retrieve the point value of that receipt.
