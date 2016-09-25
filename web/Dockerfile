FROM node:6.5.0



RUN mkdir sch-web

RUN npm install nodemon -g

WORKDIR /sch-web
ADD package.json /sch-web/package.json
RUN npm install

ADD server /sch-web/server
ADD webpack.config.js /sch-web/webpack.config.js

EXPOSE 3000
EXPOSE 1337

CMD npm start
