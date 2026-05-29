import {
  useEffect,
  useState,
} from "react";
import API from "./services/api.js";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import "./App.css";

function App() {

  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const res = await API.get();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (data) => {
    await API.post("/", data);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/${id}`);
    fetchItems();
  };

  const editItem = async (item) => {
    const updatedName =
      prompt(
        "Enter New Item Name",
        item.name
      );

    if (!updatedName) return;

    await API.put(`/${item.id}`, {
      ...item,
      name: updatedName,
    });
    fetchItems();
  };

  return (
    <div className="container">
      <h1>
        Inventory Management System
      </h1>
      <ItemForm addItem={addItem} />
      <ItemTable
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

export default App;