FROM node:latest

WORKDIR /app
COPY . .

RUN npm install
RUN npm install express

CMD ["npm", "start"]
EXPOSE 4000