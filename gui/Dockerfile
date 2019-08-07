FROM node

WORKDIR /home/ec2-user/app/gui

COPY package*.json ./

RUN npm config set registry="http://registry.npmjs.org/" \
    && npm config set strict-ssl false \
    && npm i node-pre-gyp 
	
RUN npm config set registry="http://registry.npmjs.org/" \
&& npm config set strict-ssl false \
&& npm install

COPY . /home/ec2-user/app/gui

EXPOSE 4000
CMD [ "npm", "run", "start" ]