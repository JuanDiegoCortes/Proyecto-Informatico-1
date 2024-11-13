import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function registerTest() {
  let options = new chrome.Options();
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('http://localhost:5173/register');

    await driver.wait(until.elementLocated(By.id('name')), 10000);
    await driver.findElement(By.id('name')).sendKeys('Sofia');
    await sleep(1000);  
    
    await driver.wait(until.elementLocated(By.id('lastname')), 10000);
    await driver.findElement(By.id('lastname')).sendKeys('Giraldo');
    await sleep(1000);  

    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('Sofia23');
    await sleep(1000);  

    await driver.wait(until.elementLocated(By.id('birthdate')), 10000);
    await driver.findElement(By.id('birthdate')).sendKeys('1990-01-01');
    await sleep(1000);  

    await driver.wait(until.elementLocated(By.id('phone_number')), 10000);
    await driver.findElement(By.id('phone_number')).sendKeys('1234567890');
    await sleep(1000);  

    await driver.wait(until.elementLocated(By.id('email')), 10000);
    await driver.findElement(By.id('email')).sendKeys('sofia@gmail.com');
    await sleep(1000);  
    await driver.wait(until.elementLocated(By.id('password')), 10000);
    await driver.findElement(By.id('password')).sendKeys('123456789');
    await sleep(1000);  

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.id('successMessage')), 10000);
    console.log('Registro completado con éxito');

  } catch (error) {
    console.error('Error durante el registro:', error.message);
  } finally {
    await driver.close();
    await driver.quit();
  }
})();
