import { chromium } from "k6/experimental/browser";

export default async function () {
  const browser = chromium.launch({
    debug: __ENV.DEBUG,
    headless: true,
    // args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = browser.newPage();

  try {
    await page.goto(__ENV.BASE_URL, {
      waitUntil: "load",
    });

    const link = page.locator("a");
    console.log(link.innerText());
  } finally {
    page.close();
    browser.close();
  }
}
