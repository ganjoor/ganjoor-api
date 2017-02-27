FROM node:7

COPY ../../package.json /data/ganjoor-api/package.json
COPY ../../node_modules/ /data/ganjoor-api/node_modules
RUN cd /data/ganjoor-api && npm prune --production=true

COPY ../../dist/ /data/ganjoor-api/dist

EXPOSE 4003

USER root
WORKDIR /data/ganjoor-api
ENV NODE_ENV production

CMD ["npm", "run", "start:production"]
