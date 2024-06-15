FROM node:20-alpine as build-step
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build

FROM node:20-alpine as run-step
WORKDIR /app
COPY --from=build-step /app/dist /app/dist
COPY --from=build-step /app/package*.json /app
RUN npm i --omit=dev ## Installation uniquement des dépendances de production
CMD npm start