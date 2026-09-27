const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/api/orders", (req, res) => {
    const data = req.body;

    console.log(data);

    res.json({
        status: sented,
        success: true
    });
});