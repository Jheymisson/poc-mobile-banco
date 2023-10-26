# Appium Cucumber - Template Builders

## Tecnologias
- Cucumber
- Appium
- WebdriverIO
- Chai
- Supertest
- TypeScript

## APP a ser testados

Os arquivos .apk (Android) e .app (iOS) devem esta no diretório: `./apps`

## Requisitos
- node >= v14.0.0
- yarn >= 1.17.3

```
nvm install 12.4.1
nvm use 12.14.1
```

## Dependencias

```
yarn global add appium
```

Para rodar em emulador iOS precisar instalar o carthage

```
brew install carthage
```

### Configuração de Ambiente

```
$(dirname $(readlink $(which javac)))/java_home
```
Pegue o output e coloque no seu ~/.zshrc ou no seu ~/.bash_profile:

(EXEMPLO):
```
##ANDORID
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/build-tools/29.0.3

##JAVA
export JAVA_HOME="/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home"

```

### Configuração capabilities

iOS
```
config.capabilities = [
    {
        platformName: 'iOS',
        maxInstances: 1,
        deviceName: 'iPhone 11 Pro Max', <-- aqui o nome do seu emulador
        platformVersion: '13.5', <-- aqui a versão do iOS do seu emulador
        orientation: 'PORTRAIT',
        autoDismissAlerts: true,
        autoAcceptAlerts: true,
        automationName: 'XCUITest',
        'appium:app': join(
            process.cwd(),
            './apps/template_ios.app', <-- aqui o app que será testado, (Obs. não pode ser .ipa)
        )
    },
];
```

Android
```
config.capabilities = [
    {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'emulator-5554',
        appPackage: 'com.template',  <--- coloque aqui package do seu projeto
        orientation: 'PORTRAIT',
        appActivity: 'com.template.MainActivity', <-- aqui o MainActivity para o appium identificar que o app esta carregado
        app: join(
            process.cwd(),
            './apps/app-release.apk', <-- aqui o apk que será testado
        )
    },
]; 
```

## Appium Service
O servidor do appium é junto com a execução dos testes

## Emuladores
Para exeução dos testes os emuladores Android ou iOS devem esta em execução

## Getting Started
Para instalar as dependencia

```bash
$ yarn
````

## Para executar os testes:
```bash
// Em Android
$ yarn app:android

// Em iOS
$ yarn app:ios
```


## Reports Html

Após executar os testes, o report é encontrado dentro da pasta ``reports/html-reports/report-qa.html``

Execute o comando para inciar o servidor da allure para abrir o report gerado:

### Report PDF

Para gerar o report em pdf, após a execução rode o comando 
```bash
yarn pdf
```

## Eslint and Prettier
Executar check lint:

```bash
$ yarn lint
```

Padrão de formatação com pretty:

```bash
$ yarn pretty
```

## Localização de elementos em app React Native

Para usar a estratégia de localização de elementos por acessibilidade `accessibilityID`, segue o exemplo:

```
const SELECTORS = {
     LOGIN_BUTTON: '~Fazer login',
};

doLogin(){
    $(SELECTORS.LOGIN_BUTTON).click();
}
```

Exemplo para buscar com xpath:

```
const SELECTORS = {
     LOGIN_BUTTON: '//*[@text='Fazer login']',
};

doLogin(){
    $(SELECTORS.LOGIN_BUTTON).click();
}
```

##### Obs: Existem métodos para buscar xpath e id dentro da classe [base.screen.js](src/screenobjects/base.screen.js)
