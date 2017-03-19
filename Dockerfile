FROM node:7

COPY *.json /data/ganjoor-api/
COPY *.yaml /data/ganjoor-api/
COPY src/ /data/ganjoor-api/src
COPY typings/ /data/ganjoor-api/typings

RUN cd /data/ganjoor-api && npm install --silent
RUN cd /data/ganjoor-api && npm run build

EXPOSE 4003

USER root
WORKDIR /data/ganjoor-api
ENV NODE_ENV production

CMD ["npm", "run", "start:production"]
