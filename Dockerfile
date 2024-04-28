
FROM registry.cn-shenzhen.aliyuncs.com/mwcloud/node:18.13.0 as build

# ENV PROJECT_ENV production
# ENV NODE_ENV production

# http-server 不变动也可以利用缓存
WORKDIR /source

COPY . .
# ADD package.json /source

RUN npm install pnpm -g 

RUN pnpm i && pnpm build

COPY . /source

# 选择更小体积的基础镜像
FROM nginx:latest

COPY --from=build /source/gbeata-admin/ /usr/share/nginx/html/react-antd-admin-pnpm/
COPY default.conf /etc/nginx/conf.d/default.conf
