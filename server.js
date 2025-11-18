const express = require("express");
const cors = require("cors");
const runPuppeteer = require("./puppeteerScript");

const app = express();

// Allow all frontend domains to access this backend
app.use(cors({
    origin: "*",          // allow ALL origins
    methods: "GET,POST",  // allowed HTTP methods
}));

// Root test route
app.get("/", (req, res) => {
    res.send("Puppeteer backend running successfully.");
});

// The important one — your autoclick route
app.get("/autoclick", async (req, res) => {
    try {
        const result = await runPuppeteer();
        res.json({ success: true, message: "Auto-click completed", result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Render requires PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
