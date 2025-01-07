
FROM node:22-alpine

WORKDIR /app

RUN pnpm install -g pm2

RUN addgroup --system --gid 1001 mygroup
RUN adduser --system --uid 1001 myuser

RUN chown -R myuser:mygroup /app

USER myuser

COPY --chown=myuser:mygroup ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY --chown=myuser:mygroup . .

CMD ["pm2-runtime", "ecosystem.config.js"]
