import BaseScreen from './base.screen';
import { ONBOARDING } from './enums';
import { ONBOARDING_CONSTANTS } from  './constants_screen/onboarding.constants';
import moment from 'moment';

class OnboardingScreen extends BaseScreen {

    constructor() {
      super(ONBOARDING_CONSTANTS.BTN_ADVANCED);
    }
  
    async validTextInitialOnboarding() {
        await this.validateText(ONBOARDING.TITLE);
        await this.validateText(ONBOARDING.SUB_TITLE);
    }

    async InitialOnboardingPartOne() {
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_INITIAL));
        await this.validateText(ONBOARDING.ACCOUNT_TYPE);
    }

    async triggerBtnPhysicalPerson() {
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_PHYSICAL_PERSON))
    }

    async triggerBtnLegalEntity() {
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_LEGAL_ENTITY))
    }

    async fillCpf() {
        const cpf: string = this.getCpfFaker();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_CPF), cpf);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillCnpj() {
        const cnpj: string = this.getCnpjFaker();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_CNPJ), cnpj);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillNamePerson() {
        const nome: string = this.getFakerName();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NAME_PHYSICAL), nome);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillNameLegalEntity() {
        const empresa: string = this.getFakerLegalEntity();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NAME_LEGAL_ENTITY), empresa);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }
    
    async fillNickname() {
        const nickname: string = this.getFakerNickname();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NICKNAME), nickname);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillNameSocialReason() {
        const razao: string = this.getFakerCorporateName();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_REASON_SOCIAL), razao);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillPhone() {
        const phone: string = this.getPhoneFaker();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.CELL_PHYSICAL), phone);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.fillSmsVerification(phone);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }
    
    async fillEmail() {
        const email: string = this.getMailFaker();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.EMAIL_PHYSICAL), email);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.fillEmailVerification(email);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillSmsVerification(phone: string) {
        await this.smsVerification(phone);
    }
    
      async fillEmailVerification(email: string) {
        await this.emailVerification(email);
    }

    async fillPassword(senha: string) {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.PASSWORD), senha);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_SEND));
    }

    async validPartOneOnboarding() {
        await this.validateText(ONBOARDING.ACCOUNT_SUCESS);
        await this.validateText(ONBOARDING.ACCOUNT_SUCESS2);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_SEND_DOCUMENTS));
    }

    async initialOnboardingPartTwo() {
        await this.validateText(ONBOARDING.ONBOARDING_TEXT_3);
        await this.validateText(ONBOARDING.ONBOARDING_TEXT_4);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async triggerTypeModality(modalityType: string) {
        switch(modalityType) {
            case 'meiEiEirelle':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MEI_EI_EIRELLI));
                break;
            case 'ltdaSa':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MEI_EI_EIRELLI));
                break;
            default:
                console.log('Modalidade inexistente');
                break;
        }
        return modalityType;
    }

    async triggerCompanyType(companyType: string) {
        switch(companyType) {
            case 'mei':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MODALITY_MEI));
                break;
            case 'eiMe':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MODALITY_EI_ME));
                break;
            case 'eiEpp':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MODALITY_EI_EPP));
                break;
            case 'eirelleMe':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MODALITY_EIRELLI_ME));
                break;
            case 'eirelleEpp':
                await this.click(await $(ONBOARDING_CONSTANTS.BTN_MODALITY_EIRELLI_EPP));
                break;
            default:
                console.log('Tipo de empresa inexistente');
                break;
        }
        return companyType;
    }

    async acceptTerms() {
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_READ_TERM_USE));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ACCEPT_TERMS));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_READ_PRIVACY_POLITICS));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ACCEPT_TERMS));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_READ_ACCEPT_TERMS));
    }

    async fillNameMother(mae: string) {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NAME_MOTHER), mae);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillBirthdate() {
        const birthdate: string = this.getBirthdateFaker().toString();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_BIRTHDATE), moment(birthdate).format('DD/MM/YYYY'));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillZipCodePhysical(cep: string, numero: string) {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_FILL_CEP), cep);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NUMERO_END), numero);
        await this.hideKeyboard();
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillCommercialZipCode(cep: string, numero: string) {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_CEP_COMMERCIAL), cep);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NUMERO_END), numero);
        await this.hideKeyboard();
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillZipCodeRepresentative(cep: string, numero: string) {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_FILL_CEP_REPRESENTATIVE), cep);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NUMERO_END), numero);
        await this.hideKeyboard();
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillRepresentativeData() {
        const nomeRepresentante: string = this.getFakerName();
        const nickname: string = this.getFakerNickname();
        const cpfRepresentative: string = this.getCpfFaker();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NAME_REPRESENTATIVE), nomeRepresentante);
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NICKNAME_REPRESENTATIVE), nickname);
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_CPF_REPRESENTATIVE), cpfRepresentative);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async fillRepresentativeBirthdate() {
        const birthdate: string = this.getBirthdateFaker().toString();
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_BIRTHDATE_REPRESENTATIVE), moment(birthdate).format('DD/MM/YYYY'));
    }

    async fillRepresentativeMotherName() {
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_NAME_MTOTHER_REPRESENTATIVE), 'Luiza da Silva');
        await this.hideKeyboard();
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async takeSelfie() {
        await this.validateText(ONBOARDING.ONBOARDING_SELFIE1);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
        //await this.click(await $(ONBOARDING_CONSTANTS.BTN_ACCEPT_CAN));
        await this.validateText(ONBOARDING.ONBOARDING_SELFIE2);
        //await this.validateText(ONBOARDING.ONBOARDING_SELFIE3);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_OK));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_TAKE_PHOTOGRAPH));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_USE_PHOTOGRAPH));
    }

    async takePhotographRG() {
        //await this.validateText(ONBOARDING.ONBOARDING_DOC1);
        console.log(ONBOARDING.ONBOARDING_DOC1)
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_RG));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_TAKE_PHOTOGRAPH));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_USE_PHOTOGRAPH));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_TAKE_PHOTOGRAPH));
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_USE_PHOTOGRAPH));
    }

    async fillFourNumerosPassword(pin: string) {
        await this.validateText(ONBOARDING.ONBOARDING_FOUR_PASSWORD1);
        await this.validateText(ONBOARDING.ONBOARDING_FOUR_PASSWORD2);
        await this.sendKeys(await $(ONBOARDING_CONSTANTS.INPUT_FOUR_NUMBERS_PASSWORD), pin);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_ADVANCED));
    }

    async finishOnboarding() {
        await this.validateText(ONBOARDING.FINISH_ONBOARDING1);
        await this.validateText(ONBOARDING.FINISH_ONBOARDING2);
        await this.click(await $(ONBOARDING_CONSTANTS.BTN_RETURN_APP));
    }


}
  
export default new OnboardingScreen();
  