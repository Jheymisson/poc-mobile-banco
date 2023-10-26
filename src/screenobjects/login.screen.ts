import BaseScreen from './base.screen';
import { DEVICE_ASSOCIATION, RECOVERY_PASSWORD, LOGIN } from './enums';

const SELECTORS = {
  INPUT_CPF_CNPJ: '',
  INPUT_PASSWORD: '',
  BTN_ADVANCE: '',
  LOGIN_BUTTON: '',

  BTN_SEND_OTP_SMS: '',
  BTN_FINISH: '',
  BTN_ACCESS_APP: '',

  BTN_RECOVERY_PASSWORD: '',
  INPUT_RECOVERY_PASSWORD: '',
  BTN_SEND_PASSWORD: '',
};

class LoginScreen extends BaseScreen {
  
  constructor() {
    super(SELECTORS.INPUT_CPF_CNPJ);
  }

  async triggerBtnAdvanced() {
    await this.click(await $(SELECTORS.BTN_ADVANCE));
  }

  async triggerLoginButton() {
    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
    }
    await this.click(await $(SELECTORS.LOGIN_BUTTON));
  }

  async triggerBtnSendSms() {
    await this.click(await $(SELECTORS.BTN_SEND_OTP_SMS));
  }

  async triggerBtnSendEmail() {
    await this.click(await $(SELECTORS.BTN_ADVANCE));
  }

  async triggerBtnFinishyOtp() {
    await this.click(await $(SELECTORS.BTN_FINISH));
  }

  async triggerBtnAdvancedOtp() {
    await this.click(await $(SELECTORS.BTN_ADVANCE));
  }

  async triggerBtnFinishRecovery() {
    await this.click(await $(SELECTORS.BTN_SEND_PASSWORD));
  }

  async triggerRecoveryPassword() {
    await this.click(await $(SELECTORS.BTN_RECOVERY_PASSWORD));
  }

  async fillCpfCnpj(cpfCnpj: string) {
    await this.waitForElementDisplayed(await $(SELECTORS.INPUT_CPF_CNPJ));
    await this.sendKeys(await $(SELECTORS.INPUT_CPF_CNPJ), cpfCnpj);
  }

  async fillPassword(password: string) {
    await this.click(await $(SELECTORS.BTN_ADVANCE));
    await this.waitForElementDisplayed(await $(SELECTORS.INPUT_PASSWORD));
    await this.sendKeys(await $(SELECTORS.INPUT_PASSWORD), password);
  }

  async fillOtpSms(telefone: string) {
    await this.fillSmsVerification(telefone);
  }

  async fillOtpEmail(email: string) {
    await this.fillEmailVerification(email);
  }

  async fillRecoveryPassword(senha: string) {
    await this.sendKeys(await $(SELECTORS.INPUT_RECOVERY_PASSWORD), senha);
  }

  async fillSmsVerification(phone: string) {
    await this.smsVerification(phone);
  }

  async fillEmailVerification(email: string) {
    await this.emailVerification(email);
  }

  async validTextAssociateDevice() {
    await this.validateText(DEVICE_ASSOCIATION.TITLE);
    await this.validateText(DEVICE_ASSOCIATION.SUB_TITLE);
  }

  async validTextLoginInvalid(msg: string) {
    await this.validateText(msg);
  }

  async validTextRecoveryPassword() {
    await this.validateText(RECOVERY_PASSWORD.TITLE);
    await this.validateText(RECOVERY_PASSWORD.SUB_TITLE);
  }

  async accessPageLogin() {
    await this.click(await $(SELECTORS.BTN_ACCESS_APP));
  }
}

export default new LoginScreen();
