const puppeteer = require("puppeteer");

module.exports = async function runPuppeteer() {

    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage"
        ]
    });

    const page = await browser.newPage();

    await page.goto("https://skillsfuture.gobusiness.gov.sg/support-and-programmes/talenttrack?utm_source=fork&utm_medium=banner&utm_campaign=fy25-employercampaign&utm_term=talenttrack-consider&dclid=CL6VsMb6-pADFTn_cwEdZ0ojLg&gad_source=7", {
        waitUntil: "networkidle0"
    });

    await page.waitForSelector('a[href="#introduction"]');

    await page.click('a[href="#introduction"]');

    // optional screenshot for debugging
    // await page.screenshot({ path: "debug.png" });

    await browser.close();

    return "Click executed successfully";
};
