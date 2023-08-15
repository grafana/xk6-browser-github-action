import { browser } from "k6/experimental/browser";

export default async function () {
  let page

  try {
    page = browser.newPage();

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
  }
}
