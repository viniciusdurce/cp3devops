# 1. Imagem base Node
FROM node:20-alpine

# 2. Cria um usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 3. Define diretório de trabalho
WORKDIR /usr/src/app

# 4. Copia package.json e instala dependências
COPY package.json package-lock.json ./
RUN npm install --production

# 5. Copia o restante do código
COPY app/ .

# 6. Ajusta permissões e muda para usuário não-root
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# 7. Expõe porta e define variável de ambiente
ENV PORT=3000
EXPOSE 3000

# 8. Comando de inicialização
CMD ["node", "index.js"]
