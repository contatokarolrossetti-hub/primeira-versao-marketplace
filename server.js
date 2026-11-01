const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const data = name => path.join(__dirname, "data", name);
const read = name => JSON.parse(fs.readFileSync(data(name), "utf8"));
const write = (name, value) => fs.writeFileSync(data(name), JSON.stringify(value, null, 2));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req,res) => res.json({status:"ok"}));
app.get("/api/categories", (req,res) => res.json([...new Set(read("products.json").map(p => p.category))]));
app.get("/api/products", (req,res) => {
  const search = String(req.query.search || "").toLowerCase();
  const category = String(req.query.category || "");
  res.json(read("products.json").filter(p =>
    (!category || category === "Todos" || p.category === category) &&
    (`${p.title} ${p.category}`).toLowerCase().includes(search)
  ));
});
app.post("/api/orders", (req,res) => {
  const {customer, items} = req.body;
  if (!customer?.name || !customer?.email || !Array.isArray(items) || !items.length)
    return res.status(400).json({error:"Informe nome, e-mail e produtos."});
  const products = read("products.json");
  let total = 0;
  const orderItems = [];
  for (const item of items) {
    const product = products.find(p => p.id === Number(item.productId));
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99)
      return res.status(400).json({error:"Produto ou quantidade inválida."});
    total += product.price * quantity;
    orderItems.push({productId:product.id,title:product.title,unitPrice:product.price,quantity});
  }
  const orders = read("orders.json");
  const order = {number:`DEMO-${String(orders.length+1).padStart(4,"0")}`,
    customer:{name:String(customer.name).trim(),email:String(customer.email).trim()},
    items:orderItems,total:Number(total.toFixed(2)),status:"Pedido de teste",createdAt:new Date().toISOString()};
  orders.push(order); write("orders.json",orders);
  res.status(201).json(order);
});
app.get("/api/orders", (req,res) => res.json(read("orders.json")));
app.listen(PORT, () => console.log(`Loja em http://localhost:${PORT}`));
