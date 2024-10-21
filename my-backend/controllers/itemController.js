let items = [];

export const getItems = (req, res) => {
  res.json(items);
};

export const createItem = (req, res) => {
  const nextId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  const newItem = { id: nextId, ...req.body };
  items.push(newItem);

  res.json(newItem);
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const itemIndex = items.findIndex((item) => item.id == id); 

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  // Update item
  items[itemIndex] = {
    id: Number(id),
    title,
    description,
    status: status || items[itemIndex].status,
  };

  res.json(items[itemIndex]);
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== parseInt(id));
  res.status(204).send();
};
