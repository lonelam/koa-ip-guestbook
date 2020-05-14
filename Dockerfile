FROM node:latest
COPY . /app
WORKDIR /app
RUN yarn
RUN touch /var/log/koa-ip-questbook.log && ln -sf /dev/stdout /var/log/koa-ip-questbook.log
EXPOSE 3000
CMD node . >> /var/log/koa-ip-questbook.log