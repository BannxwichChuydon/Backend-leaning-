const orderList = document.querySelector(".orderlist");


const menus = [
  { id: 1, name: "ก๋วยเตี๋ยวหมู", price: 60 },
  { id: 2, name: "ผัดไทย", price: 55 }
];

let orders = [];

let ordersdata = [];
// ส่วนปุ่มเพิ่มออเดอร์
const buttons = document.querySelectorAll(".add-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    
    const id = Number(button.dataset.id);
    const menu = menus.find(menu => menu.id === id);

    orders.push(menu);
    ordersdata.push(...orders);
  
    orders.forEach(order => {
    orderList.innerHTML += `<div class="order-item">
    <p class="ordertext">${order.name} ${order.price} บาท</p> <button class="delete-btn" data-id="${order.id}">X</button>
    </div>
  `;
  
    alert("เพิ่มลงตะกร้าแล้ว")
    });
    orders.length = 0;
  
});
        

        
  });
// ส่วนลบรายการทีละรายการพร้อมข้อมูลใน array
     orderList.addEventListener("click", function(event){
    if (event.target.classList.contains("delete-btn")) {
        // ลบรายการและ ข้อมูลใน array
        const orderDiv = event.target.closest(".order-item");
        const id = Number(event.target.dataset.id);

        ordersdata = ordersdata.filter(order => Number(order.id) !== id);

        alert(JSON.stringify(ordersdata));
        orderDiv.remove();

    }
  });
  //ล้างรายการทั้งหมด
  const clearButton = document.querySelector (".clear-btn");             
     clearButton.addEventListener("click", function(){
         alert("กดแล้ว")
         if (document.querySelector(".order-item")) {
          orderDiv = document.querySelectorAll(".order-item");
          orderDiv.forEach(order => order.remove());
          ordersdata.length = 0;
} 
     });
  //ส่วนของฟังค์ชั่นสั่งอาหาร
  const orderButton = document.querySelector(".order-btn");
  orderButton.addEventListener("click", async function(event){
    event.preventDefault();
  //ส่วนส่งข้อมูล
  const response = await fetch("https://musical-chainsaw-g46gvxx7x776cj9x-3000.app.github.dev/api/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(ordersdata)
});
    ordersdata.length = 0;
    const status = await response.json();
     console.log(status);
    });

  

    
// ส่วนเตรียม data ไป dashbord และ database
