FROM node:lts-slim

WORKDIR /home/app
COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npm install
RUN npm run db:push
RUN npm run build

EXPOSE 3000


CMD ["npm", "run", "start"]
