// puppeteerScript.js
const puppeteer = require("puppeteer-core"); // Using core instead of the full package
const chromium = require("@sparticuz/chromium"); // Imports the custom Chromium executable

module.exports = async function runPuppeteer() {
    let browser;
    try {
        // --- Launch configuration updated for Render ---
        browser = await puppeteer.launch({
            // Pass the arguments, viewport, and executable path from the chromium package
            args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(), // Crucial for finding the browser
            headless: chromium.headless, // Uses true or 'new' as determined by chromium
            ignoreHTTPSErrors: true,
        });
        // ----------------------------------------------

        const page = await browser.newPage();

       await page.goto("https://skillsfuture.gobusiness.gov.sg/support-and-programmes/talenttrack?utm_source=fork&utm_medium=banner&utm_campaign=fy25-employercampaign&utm_term=talenttrack-consider&dclid=CL6VsMb6-pADFTn_9cEdZ0ojLg&gad_source=7", {
        // Increase the timeout to 60 seconds (60,000 ms)
        timeout: 60000, 
        waitUntil: "domcontentloaded" 
    });
        await page.waitForSelector('a[href="#introduction"]');

        await page.click('a[href="#introduction"]');

        return "Click executed successfully";
        
    } catch (error) {
        console.error("Error inside runPuppeteer:", error);
        // Throw the error so the Express server can catch it and return a 500
        throw error; 
    } finally {
        // Always ensure the browser closes
        if (browser) {
            await browser.close();
        }
    }
};