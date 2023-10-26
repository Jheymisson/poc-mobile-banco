import BaseScreen from './base.screen';

const SELECTORS = {
  USERNAME_HOME: '',
  NOTIFICATION: '',
  ACCESS_PROFILE: '',
  CARD_WINDOW_HOME: '',
  BANNER_1: '',
  BANNER_2: '',
  BANNER_3: '',
  BTN_STATEMENT_HOME: '',
  BTN_PAYMENT_HOME: '',
  BTN_TRANSFER: '',
  BTN_PIX_HOME: '',
  BTN_CASH_IN_HOME: '',
};

class HomeScreen extends BaseScreen {
  constructor() {
    super(SELECTORS.USERNAME_HOME);
  }

  async waitInitialScreen() {
    await this.waitForElementDisplayed(await $(SELECTORS.USERNAME_HOME));
    await this.waitForElementDisplayed(await $(SELECTORS.NOTIFICATION));
    await this.waitForElementDisplayed(await $(SELECTORS.ACCESS_PROFILE));
    await this.waitForElementDisplayed(await $(SELECTORS.CARD_WINDOW_HOME));
    await this.waitForElementDisplayed(await $(SELECTORS.BANNER_1));
    await this.waitForElementDisplayed(await $(SELECTORS.BANNER_2));
    await this.waitForElementDisplayed(await $(SELECTORS.BANNER_3));
    await this.waitForElementDisplayed(await $(SELECTORS.BTN_STATEMENT_HOME));
    await this.waitForElementDisplayed(await $(SELECTORS.BTN_PAYMENT_HOME));
    await this.waitForElementDisplayed(await $(SELECTORS.BTN_TRANSFER));
    await this.waitForElementDisplayed(await $(SELECTORS.BTN_PIX_HOME));
    await this.waitForElementDisplayed(await $(SELECTORS.BTN_CASH_IN_HOME));
  }
}

export default new HomeScreen();
