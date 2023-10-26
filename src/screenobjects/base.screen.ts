import faker from 'faker';
import * as cpf from '@fnando/cpf';
import * as cnpj from '@fnando/cnpj';
import { expect } from 'chai';
import Gestures from '../helpers/Gestures';
import { DEFAULT_TIMEOUT } from '../Constants/constants';
import { PIN_CODE } from './enums';
import DateManager from 'moment';
import fs from 'fs-extra';
import path from 'path';
import QuerysMongo from '../mongo/querysMongo';

const SELECTORS = {
  BUTTON_SEND_MESSAGE_EMAIL: '',
  TRANSACTION_PASSWORD_1: '',
  TRANSACTION_PASSWORD_2: '',
  TRANSACTION_PASSWORD_3: '',
  TRANSACTION_PASSWORD_4: '',
  TRANSACTION_PASSWORD_5: '',
  TRANSACTION_PASSWORD_6: '',
};

export default class BaseScreen {
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  async waitForIsShown(): Promise<boolean | void> {
    const element: E = await $(this.selector);
    return element.waitForDisplayed({
      timeout: DEFAULT_TIMEOUT,
    });
  }

  async isDisplayed(): Promise<boolean | void> {
    const element: E = await $(this.selector);
    return element.isDisplayed();
  }

  async waitForElementDisplayed(element: E): Promise<void> {
    await element.waitForDisplayed({ timeout: DEFAULT_TIMEOUT });
  }

  async sendKeys(element: E, value: string): Promise<void> {
    await this.waitForElementDisplayed(element);
    await element.click();
    await element.setValue(value);
  }

  async hideKeyboard(): Promise<void> {
    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
    }
  }

  async click(element: E): Promise<void> {
    await this.waitForElementDisplayed(element);
    await element.click();
  }

  async getTextElement(element: E): Promise<string> {
    await this.waitForElementDisplayed(element);
    return element.getText();
  }

  async validateText(message: string) {
    const msg: E = await this.getElementXpathText(message);
    await this.assertText(msg, message);
  }

  async getElementById(valueId: string): Promise<E> {
    const elementId = await driver.findElement('id', valueId);
    return $(elementId);
  }

  async getElementXpathText(valueText: string): Promise<E> {
    return await $(`//*[@text='${valueText}']`);
  }

  getFakerName(): string {
    return faker.name.findName().replace('.', '');
  }

  getFakerLegalEntity(): string {
    return faker.company.companyName(0).replace('-','').replace(/'/g,'');
  }

  getFakerNickname(): string {
    return faker.name.firstName();
  }

  getFakerCorporateName(): string {
    return `${faker.name.jobType()} Mei`;
  }

  getCpfFaker(): string {
    return cpf.generate(false);
  }

  getCnpjFaker(): string {
    return cnpj.generate(false);
  }

  getPhoneFaker(): string {
    return faker.phone.phoneNumber('61982######');
  }

  getMailFaker(): string {
    return `automacao_${faker.random.alphaNumeric(5)}@test.io`;
  }

  getBirthdateFaker(): Date {
    return faker.date.between('1960-01-01T00:00:00.000Z', '2002-01-01T00:00:00.000Z');
  }

  async assertText(element: E, textExpected: string): Promise<void> {
    await this.waitForElementDisplayed(element);
    expect(await element.getText()).to.equal(textExpected);
  }

  async assertSize(value: string, valueExpected: string): Promise<void> {
    expect(value).to.equal(valueExpected);
  }

  async swipeElementUp(element: E): Promise<void> {
    for (let i = 0; i < 5; i++) {
      try {
        await Gestures.swipeUp();
        await element.waitForDisplayed({ timeout: 2000 });
        break;
      } catch (e) {
        if (e.name === 'NoSuchElementError')
          await console.log('Element not yet visible');
      }
    }
  }

  async smsVerification(phone: string) {
    const smsCode = await QuerysMongo.getTokenSms(phone);
    await this.click(await $(SELECTORS.TRANSACTION_PASSWORD_1));
    await this.sendKeysPinCode(smsCode);
  }

  async emailVerification(email: string) {
    const emailCode = await QuerysMongo.getTokenEmail(email);
    await this.click(await $(SELECTORS.TRANSACTION_PASSWORD_1));
    await this.sendKeysPinCode(emailCode);
  }

  async getPinCode(pin: string): Promise<string[]> {
    const charArray = [];
    for (let index = 0; index < pin.length; index++) {
      const currentPin = pin[index];
      //@ts-ignore
      charArray.push(PIN_CODE(driver.isAndroid)[currentPin]);
    }
    console.log(charArray);
    return charArray;
  }

  async sendKeysPinCode(otp: string) {
    const pinCode: string[] = await this.getPinCode(otp);
    await this.waitForElementDisplayed(
      await $(SELECTORS.TRANSACTION_PASSWORD_1),
    );

    const pinCodeElement: [string, string, string, string, string, string] = [
      SELECTORS.TRANSACTION_PASSWORD_1,
      SELECTORS.TRANSACTION_PASSWORD_2,
      SELECTORS.TRANSACTION_PASSWORD_3,
      SELECTORS.TRANSACTION_PASSWORD_4,
      SELECTORS.TRANSACTION_PASSWORD_5,
      SELECTORS.TRANSACTION_PASSWORD_6,
    ];
    if (driver.isAndroid) {
      for (let i = 0; i < pinCode.length; i++) {
        await driver.pressKeyCode(parseInt(pinCode[i]));
      }
    } else {
      for (let i = 0; i < pinCode.length; i++) {
        await this.sendKeys(await $(pinCodeElement[i]), pinCode[i]);
      }
    }
  }

  async logMessage(message: string): Promise<void> {
    // @ts-ignore
    process.emit('test:log', message);
  }

  async takeScreenshot(message: string): Promise<this> {
    const timestamp = DateManager().format('YYYYMMDD-HHmmss.SSS');
    await fs.ensureDirSync('reports/html-reports/screenshots/');
    const filepath = path.join(
      'reports/html-reports/screenshots/',
      `${timestamp}.png`,
    );
    await driver.saveScreenshot(filepath);
    await this.logMessage(message);
    // @ts-ignore
    process.emit('test:screenshot', filepath);
    return this;
  }
}
