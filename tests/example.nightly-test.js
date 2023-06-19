import { chromium } from "k6/experimental/browser";

export default async function () {
  const browser = chromium.launch({
    args: ["no-sandbox"],
    headless: true,
  });

  const page = browser.newPage();

  try {
    await page.goto(__ENV.BASE_URL, {
      waitUntil: "networkidle",
    });

    const dimensions = page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    });

    console.log(JSON.stringify(dimensions));
  } finally {
    page.close();
    browser.close();
  }
}
