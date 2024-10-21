import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./component/ItemForm";
import ItemList from "./component/ItemList";

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async (item) => {
    try {
      const response = await axios.post("http://localhost:8000/items", item);
      setItems([...items, response.data]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (updatedItem) => {
    debugger;
    try {
      const response = await axios.put(
        `http://localhost:8000/items/${updatedItem.id}`,
        {
          title: updatedItem.title,
          description: updatedItem.description,
          status: updatedItem.status,
        }
      );
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? response.data : item
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="w-1/2 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD App</h1>
      <ItemForm onAddItem={addItem} />
      <ItemList items={items} onUpdate={updateItem} onDeleteItem={deleteItem} />
    </div>
  );
}

export default App;
