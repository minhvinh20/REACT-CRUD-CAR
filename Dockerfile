# # pull official base image
# FROM node:13.12.0-alpine
# # set working directory
# WORKDIR /app
# # docker
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install 
# # add app
# COPY . ./
# # start app
# CMD ["npm", "start"]

# #docker-compose up --build



#Docker with nginx
FROM nginx:alpine
LABEL author="Sara Vieira"
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
#docker build --rm -f Dockerfile -t nginx_react .
#docker run --rm -d -p 80:80 nginx_react