'use strict'

const puppeteer = require('puppeteer')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot')
const PuppeteerHar = require('puppeteer-har')
const shell = require('shelljs')

const width = 800
const height = 600
const delayMS = 5

let browser
let page
let har

// threshold is the difference in pixels before the snapshots dont match
const toMatchImageSnapshot = configureToMatchImageSnapshot({
	customDiffConfig: { threshold: 2 },
	noColors: true,
})
expect.extend({ toMatchImageSnapshot })

beforeAll( async() => {
	browser = await puppeteer.launch({ headless: true, slowMo: delayMS, args: [`--window-size=${width},${height}`] })
	page = await browser.newPage()
	har = new PuppeteerHar(page)
	await page.setViewport({ width, height })
})

afterAll( async() => {
	browser.close()
})

beforeEach(async() => {
})

describe('Counting word Occurrences', () => {
	test('Submitting text', async done => {
		//start generating a trace file.
		await page.tracing.start({path:'trace/word_counter_har.json',screenshots: true})
		await har.start({ path: 'results.har' });
		//ARRANGE
		await page.goto('http://localhost:3000/new', { timeout: 30000, waitUntil: 'load' })
		//ACT
		await page.type('input[name=Word]', 'foo')
		await page.type('input[name=Text]', 'foo bar foo')
		await page.click('button[type=submit]')

		//ASSERT
		//check that the counter field has been updated:
		await page.waitForSelector('h1')


		//todo: fix acceptance tests 
		const counter1 = await page.h1()
		expect(counter1).toBe('2')

		// // grab a screenshot
		const image = await page.screenshot()
		// compare to the screenshot from the previous test run
		expect(image).toMatchImageSnapshot()
		// stop logging to the trace files
		await page.tracing.stop()
		await har.stop()
		done()
	}, 16000)
})
