const puppeteer = require("puppeteer");

async function runPuppeteer() {
    const executablePath =
        "/opt/render/.cache/puppeteer/chrome/linux-127.0.6533.88/chrome-linux64/chrome";

    const browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-extensions"
        ]
    });

    const page = await browser.newPage();

    // Open target page
    await page.goto("https://skillsfuture.gobusiness.gov.sg/support-and-programmes/talenttrack", {
        waitUntil: "networkidle2"
    });

    // Auto-click the link with href="#introduction"
    await page.evaluate(() => {
        const link = document.querySelector('a[href="#introduction"]');
        if (link) link.click();
    });

    await browser.close();

    return "Auto-click done successfully!";
}

module.exports = runPuppeteer;
