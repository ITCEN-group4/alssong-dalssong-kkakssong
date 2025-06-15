FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache bash

RUN npm ci

COPY . .

# Vite 빌드 실행 
RUN npm run build

# 실행용 이미지
FROM nginx:stable-alpine

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
