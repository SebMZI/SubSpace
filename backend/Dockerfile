FROM node:24
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
CMD ["npm", "run", "start"]