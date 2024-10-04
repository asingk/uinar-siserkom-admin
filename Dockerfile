FROM nginx:stable-alpine
LABEL authors="asingk"

RUN apk update && \
	apk add --no-cache tzdata

ENV TZ=Asia/Jakarta

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Bundle app source
COPY dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
