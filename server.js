const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function runPuppeteer() {
    // Find installed Chrome dynamically
    const chromeBasePath = "/opt/render/.cache/puppeteer/chrome";

    const versions = fs.readdirSync(chromeBasePath);
    const versionFolder = versions[0]; // pick first installed version

    const executablePath = path.join(
        chromeBasePath,
        versionFolder,
        "chrome-linux64",
        "chrome"
    );

    console.log("Using Chrome path:", executablePath);

    const browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage"
        ]
    });

    const page = await browser.newPage();

    await page.goto(
        "https://skillsfuture.gobusiness.gov.sg/support-and-programmes/talenttrack?utm_source=fork&utm_medium=banner&utm_campaign=fy25-employercampaign&utm_term=talenttrack-consider&dclid=CL6VsMb6-pADFTn_cwEdZ0ojLg&gad_source=7",
        { waitUntil: "networkidle2" }
    );

    // Auto-click link
    await page.evaluate(() => {
        const link = document.querySelector('a[href="#introduction"]');
        if (link) link.click();
    });

    await browser.close();

    return "Auto-click successful";
}

module.exports = runPuppeteer;
