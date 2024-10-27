FROM node:20-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
# COPY yarn.lock vite.config.ts tailwind.config.js ./
COPY . .
RUN yarn build
EXPOSE 4173
CMD ["yarn", "preview"]
