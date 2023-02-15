FROM node:18-alpine3.16 As development

# Create app directory
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install --network-timeout 100000
COPY --chown=node:node . .

USER node


FROM node:18-alpine3.16 As build

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build
RUN npx prisma generate

USER node

FROM node:18-alpine3.16 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
 
CMD [ "node", "dist/main.js" ]