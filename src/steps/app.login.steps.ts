import { Given, When, Then } from '@cucumber/cucumber';
import LoginScreen from '../screenobjects/login.screen';
import HomeScreen from '../screenobjects/home.screen';
import OpeningScreen from '../screenobjects/opening.screen'

Given('que acesso a tela inicial do APP', async () => {
  await OpeningScreen.waitInitialScreen();
});

When('acesso a tela de login', async () => {
  await OpeningScreen.triggerSignIn();
});

When('preencho {string} e {string}', async (cpfCnpj: string, senha: string) => {
  await LoginScreen.fillCpfCnpj(cpfCnpj);
  await LoginScreen.triggerBtnAdvanced();
  await LoginScreen.fillPassword(senha);
  await LoginScreen.triggerLoginButton();
});

When('preencho {string}', async (cpfCnpj: string) => {
  await LoginScreen.fillCpfCnpj(cpfCnpj);
  await LoginScreen.triggerBtnAdvanced();
  await LoginScreen.triggerRecoveryPassword();
});

When(
  'associo o device preenchendo o codigo sms do {string} e codigo email do {string}',
  async (phone: string, email: string) => {
    await LoginScreen.validTextAssociateDevice();
    await LoginScreen.triggerBtnSendSms();
    await LoginScreen.fillOtpSms(phone);
    await LoginScreen.triggerBtnSendEmail();
    await LoginScreen.fillOtpEmail(email);
    await LoginScreen.triggerBtnFinishyOtp();
  },
);

When(
  'recupero a senha da conta preenchendo o codigo sms do {string} e codigo email do {string}',
  async (phone: string, email: string) => {
    await LoginScreen.validTextRecoveryPassword();
    await LoginScreen.triggerBtnSendSms();
    await LoginScreen.fillOtpSms(phone);
    await LoginScreen.triggerBtnSendEmail();
    await LoginScreen.fillOtpEmail(email);
    await LoginScreen.triggerBtnAdvancedOtp();
  },
);

When('preecho com a {string}', async (senha: string) => {
  await LoginScreen.fillRecoveryPassword(senha);
  await LoginScreen.triggerBtnFinishRecovery();
  await LoginScreen.accessPageLogin();
});

When('não preencho {string}', async (cpfCnpj: string) => {
  await LoginScreen.fillCpfCnpj(cpfCnpj);
  await LoginScreen.triggerBtnAdvanced();
});

Then('deve ser exibida a Home Page', async () => {
  await LoginScreen.accessPageLogin();
  await HomeScreen.waitInitialScreen();
});

When('aciono o botão de acessar a Home Page', async () => {
  await LoginScreen.accessPageLogin();
});

Then('é exibido a {string}', async (msg: string) => {
  await LoginScreen.validTextLoginInvalid(msg);
});
