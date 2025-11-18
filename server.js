// server.js
const express = require("express");
// Import the puppeteer function from your file
const runPuppeteer = require("./puppeteerScript"); 

const app = express();
// IMPORTANT: Render sets the PORT environment variable
const PORT = process.env.PORT || 3000; 

// --- Middleware (Optional, but good practice) ---
app.use(express.json());

// --- Routes ---

// 1. Root/Health Check Route
// Render will check this route to ensure your service is alive
app.get("/", (req, res) => {
    res.status(200).send({
        status: "OK",
        message: "Puppeteer Web Service is running. Use /run-script to execute the task."
    });
});

// 2. Route to run the Puppeteer script
app.get("/run-script", async (req, res) => {
    console.log("--- Starting Puppeteer Script Execution ---");
    
    try {
        // Execute the imported function
        const result = await runPuppeteer();
        
        console.log(`Script finished. Result: ${result}`);
        
        res.status(200).send({
            status: "Success",
            message: result,
            note: "The browser was opened and closed successfully."
        });

    } catch (error) {
        // Log the error for debugging on Render
        console.error("!!! Puppeteer Execution FAILED !!!", error);
        
        res.status(500).send({
            status: "Error",
            message: "An error occurred during Puppeteer execution. Check server logs.",
            details: error.message
        });
    }
});


// --- Server Listener ---

// Start the server and listen on the required port
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});