import { browser } from "k6/experimental/browser";

export default async function () {
  let page

  try {
    page = browser.newPage();

    await page.goto(__ENV.BASE_URL, {
      waitUntil: "networkidle",
    });

    const link = page.locator("a");
    console.log(link.innerText());
  } finally {
    page.close();
  }
}
