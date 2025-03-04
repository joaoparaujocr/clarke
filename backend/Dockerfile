FROM node:20-alpine

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

COPY ./backend .
COPY .env .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]