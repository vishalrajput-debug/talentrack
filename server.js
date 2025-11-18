// server.js (The complete and correct file)
const express = require("express");
const runPuppeteer = require("./puppeteerScript"); 
const cors = require("cors"); // <--- THIS LINE IS CRUCIAL!

const app = express();
const PORT = process.env.PORT || 3000; 

// --- Configure CORS ---
const allowedOrigins = ['https://dainty-swan-383ffc.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply the CORS middleware
app.use(cors(corsOptions));
// ----------------------

app.use(express.json()); // For parsing application/json

// --- Routes ---
app.get("/", (req, res) => {
    res.status(200).send({
        status: "OK",
        message: "Puppeteer Web Service is running. Use /run-script to execute the task."
    });
});

app.get("/run-script", async (req, res) => {
    console.log("--- Starting Puppeteer Script Execution ---");
    
    try {
        const result = await runPuppeteer();
        // ... (Success response code) ...
        res.status(200).send({
            status: "Success",
            message: result,
            note: "The browser was opened and closed successfully."
        });
    } catch (error) {
        // ... (Error response code) ...
        console.error("!!! Puppeteer Execution FAILED !!!", error);
        res.status(500).send({
            status: "Error",
            message: "An error occurred during Puppeteer execution. Check server logs.",
            details: error.message
        });
    }
});


// --- Server Listener ---
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});