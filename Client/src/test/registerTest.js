import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function registerTest() {
  let options = new chrome.Options();
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('http://localhost:5173/register'); // Cambia la URL según sea necesario

    await driver.wait(until.elementLocated(By.css('input[placeholder="Name"]')), 10000);

    await driver.findElement(By.css('input[placeholder="Name"]')).sendKeys('John');
    await driver.sleep(1000); // Pausa de 1 segundo
    await driver.findElement(By.css('input[placeholder="Lastname"]')).sendKeys('Doe');
    await driver.sleep(1000); // Pausa de 1 segundo
    await driver.findElement(By.css('input[placeholder="Birthdate"]')).sendKeys('1990-01-01');
    await driver.sleep(1000); // Pausa de 1 segundo
    await driver.findElement(By.css('input[placeholder="Phone Number"]')).sendKeys('1234567890');
    await driver.sleep(1000); // Pausa de 1 segundo
    await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('john.doe@example.com');
    await driver.sleep(1000); // Pausa de 1 segundo
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('password123');
    await driver.sleep(1000); // Pausa de 1 segundo

    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000); // Pausa de 1 segundo

    // Espera a que la página de confirmación o el mensaje de éxito esté presente
    await driver.wait(until.elementLocated(By.id('successMessage')), 10000);

    console.log('Registro completado con éxito');
  } catch (error) {
    console.error('Error durante el registro:', error);
  } finally {
    await driver.quit();
  }
})();

//node src/test/registerTest.js