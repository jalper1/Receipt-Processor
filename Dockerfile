FROM node:latest

WORKDIR /app
COPY . .

RUN npm init -y
RUN npm install express
RUN npm start

EXPOSE 4000

CMD ["cd", "./receipt-processor", "&&", "npm", "install", "&&", "npm", "run", "dev"]