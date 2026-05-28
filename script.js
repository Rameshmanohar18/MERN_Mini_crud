
const API = "http://localhost:5000/api/items";

function addItem() {
  const container =
    document.getElementById("itemsContainer");

  const div = document.createElement("div");

  div.className = "item-row";

  div.innerHTML = `
    <input type="text"
      class="name"
      placeholder="Item Name"
      required>

    <select class="type">
      <option value="1">Electronics</option>
      <option value="2">Furniture</option>
      <option value="3">Clothing</option>
      <option value="4">Sports</option>
      <option value="5">Books</option>
    </select>

    <label>
      Stock
      <input type="checkbox"
      class="stock">
    </label>
  `;

  container.appendChild(div);
}

addItem();

document
  .getElementById("itemForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const purchase_date =
      document.getElementById("purchase_date").value;

    const itemRows =
      document.querySelectorAll(".item-row");

    const items = [];

    itemRows.forEach((row) => {
      items.push({
        name: row.querySelector(".name").value,
        item_type_id:
          row.querySelector(".type").value,
        stock_available:
          row.querySelector(".stock").checked,
      });
    });

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        purchase_date,
        items,
      }),
    });

    const data = await response.json();

    alert(data.message);

    loadItems();
  });

async function loadItems() {

  const response = await fetch(API);

  const data = await response.json();

  const tableBody =
    document.getElementById("tableBody");

  tableBody.innerHTML = "";

  data.forEach((item) => {

    tableBody.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.type_name}</td>
        <td>${item.purchase_date}</td>
        <td>
          ${item.stock_available ? "Yes" : "No"}
        </td>

        <td>
          <button onclick="deleteItem(${item.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function deleteItem(id) {

  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  loadItems();
}

loadItems();