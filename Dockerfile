FROM node:latest

WORKDIR /app
COPY . .

RUN npm init -y
RUN npm install express

CMD ["npm", "start"]
EXPOSE 4000