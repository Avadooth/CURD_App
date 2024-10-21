import React, { useEffect, useState } from "react";

const ItemList = ({ items, onUpdate, onDeleteItem }) => {
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    title: "",
    description: "",
  });

  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditItemData({ title: item.title, description: item.description });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (id) => {
    if (!editItemData.title || !editItemData.description) {
      alert("Please fill in both title and description."); // Alert for empty fields
      return;
    }
    onUpdate({ id, ...editItemData });
    setEditItemId(null);
  };

  return (
    <>
      <div className="text-3xl font-bold mb-4">Task List :-</div>
      {items.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={`border border-blue-200 rounded-2xl p-4 mb-2`}
            >
              {editItemId === item.id ? (
                <div>
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editItemData.title}
                      onChange={handleInputChange}
                      className="border p-2 mb-2 w-full"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editItemData.description}
                      onChange={handleInputChange}
                      className="border p-2 mb-2 w-full"
                      placeholder="Enter description"
                    />
                  </div>

                  <div className=" flex justify-end">
                    <button
                      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 mr-5 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      onClick={() => setEditItemId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className={`px-6 py-1 m-1 inline-flex rounded-full ${
                      item.status === "PENDING"
                        ? "border-2 border-red-600 text-red-600"
                        : "border-2 border-green-600 text-green-600"
                    }`}
                  >
                    {item.status}
                  </div>
                  <div className="ml-5">
                    <div className="font-bold text-xl mb-1">
                      Task No-{item.id}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold text-base">Title : </span>
                      {item.title}
                    </div>
                    <div className="mb-1">
                      {" "}
                      <span className="font-bold text-base">
                        Description :{" "}
                      </span>
                      {item.description}
                    </div>
                  </div>
                  <div className="flex justify-between ml-5">
                    <div>
                      {" "}
                      <button
                        disabled={item.status === "COMPLETED"}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 mr-5 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                        onClick={() =>
                          onUpdate({
                            ...item,
                            status:
                              item.status === "PENDING"
                                ? "COMPLETED"
                                : "PENDING",
                          })
                        } // Toggle status
                      >
                        COMPLETED
                      </button>
                    </div>
                    <div>
                      {" "}
                      <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 mr-5 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ItemList;
