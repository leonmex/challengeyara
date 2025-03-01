ARG NODE_VERSION=18
ARG NGINX_VERSION=1.21
ARG ALPINE_VERSION=3.18

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as base
WORKDIR /usr/src/app
COPY package*.json /usr/src/app

RUN set -eux \
    && apk update \
    && apk add \
    --no-cache \
    nodejs \
    yarn \
    git \
    wget \
    cronie \
    ;

RUN yarn install

FROM base AS graphql
WORKDIR /usr/src/app

RUN npm install
RUN npm install -g pnpm

COPY ./graphql/ /usr/src/app

COPY docker/node/graphql/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]

FROM base as webapp

RUN apk update --no-cache && apk add --no-cache curl
RUN npm install

COPY . /usr/src/app

COPY docker/node/app/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]

FROM base as typescript

RUN npm install

COPY ./typescript /usr/src/app

COPY docker/node/typescript/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
