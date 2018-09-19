FROM node:9.8.0-slim as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production; yarn build

FROM node:9.8.0-slim

ENV NODE_ENV 'production'

WORKDIR /app

COPY --from=builder /app .
COPY . .

CMD ["yarn", "start"]
