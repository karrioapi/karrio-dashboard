# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN export NODE_OPTIONS=--openssl-legacy-provider && \
  npm run build && \
  npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_PUBLIC_PURPLSHIP_API_URL https://api.purplship.com
ENV JWT_SECRET "n*s-ex6@ex_r1i%bk=3jd)p+lsick5bi*90!mbk7rc3iy_op1r"

RUN addgroup -g 1001 -S nodejs
RUN adduser -S pship -u 1001


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=pship:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER pship

EXPOSE 3000

CMD ["npm", "run", "start"]
