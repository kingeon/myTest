FROM mhart/alpine-node:10
LABEL Name=microservice.sorting Version=1.0.0 

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
RUN cd /usr/src/app \
  && npm config set strict-ssl false \
  && npm config set registry=https://registry.npm.taobao.org \
  && npm install -g typescript \
  && npm install -g egg-scripts \
  && npm install -g swagger-jsdoc \
  && npm install \
  && npm run tsc 

WORKDIR /usr/src/app

CMD npm run start