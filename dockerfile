FROM node:20-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production_image

WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/dist/ /app/react-app/dist/

EXPOSE 8080

COPY package.json .

RUN npm install

COPY vite.config.js .

EXPOSE 8080

CMD ["npm", "run", "preview"]