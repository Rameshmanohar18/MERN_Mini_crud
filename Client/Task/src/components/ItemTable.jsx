import React from "react";

const ItemTable = ({
  items,
  deleteItem,
  editItem,
}) => {

  return (
    <>
      <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Purchase Date</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {items.map((item) => (

          <tr key={item.id}>

            <td>{item.id}</td>

            <td>{item.name}</td>

            <td>{item.type_name}</td>

            <td>{item.purchase_date}</td>

            <td>
              {item.stock_available
                ? "Available"
                : "Out of Stock"}
            </td>

            <td>

              <button
                onClick={() => editItem(item)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>

            </td>

          </tr>
        ))}

      </tbody>
    </table>
    </>
  
  );
};

export default ItemTable;