FROM node:12.16.1-alpine

# To Build: 
# 1. npm run deploy-to-docker
# docker run --rm --name cartolicious-client -p 8080:3000 -e NODE_ENV=production -e NAMESPACE=app -ti defiantgoat/cartolicious-client:latest

# Change working directory
WORKDIR /app

COPY package*.json ./

# Install npm production packages 
RUN npm install --production

COPY dist_prod /app/dist_prod

EXPOSE 3000

USER node

CMD ["npm", "run", "launch-production"]
