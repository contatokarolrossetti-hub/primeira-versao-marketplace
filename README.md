# Marketplace demonstrativo

Loja de estudo inspirada em marketplaces, com front-end HTML/CSS/JavaScript e back-end Node.js + Express. Não é o site oficial do Mercado Livre.

## Executar
1. Instale Node.js 18 ou superior.
2. Abra o terminal nesta pasta.
3. Execute `npm install`.
4. Execute `npm start`.
5. Acesse http://localhost:3000.

## Estrutura
- `server.js`: servidor e API REST.
- `public/`: página, estilos e JavaScript do navegador.
- `data/products.json`: catálogo de produtos.
- `data/orders.json`: pedidos de demonstração.

## Rotas da API
- `GET /api/health`
- `GET /api/categories`
- `GET /api/products?search=mouse&category=Informática`
- `POST /api/orders`
- `GET /api/orders`

## Publicar no GitHub
Crie um repositório vazio no GitHub e, no terminal desta pasta, execute:

```bash
git init
git add .
git commit -m "Primeira versão do marketplace"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Substitua a URL pela URL do seu repositório.

## Limitações
Pedidos são gravados em JSON para fins didáticos. Não há pagamento real, login, autenticação, estoque, banco SQL ou integração com a API oficial do Mercado Livre. Não publique senhas, tokens ou chaves privadas no GitHub.
