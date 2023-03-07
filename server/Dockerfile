FROM node:18
COPY . /app
WORKDIR /app
RUN npm install && npm run start
EXPOSE 4000
CMD [ "nodemon", "index.js" ]






