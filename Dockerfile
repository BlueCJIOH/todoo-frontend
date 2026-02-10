FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install --silent
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
