import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const icon = await readFile(path.join(root, "public/icon.svg"), "utf8");
await page.setContent(`<html><body style="margin:0;background:#050b08;color:#f4f7f5;font-family:Arial,sans-serif"><div style="width:1200px;height:630px;box-sizing:border-box;padding:67px 78px;background:radial-gradient(ellipse at 90% 100%,#183b23,transparent 70%);position:relative;overflow:hidden"><div style="display:flex;align-items:center;gap:15px;font-size:45px;font-weight:600"><span style="width:54px;height:54px">${icon}</span>folio<span style="color:#83e6b5;margin-left:-14px">.</span></div><div style="font-size:12px;color:#a7c6b2;letter-spacing:3px;margin-top:51px">COMING SOON TO ROBINHOOD CHAIN</div><h1 style="font-size:69px;line-height:1.12;letter-spacing:-3px;font-weight:500;margin:23px 0 25px">One Terminal.<br/><span style="color:#83e6b5">Every Opportunity.</span></h1><p style="font-size:21px;color:#91a49a">Discover. Analyze. Trade.</p><div style="position:absolute;right:-120px;top:100px;width:550px;height:550px;border:1px solid #83e6b525;border-radius:50%"></div><div style="position:absolute;right:-40px;top:180px;width:390px;height:390px;border:1px solid #83e6b525;border-radius:50%"></div></div></body></html>`);
await page.screenshot({ path: path.join(root, "public/social-card.png") });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<html><body style="margin:0;background:#050b08">${icon}</body></html>`);
await page.screenshot({ path: path.join(root, "public/apple-touch-icon.png") });
await browser.close();
console.log("Generated self-contained social and touch icons.");
