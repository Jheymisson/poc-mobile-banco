import { After, Status } from '@cucumber/cucumber';
import BaseScreen from '../screenobjects/base.screen';
const baseScreen = new BaseScreen('test');

After(async (scenario: any) => {
  if ((await scenario.result.status) == (await Status.FAILED)) {
    await baseScreen.takeScreenshot('test failed');
  }
  await driver.reset();
});
