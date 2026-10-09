import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
// ส่วน neon db
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
//

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.post("/api/order", async (req, res) => {

    const data = req.body;
    const orders = data.orders
  

    console.log(data);

  
  //ส่งเข้า db
  try {
    //วนทุกตัวใน array และจับ insert เข้า db ทีละตัว
  await sql.transaction(
    orders.map(o => sql`
      INSERT INTO orders (order_id, menu_id, name, price)
      VALUES (${o.orderId}, ${o.menuId}, ${o.name}, ${o.price})
    `)
  );
  res.json({ success: true });
} catch (error) {
  res.status(500).json({ success: false, error: error.message });
}
});

app.get("/api/order", async (req, res) => {

    console.log('GET /order called', new Date());
    try {
    const result = await sql`
    SELECT name, TO_CHAR(created_at AT TIME ZONE 'Asia/Bangkok', 'HH24:MI') AS created_at, order_id
    FROM orders
    WHERE status = 'pending' `;

  
    res.json(result);
    }catch(error){
      res.json("error")
    }    
});
//dashboardupdate
app.get("/api/data", async (req, res) => {
  try {
    const data = await sql`
    SELECT count(*) as total_orders, sum(price) as total_price
    FROM orders
    WHERE status = 'done' `;

    res.json(data);
}catch(error){
      res.status(500).json({ error: error.message });}
});
app.put("/api/order/:id", async (req, res) => {
    await sql`
        UPDATE orders
        SET status = ${req.body.status}
        WHERE order_id = ${req.params.id}  `; //อัพเดทเฉพาะตัวที่ order id ตรงกับที่ส่งมากับ url ในส่วน dashboard

    res.json({ success: true });
});
app.listen(3001, (err) => {
  if (err) {
    console.error("Listen error:", err);
    process.exit(1);
  }
  console.log("Server running on port 3001");
});
