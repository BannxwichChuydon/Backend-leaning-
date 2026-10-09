const orderList = document.querySelector(".orderList")
const groups = {};
setInterval(fetchOrders, 1000);
setInterval(updateDashboard, 1000);
//update dashboard
async function updateDashboard() {
const res = await fetch("https://cautious-space-lamp-965xqq56w7gphpxr-3001.app.github.dev/api/data") 
const datadashboard = (await res.json())[0];
document.getElementById("total-sales").textContent = `${datadashboard.total_price}บาท`
document.getElementById("total-orders").textContent = `${datadashboard.total_orders}ออเดอร์`
}
//ดึงข้อมูลจาก db
async function  fetchOrders()  {
    await fetch("https://cautious-space-lamp-965xqq56w7gphpxr-3001.app.github.dev/api/order")
        .then(response => response.json())
        .then(orders => {
            const cleared = new Set();
            orders.forEach(order => {
            if (!groups[order.order_id]) {
              const card = document.createElement("div");
              card.className = "order-card";
              card.dataset.orderId = order.order_id
              
              card.innerHTML += ` <div class="order">
                                                                    <div class="tbl">
                                                                      <small>โต๊ะที่ 5</small>
                                                                    </div>
                                                                      <div class="order-items">
                                                                       
                                                                      </div>
                                                                       <div class="right">
                                                                
                                                                      <span class="badge s-pending">รอรับออเดอร์</span>
                                                                      <div class="price">${order.created_at}</div>
                                                                       </div>
                                                                       <button class="next">เริ่มทำ</button>
                                                                       </div>
`;
//เอาขึ้นหน้าเว็บ
orderList.appendChild(card);
//จำว่า div นี้ใช้ orderId ตัวไหน
groups[order.order_id] = card;
            }

const card = groups[order.order_id];

const items = card.querySelector(".order-items");
if (!cleared.has(order.order_id)) {
    items.innerHTML = "";
    cleared.add(order.order_id);
}
const item = document.createElement("div");

    item.className = "order-item";
    item.innerHTML = `
        <span>x${order.name}</span>
        
    `;

    // เอารายการอาหารเข้าไปใน Order
    items.appendChild(item);



        });
        
    });
}
document.querySelector(".orderList").addEventListener("click", async function (event) {
  if (event.target.classList.contains("next")) {
    const orderId = event.target.closest(".order-card").dataset.orderId;
    alert("กด")
    await fetch(`https://cautious-space-lamp-965xqq56w7gphpxr-3001.app.github.dev/api/order/${orderId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        status: "done"
    })
});
  }
  event.target.closest(".order-card").remove();
  delete groups[orderId];
fetchOrders();
})

