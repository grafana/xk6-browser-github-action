import launcher from "k6/x/browser";

export default function () {
  const browser = launcher.launch("chromium", { headless: true });
  const context = browser.newContext();
  const page = context.newPage();

  page.goto(__ENV.BASE_URL, { waitUntil: "load" });

  const dimensions = page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log(JSON.stringify(dimensions));
  page.close();
  browser.close();
}
