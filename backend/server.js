const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

app.use(cors());
app.use(express.json());

const itemRoutes = require("./routes/items");

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
