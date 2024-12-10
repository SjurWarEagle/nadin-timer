FROM node:23 as buildstep
RUN mkdir -p /project/
RUN mkdir -p /project/dist/nadin-timer

RUN apt update -y && \
    apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    sed \
    ca-certificates &&\
    rm -rf /var/cache/apt/ &&\
    rm -rf /var/lib/apt/lists/*

WORKDIR /project
ADD . /project

# https://stackoverflow.com/questions/77989039/error-cannot-find-module-nx-nx-linux-x64-gnu
#RUN rm package-lock.json
ARG NODE_OPTIONS=--max_old_space_size=4096

RUN sed -i "s/AA\.BB\.CCCC/$(date +"%d.%m.%Y_%H:%M:%S")/" /project/src/environments/environment.prod.ts
RUN sed -i "s/AA\.BB\.CCCC/$(date +"%d.%m.%Y_%H:%M:%S")/" /project/src/environments/environment.ts
RUN npm install --no-audi && \
    npm run lint:prod && \
    npm run build:prod && \
    rm -r node_modules

FROM nginx:mainline-alpine
WORKDIR /project
COPY --from=buildstep /project/dist /project
ADD docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/apt/apt.conf.d/90nginx
EXPOSE 96

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
