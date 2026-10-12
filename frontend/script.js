const orderList = document.querySelector(".orderlist");



const menus = [
  { id: 1, name: "ก๋วยเตี๋ยวหมู", price: 60 },
  { id: 2, name: "ผัดไทย", price: 55 }
];

let ordersdata = [];
// ส่วนปุ่มเพิ่มออเดอร์
const buttons = document.querySelectorAll(".add-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    alert("กด")
    const id = Number(button.dataset.id);
    const menu = menus.find(menu => menu.id === id);

    

    const order = { itemId: Date.now() + Math.random(),
                    menuId: menu.id,
                    name: menu.name,
                    price: menu.price
                    };

    ordersdata.push(order);
    updatetotal();
  
    orderList.innerHTML += `<div class="order-item" data-id="${order.itemId}
    <p class="ordertext">${order.name} ${order.price} บาท</p> <button class="delete-btn" data-id="${order.itemId}">X</button>
    </div>
  `;
  
    alert("เพิ่มลงตะกร้าแล้ว")
    });
  });
//คำนวณราคารวมของรายการสินค้า
function updatetotal() {
  const total = ordersdata.reduce((sum, orderprice) => {
    return sum + orderprice.price;  // ← เอา price นี่
}, 0);
document.getElementById("totalpriceAll").textContent = total;
console.log(total);
return total;
}
const totalprice = updatetotal();
// ส่วนลบรายการทีละรายการพร้อมข้อมูลใน array
     orderList.addEventListener("click", function(event){
    if (event.target.classList.contains("delete-btn")) {
        // ลบรายการและ ข้อมูลใน array
        const orderDiv = event.target.closest(".order-item");
        const id = Number(event.target.dataset.id);

        ordersdata = ordersdata.filter(order => Number(order.itemId) !== Number(id));
        updatetotal();

        alert(JSON.stringify(ordersdata));
        orderDiv.remove();

    }
  });
  //ฟังค์ชั่นล้าง div orders
  function deleteorders() {
    if (document.querySelector(".order-item")) {
    orderDiv = document.querySelectorAll(".order-item");
    orderDiv. forEach(order => order. remove());
    ordersdata. length = 0;
    updatetotal();
    }
  }

  //ล้างรายการทั้งหมด
  const clearButton = document.querySelector (".clear-btn");             
     clearButton.addEventListener("click", function(){
         alert("กดแล้ว")
         deleteorders();
         updatetotal();
});
    
  //ส่วนของฟังค์ชั่นสั่งอาหาร
  const orderButton = document.querySelector(".order-btn");
  orderButton.addEventListener("click", async function(event){
    event.preventDefault();

    const orderId = Date.now();
    //เอา Date.now ไปใส่ให้แต่ละออเดอร์ ด้วยการสร้าง array ใหม่ ชื่อ item
    const items = ordersdata.map(item => ({ ...item, orderId }));

  
  try {
  const response = await fetch("https://cautious-space-lamp-965xqq56w7gphpxr-3001.app.github.dev/api/order",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     orders: items   
                })
                
            });
            
        const data = await response.json();
        console.log(data)
        deleteorders();
        updatetotal();
        alert("สั่งซื้อเรียบร้อย");
}catch(error) {
  alert("ควย")
}
  });


    
// ส่วนเตรียม data ไป dashbord และ database
