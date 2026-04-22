let orders = JSON.parse(localStorage.getItem("orders")) || [];

let form = document.getElementById("orderForm");
let table = document.getElementById("orderTable");

displayOrders();

form.addEventListener("submit", function(e){
  e.preventDefault();

  let id = document.getElementById("orderId").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let qty = document.getElementById("qty").value;
  let category = document.getElementById("category").value;

  let orderData = {
    id: Date.now(),
    name,
    price: +price,
    qty: +qty,
    category
  };

  if(id){
    orders = orders.map(o => o.id == id ? {...orderData, id:id} : o);
  } else {
    orders.push(orderData);
  }

  localStorage.setItem("orders", JSON.stringify(orders));
  form.reset();
  displayOrders();
});

function displayOrders(){
  let search = document.getElementById("search").value.toLowerCase();
  table.innerHTML = "";

  let totalBill = 0;

  orders.forEach((o, index) => {
    if(o.name.toLowerCase().includes(search)){
      let total = o.price * o.qty;
      totalBill += total;

      let row = `
        <tr>
          <td>${index+1}</td>
          <td>${o.name}</td>
          <td>${o.price}</td>
          <td>${o.qty}</td>
          <td>${o.category}</td>
          <td>${total}</td>
          <td>
            <button class="edit" onclick="editOrder(${o.id})">Edit</button>
            <button class="delete" onclick="deleteOrder(${o.id})">Delete</button>
          </td>
        </tr>
      `;
      table.innerHTML += row;
    }
  });

  document.getElementById("totalBill").innerText = totalBill;
}

function deleteOrder(id){
  orders = orders.filter(o => o.id != id);
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders();
}

function editOrder(id){
  let o = orders.find(o => o.id == id);

  document.getElementById("orderId").value = o.id;
  document.getElementById("name").value = o.name;
  document.getElementById("price").value = o.price;
  document.getElementById("qty").value = o.qty;
  document.getElementById("category").value = o.category;
}