import BaseScreen from './base.screen';
import { OPENING } from './enums';

const SELECTORS = {
    SIGN_IN_BUTTON: '',
    SIGN_UP_BUTTON: '',
};

class OpeningScreen extends BaseScreen {

    constructor() {
      super(SELECTORS.SIGN_IN_BUTTON);
    }

    async waitInitialScreen() {
        await this.validateText(OPENING.TITLE_LOGIN);
        await this.waitForElementDisplayed(await $(SELECTORS.SIGN_IN_BUTTON));
        await this.waitForElementDisplayed(await $(SELECTORS.SIGN_UP_BUTTON));
    }
  
    async triggerSignIn() {
        await this.click(await $(SELECTORS.SIGN_IN_BUTTON));
      }
    
      async triggerSignUp() {
        await this.click(await $(SELECTORS.SIGN_UP_BUTTON));
      }

}
  
export default new OpeningScreen();
  