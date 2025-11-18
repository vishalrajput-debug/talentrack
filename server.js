const express = require("express");
const runPuppeteer = require("./puppeteerScript");
const app = express();

app.get("/", (req, res) => {
    res.send("Puppeteer backend running");
});

app.get("/autoclick", async (req, res) => {
    try {
        const result = await runPuppeteer();
        res.json({ success: true, message: "Auto-click completed", result });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
