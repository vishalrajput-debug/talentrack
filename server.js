// server.js (Change the cors middleware setup)
const express = require("express");
const runPuppeteer = require("./puppeteerScript"); 
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 3000; 

// --- Configure CORS ---
const allowedOrigins = ['https://dainty-swan-383ffc.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl) or if the origin is in our allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need cookies or authorization headers
  optionsSuccessStatus: 204
};

// Apply the CORS middleware
app.use(cors(corsOptions));
// ----------------------

app.use(express.json());

// ... rest of your routes (app.get("/", ...), app.get("/run-script", ...))
// ... and server listener (app.listen(PORT, ...))