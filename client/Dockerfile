FROM node:lts-alpine AS build
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . .

ARG PORT
ARG REACT_APP_BASE_URL

ENV PORT=3001
ENV REACT_APP_BASE_URL=http://localhost:3000/api

RUN npm run build

FROM nginx:mainline-alpine3.18-perl
COPY --link nginx.conf /etc/nginx/conf.d/default.conf
COPY --link --from=build usr/src/app/build/ /usr/share/nginx/html
EXPOSE 8080