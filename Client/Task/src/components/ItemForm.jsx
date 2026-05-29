import React, { useState } from "react";

const ItemForm = ({ addItem, editData }) => {

  const [formData, setFormData] = useState({
    name: editData?.name || "",
    purchase_date: editData?.purchase_date || "",
    stock_available: editData?.stock_available || false,
    item_type_id: editData?.item_type_id || 1,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    addItem(formData);

    setFormData({
      name: "",
      purchase_date: "",
      stock_available: false,
      item_type_id: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select
        name="item_type_id"
        value={formData.item_type_id}
        onChange={handleChange}
      >
        <option value="1">Electronics</option>
        <option value="2">Furniture</option>
        <option value="3">Clothing</option>
        <option value="4">Books</option>
        <option value="5">Sports</option>
      </select>

      <input
        type="date"
        name="purchase_date"
        value={formData.purchase_date}
        onChange={handleChange}
        required
      />

      <label>
        In Stock
        <input
          type="checkbox"
          name="stock_available"
          checked={formData.stock_available}
          onChange={handleChange}
        />
      </label>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default ItemForm;