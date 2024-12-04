FROM node:18-alpine
WORKDIR /3MTRAINING
COPY public/ /3MTRAINING/public
COPY src/ /3MTRAINING/src
COPY package.json /3MTRAINING/
RUN npm install --force
COPY . .
CMD ["npm", "start"]
