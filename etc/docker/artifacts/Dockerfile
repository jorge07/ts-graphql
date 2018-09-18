FROM node:9.8.0-slim as builer

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

FROM node:9.8.0-slim

WORKDIR /app

COPY --from=builder /app .
COPY . .

CMD ["yarn", "start"]
