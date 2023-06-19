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

    const link = page.locator("a");
    console.log(link.innerText());
  } finally {
    page.close();
    browser.close();
  }
}
