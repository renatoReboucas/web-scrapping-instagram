const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto("https://instagram.com/rocketseat_oficial");
  // await page.screenshot({ path: "./fotos/instagram.png" });
  const imgList = await page.evaluate(() => {
    //toda essa funcao sera executado no navegador

    const nodeList = document.querySelectorAll("article img");

    const imageArray = [...nodeList];

    const imgList = imageArray.map(({ src }) => ({
      src,
    }));

    return imgList;
  });
 
  fs.writeFile('instagram.json', JSON.stringify(imgList, null,2),err => {
    if(err) throw new Error('DEU RUIM!')
    console.log('DEU BOM!');
  })

  await browser.close();
})();
