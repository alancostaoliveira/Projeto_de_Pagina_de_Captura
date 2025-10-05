const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const outDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // helper sleep for compatibility
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    // Desktop
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:8000/inscricao.html', {
      waitUntil: 'networkidle2',
    });
    await page.screenshot({
      path: path.join(outDir, 'inscricao-desktop.png'),
      fullPage: true,
    });

    // Click main button to open popup (desktop)
    try {
      await page.click('.botao--amarelo.js-botao');
      await sleep(400);
      await page.screenshot({
        path: path.join(outDir, 'popup-aberto-desktop.png'),
      });
    } catch (e) {
      console.warn('Não foi possível clicar no botão desktop:', e.message);
    }

    // Mobile
    await page.setViewport({ width: 375, height: 800, isMobile: true });
    await page.goto('http://localhost:8000/inscricao.html', {
      waitUntil: 'networkidle2',
    });
    await page.screenshot({
      path: path.join(outDir, 'inscricao-mobile.png'),
      fullPage: true,
    });

    // Click main button to open popup (mobile)
    try {
      await page.click('.botao--amarelo.js-botao');
      await sleep(400);
      await page.screenshot({
        path: path.join(outDir, 'popup-aberto-mobile.png'),
      });
    } catch (e) {
      console.warn('Não foi possível clicar no botão mobile:', e.message);
    }

    await browser.close();
    console.log('Screenshots salvas em:', outDir);
  } catch (err) {
    console.error('Erro no script de QA:', err);
    process.exit(1);
  }
})();
