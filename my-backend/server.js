import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/items", itemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
