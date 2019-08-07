FROM node

WORKDIR /home/ec2-user/app/api

COPY package*.json ./

RUN npm config set registry="http://registry.npmjs.org/" \
    && npm config set strict-ssl false \
    && npm i node-pre-gyp 
	
RUN npm config set registry="http://registry.npmjs.org/" \
&& npm config set strict-ssl false \
&& npm install

COPY . /home/ec2-user/app/api

EXPOSE 3000
CMD [ "npm", "run", "start" ]