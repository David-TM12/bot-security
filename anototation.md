# Comandos do prisma

### Compara o arquivo schema.prisma com o banco de dados e verifica quais foram as mudanças que ainda não foram migradas para ele e aplica no banco de dados, é usado em ambiente de desenvolvimento.
```
npx prisma migrate dev
```

### Pega o arquivo schema.prisma e roda no banco de dados todas as migrations encontradas no arquivo sem realizar nenhuma comparação, é usado em ambiente de produção.
```
npx prisma migrate deploy
```

### para abrir uma interface para navegar nas tabelas
```
npx prisma studio
```