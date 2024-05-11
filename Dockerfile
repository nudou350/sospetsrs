FROM node:20.10.0-alpine As build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build --configuration=production

FROM node:20.10.0-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/sospetsrs/server ./
COPY --from=build /app/src/dist/sospetsrs/browser /usr/browser
CMD node server.mjs
EXPOSE 4000