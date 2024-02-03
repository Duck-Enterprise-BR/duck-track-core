FROM nginx:latest
MAINTAINER Rafael Dalsenter
COPY /nginx/config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
