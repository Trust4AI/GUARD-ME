FROM node:20-alpine

COPY ./docs/openapi /app/docs/openapi

WORKDIR /app/src

COPY ./src .

RUN npm install
RUN npm run build

EXPOSE 8001

CMD [ "npm", "start" ]