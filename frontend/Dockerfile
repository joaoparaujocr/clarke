FROM node:20

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

COPY ./frontend .
COPY .env .

EXPOSE 3000

USER root

CMD ["npm", "run", "dev"]