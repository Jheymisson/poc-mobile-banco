import { When, Then } from '@cucumber/cucumber';
import OpeningScreen from '../screenobjects/opening.screen';
import OnboardingScreen from '../screenobjects/onboarding.screen';

When('acesso a tela de onboarding', async () => {
    await OpeningScreen.triggerSignUp();
    await OnboardingScreen.InitialOnboardingPartOne();
});

When('preencho com Cpf, Nome pessoal, Nickname, Telefone, Email, {string}, {string}, Data de nascimento, {string} e {string} da Pessoa Fisica' ,async (password: string, mother: string, zipCode: string, number: string) => {
    await OnboardingScreen.triggerBtnPhysicalPerson();
    await OnboardingScreen.fillCpf();
    await OnboardingScreen.fillNamePerson();
    await OnboardingScreen.fillNickname();
    await OnboardingScreen.fillPhone();
    await OnboardingScreen.fillEmail();
    await OnboardingScreen.fillPassword(password);
    await OnboardingScreen.validPartOneOnboarding();
    await OnboardingScreen.initialOnboardingPartTwo();
    await OnboardingScreen.acceptTerms();
    await OnboardingScreen.fillNameMother(mother);
    await OnboardingScreen.fillBirthdate();
    await OnboardingScreen.fillZipCodePhysical(zipCode, number);
})

When('preencho com Cnpj, Nome da Empresa, Razao Social, Telefone, Email, {string}, {string}, {string}, {string}, {string}, {string} e {string} da Pessoa Jurídica' ,async (password: string, modality: string, company: string, zipcodeCommercial: string, nCommercial: string, zipcodeRepresentative: string, nRepresentative: string) => {
    await OnboardingScreen.triggerBtnLegalEntity();
    await OnboardingScreen.fillCnpj();
    await OnboardingScreen.fillNameLegalEntity();
    await OnboardingScreen.fillNameSocialReason();
    await OnboardingScreen.fillPhone();
    await OnboardingScreen.fillEmail();
    await OnboardingScreen.fillPassword(password);
    await OnboardingScreen.validPartOneOnboarding();
    await OnboardingScreen.initialOnboardingPartTwo();
    await OnboardingScreen.triggerTypeModality(modality);
    await OnboardingScreen.triggerCompanyType(company);
    await OnboardingScreen.acceptTerms();
    await OnboardingScreen.fillCommercialZipCode(zipcodeCommercial, nCommercial);
    await OnboardingScreen.fillRepresentativeData();
    await OnboardingScreen.fillZipCodeRepresentative(zipcodeRepresentative, nRepresentative);
    await OnboardingScreen.fillRepresentativeBirthdate();
    await OnboardingScreen.fillRepresentativeMotherName();
})

When('tiro a foto da selfie e documento RG', async () => {
    await OnboardingScreen.takeSelfie();
    await OnboardingScreen.takePhotographRG();
});

Then('preencho a {string}', async (pin: string) => {
    await OnboardingScreen.fillFourNumerosPassword(pin);
});

When('finalizo o onboarding', async () => {
    await OnboardingScreen.finishOnboarding();
});