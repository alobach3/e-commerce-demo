# stage 1 — build
FROM node:24-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install \
    && npm install react-router-dom

COPY . .
ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

RUN npm run build

# stage 2 — production
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]