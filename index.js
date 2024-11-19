// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { arrayBuffer } = require("stream/consumers");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  let articles = [];
  let startingArticle = 1;

  // go to Hacker News
  while (startingArticle < 100) {
    await page.goto(`https://news.ycombinator.com/newest?n=${startingArticle}`);

    await page.waitForFunction(() => {
      return document.querySelectorAll(".athing").length >= 30;
    });

    const articlesOnPage = await page.evaluate(() => {
      const articleTimestamps = document.querySelectorAll(".age");
      return Array.from(articleTimestamps, (singleSnippet) =>
        singleSnippet.getAttribute("title")
      );
    });

    articles.push(...articlesOnPage);
    articles = articles.slice(0, 100);

    startingArticle += 30;
  }

  await browser.close();
  return articles;
}

(async () => {
  await sortHackerNewsArticles();
})();
