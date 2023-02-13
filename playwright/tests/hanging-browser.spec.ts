import { test } from '@playwright/test';
const LOCAL_HOST = 'http://localhost:4200/';
const USERNAME = 'andrew@advaitabio.com';
const PASSWORD = 'orijj9IQ*@3A';
const RELOAD_BUTTON =
  'body > ngb-modal-window > div > div > sessionexpiredmodal > div.modal-footer > button';
const USERNAME_INPUT = '#username';
const PASSWORD_INPUT = '#password';
test('Make sure upset changes when drop down for pvlaue or regulators is changed.', async ({
  page,
}) => {
  //========================Login Start==================================
  await page.goto(LOCAL_HOST);
  //========================Login End==================================
  //========================Login Start==================================
  await page.waitForTimeout(60000 * 80);
  //========================Browser Exit==================================
});
