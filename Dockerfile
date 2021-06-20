FROM node:14.17-alpine

EXPOSE 4000

WORKDIR /opt/app
COPY . ./
RUN npm install

CMD ["npm", "start"]