FROM node:16.19.1-alpine AS build

RUN apk add --no-cache g++ make py3-pip
# RUN apt-get update && apt-get install -y ffmpeg

FROM build

COPY ./ ./server

WORKDIR /server

RUN npm install -g npm@latest && \
    npm install
EXPOSE 5001

CMD ["npm", "run", "start"]
