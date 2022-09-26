FROM node:18.9.0-alpine3.16
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY . .
RUN pnpm install
RUN pnpm --filter hhfrontend run build
EXPOSE 4000
CMD [ "pnpm", "--filter", "hhapi", "start" ]

