# Receipt-Processor

## How to run application:
```
docker build -t receipt .
docker run -p 4000:4000 receipt
```
Then, using Postman or some other tool to send HTTP requests, first send a POST request with your specific receipt. This will generate an id for that receipt. Then, you may send a GET request using that id to retrieve the point value of that receipt.
