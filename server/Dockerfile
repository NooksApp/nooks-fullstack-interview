FROM node:21.5-slim AS build

FROM build

COPY ./ ./server

WORKDIR /server

RUN npm install -g npm@latest && \
    npm install
EXPOSE 5001

CMD ["npm", "run", "start"]
