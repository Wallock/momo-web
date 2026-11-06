import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const origin=process.env.TEST_BASE_URL||'http://127.0.0.1:3200';
await mkdir('docs/qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[],badResponses=[],checks=[];
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&!r.url().includes('missing-page'))badResponses.push(`${r.status()} ${r.url()}`)});
const check=(name,value)=>{assert.ok(value,name);checks.push(name)};
const loaded=async()=>{await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getBoundingClientRect().bottom>0).map(i=>i.decode().catch(()=>{}))));};
check('Homepage HTTP 200',(await page.goto(origin)).status()===200);
await loaded();
const fontInfo=await page.evaluate(()=>({body:getComputedStyle(document.body).fontFamily,heading:getComputedStyle(document.querySelector('h1')).fontFamily,faces:[...document.fonts].filter(f=>f.status==='loaded').map(f=>({family:f.family,weight:f.weight}))}));
check('FC Vision body font applied',/vision/i.test(fontInfo.body));
check('FC Vision display font applied',/vision/i.test(fontInfo.heading)&&fontInfo.heading!==fontInfo.body);
check('Both local FC font faces loaded',fontInfo.faces.filter(f=>/vision/i.test(f.family)).length>=2);
check('Illustrated border HTTP 200',(await page.request.get(`${origin}/art/lotus-border-v1.png`)).status()===200);
check('Decorative art does not block controls',await page.locator('.forest-border').first().evaluate(e=>getComputedStyle(e).pointerEvents==='none'));
check('Thai document language',await page.locator('html').getAttribute('lang')==='th');
check('Monmora title',(await page.title()).includes('Monmora Online'));
await page.screenshot({path:'docs/qa/desktop.png',fullPage:true});
for(const id of ['sword','bow','magic']){
 await page.locator(`#tab-${id}`).click();await loaded();
 check(`Class ${id} selection`,await page.locator(`#tab-${id}`).getAttribute('aria-selected')==='true');
 check(`Class ${id} panel`,await page.locator(`#panel-${id}`).isVisible());
 check(`Class ${id} illustration`,await page.locator('.sprite img').evaluate(i=>i.complete&&i.naturalWidth>0));
}
await page.locator('#tab-sword').click();await page.locator('#tab-sword').press('ArrowRight');
check('Class keyboard navigation',await page.locator('#tab-bow').getAttribute('aria-selected')==='true');
await page.locator('#classes').screenshot({path:'docs/qa/desktop-class.png'});
for(const id of ['north','northeast','central','west','south']){
 await page.locator(`#tab-region-${id}`).click();
 check(`Region ${id} selection`,await page.locator(`#region-${id}`).isVisible());
}
await page.locator('#tab-region-south').press('Home');
check('Region Home keyboard navigation',await page.locator('#tab-region-north').getAttribute('aria-selected')==='true');
await page.locator('.gallery-trigger').click();await loaded();
check('Gallery opens',await page.locator('dialog').evaluate(d=>d.open));
await page.locator('.gallery-controls button').last().click();
check('Gallery next image',(await page.locator('.gallery-controls span').textContent()).includes('2 / 3'));
await loaded();await page.screenshot({path:'docs/qa/gallery.png'});
await page.keyboard.press('Escape');
check('Gallery Escape closes',!(await page.locator('dialog').evaluate(d=>d.open)));
check('Gallery restores focus',await page.locator('.gallery-trigger').evaluate(e=>e===document.activeElement));
await page.locator('details').first().locator('summary').click();
check('FAQ expands',await page.locator('details').first().getAttribute('open')!==null);
check('Homepage has no external game links',await page.locator('a').evaluateAll(es=>es.every(e=>!e.getAttribute('href')?.startsWith('http'))));
check('Timeline has four ordered stages',await page.locator('.launch-steps > li').count()===4);
check('Only information stage is current',await page.locator('.launch-steps [aria-current],.launch-steps > [aria-current]').count()===1);
check('CTA points to timeline',await page.locator('.header-play').getAttribute('href')==='#timeline');
await page.locator('.header-play').click();
check('CTA navigates to timeline',new URL(page.url()).hash==='#timeline');
check('Timeline is visible',await page.locator('#timeline').isVisible());
await page.locator('#timeline').screenshot({path:'docs/qa/desktop-timeline.png'});
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:900});
 check(`No horizontal overflow at ${width}px`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
await page.setViewportSize({width:390,height:844});await page.goto(origin);await loaded();
await page.screenshot({path:'docs/qa/mobile-top.png'});
await page.locator('.menu-toggle').click();
check('Mobile menu opens',await page.locator('.menu-toggle').getAttribute('aria-expanded')==='true');
await page.locator('.primary-nav a[href="#classes"]').click();
check('Mobile navigation closes menu',await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false');
await page.locator('.sprite img').evaluate(i=>i.decode());
await page.locator('#classes').screenshot({path:'docs/qa/mobile-class.png'});
await page.locator('#world').screenshot({path:'docs/qa/mobile-world.png'});
await page.locator('#timeline').screenshot({path:'docs/qa/mobile-timeline.png'});
for(const slug of ['first-adventure','five-regions','make-it-yours']){
 const response=await page.goto(`${origin}/journal/${slug}`);await loaded();
 check(`Guide ${slug} HTTP 200`,response.status()===200);
 check(`Guide ${slug} has content`,await page.locator('.article-body h2').count()>=3);
 check(`Guide ${slug} links to timeline`,await page.locator('.article-invite a').getAttribute('href')==='/#timeline');
 check(`Guide ${slug} has no external game links`,await page.locator('a').evaluateAll(es=>es.every(e=>!e.getAttribute('href')?.startsWith('http'))));
 check(`Guide ${slug} no overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(slug==='first-adventure')await page.screenshot({path:'docs/qa/mobile-guide.png',fullPage:true});
}
check('Unknown guide HTTP 404',(await page.goto(`${origin}/journal/missing-page`)).status()===404);
check('Robots HTTP 200',(await page.request.get(`${origin}/robots.txt`)).status()===200);
check('Favicon HTTP 200',(await page.request.get(`${origin}/art/app-icon.png`)).status()===200);
check('No browser JS errors',errors.length===0);
check('No failed application/image requests',badResponses.length===0);
await browser.close();
const report={date:new Date().toISOString(),origin,checks,fontInfo,errors,badResponses};
await writeFile('docs/qa/results.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:checks.length,errors,badResponses},null,2));
