const SELECTORS = {
  ANDROID_LISTVIEW: '//android.widget.ListView',
  IOS_PICKERWHEEL: "-ios predicate string:type == 'XCUIElementTypePickerWheel'",
  DONE: `~header-Dropdown`,
};

class Picker {
  static async waitForIsShown(): Promise<void> {
    const selector = driver.isIOS
      ? SELECTORS.IOS_PICKERWHEEL
      : SELECTORS.ANDROID_LISTVIEW;
    const element = await $(selector);
    await element.waitForExist({ timeout: 11000 });
  }

  static selectValue(value: string): void {
    this.waitForIsShown();
    if (driver.isIOS) {
      this._setIosValue(value);
    } else {
      this._setAndroidValue(value);
    }
    this.waitForIsShown();
  }

  static async _setAndroidValue(value: string): Promise<void> {
    const element = await $(
      `${SELECTORS.ANDROID_LISTVIEW}/*[@text='${value}']`,
    );
    await element.click();
  }

  static async _setIosValue(value: string): Promise<void> {
    const IOS_PICKERWHEEL = await $(SELECTORS.IOS_PICKERWHEEL);
    await IOS_PICKERWHEEL.addValue(value);
    const DONE = await $(SELECTORS.IOS_PICKERWHEEL);
    await DONE.click();
  }
}

export default Picker;
