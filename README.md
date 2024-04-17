# Receipt-Processor

## How to run application:
```
docker build -t receipt .
docker run -p 4000:4000 receipt
```
Then, using Postman or some other tool to send HTTP requests, first send a POST request with your specific receipt. Then, you may send a GET request using that to retrieve the point value of that receipt.
