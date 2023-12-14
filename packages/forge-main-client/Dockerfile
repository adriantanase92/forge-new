FROM node:lts-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:lts-alpine AS production
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 80
CMD ["node", "."]