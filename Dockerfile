FROM node:13

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build --production

EXPOSE 5000
CMD [ "yarn", "serve", "-s", "build" ]
