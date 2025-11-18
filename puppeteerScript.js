// puppeteerScript.js
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const URL = "https://www.tokopedia.com/mybasicindonesia/mybasic-boxy-crop-t-shirt-kaos-boxy-fit-with-cotton-combed-24s-dengan-200-gsm-1730148724140508744?aff_unique_id=VjgEBL2zYnXL9eFz0aWzIN1oSniFGHGALE1N5Mw8U16eHJBvAjrak6GGqx_hX6eSBcZLIwS6BZD6PKurTuTXMdU5vNkJafm6WA%3D%3D&channel=salinlink&source=TTS&utm_source=salinlink&utm_medium=affiliate-share&utm_campaign=affiliateshare-pdp-VjgEBL2zYnXL9eFz0aWzIN1oSniFGHGALE1N5Mw8U16eHJBvAjrak6GGqx_hX6eSBcZLIwS6BZD6PKurTuTXMdU5vNkJafm6WA%3D%3D-1730148724140508744-0-041125&scene=pdp&chain_key=%7B%22t%22%3A1%2C%22k%22%3A%22000000000000000007568802845060974343%22%2C%22sc%22%3A%22salinlink%22%7D";

module.exports = async function runPuppeteer() {
    let browser;

    try {
        console.log("🚀 Launching browser...");

        browser = await puppeteer.launch({
            args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        console.log(`🌐 Navigating to Tokopedia product page...`);
        await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });

        console.log("⏳ Waiting for thumbnails...");
        await page.waitForSelector('[data-testid="PDPImageThumbnail"]', { timeout: 30000 });

        const count = await page.$$eval('[data-testid="PDPImageThumbnail"]', els => els.length);
        console.log(`🖼️ Found ${count} thumbnails.`);

        console.log("🎥 Clicking the video thumbnail...");
        await page.evaluate(() => {
            const thumbs = document.querySelectorAll('[data-testid="PDPImageThumbnail"]');
            if (thumbs.length > 1) {
                thumbs[1].scrollIntoView({ behavior: "smooth", block: "center" });
                thumbs[1].click();
            }
        });

        console.log("⏳ Waiting for video player...");
        await delay(4000);

        const videoExists = await page.evaluate(() => !!document.querySelector("video"));

        if (videoExists) {
            console.log("🎬 Video detected **and should be playing!**");
        } else {
            console.log("⚠️ Video tag not found — may be inside modal/iframe.");
        }

        console.log("🕐 Keeping browser open for 40s...");
        await delay(40000);

        return "Tokopedia video automation executed successfully";

    } catch (error) {
        console.error("💥 Error inside runPuppeteer:", error);
        throw error;

    } finally {
        if (browser) {
            await browser.close();
            console.log("✅ Browser closed");
        }
    }
};
