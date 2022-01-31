const puppeteer = require('puppeteer');
const cheerio = require('react-native-cheerio');

async function scrapePage(url:string){
  const browser = await puppeteer.launch({defaultViewport:null});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto(url,{waitUntil:'networkidle0'});
  await autoScroll(page);
  let markup = await page.content();
  return scrapeData(markup);
}

function scrapeData(markup:String){
  const colorStorage:any = [];
  let oneColorStorage:any = [];
  const $ = cheerio.load(markup)
  const colorPaletes = $('.feed.global .item .palette span');
  colorPaletes.each((idx:number,palete:HTMLSpanElement)=> {
    if(idx > 3){
      oneColorStorage.push($(palete).text());
      if((idx+1) % 4 === 0 ){
        colorStorage.push(oneColorStorage);
        oneColorStorage = [];
      }
    }
  })
  return colorStorage;
}

async function autoScroll(page:any){
  await page.evaluate(async () => {
      await new Promise<void>((resolve, reject) => {
          var totalHeight = 0;
          var distance = 350;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 200);
      });
  });
}
export {scrapePage};