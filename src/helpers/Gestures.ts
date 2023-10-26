let SCREEN_SIZE: ScreenSize;

interface SwipeEvent {
  start: ScreenCoordinates;
  end: ScreenCoordinates;
}

interface SwipeDirections {
  up: SwipeEvent;
  down: SwipeEvent;
  left: SwipeEvent;
  right: SwipeEvent;
}

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION: SwipeDirections = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 },
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 },
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 },
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 },
  },
};

class Gestures {
  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   */
  static async checkIfDisplayedWithScrollDown(
    element: E,
    maxScrolls: number,
    amount = 0,
  ): Promise<void> {
    if (
      (!element.isExisting() || !element.isDisplayed()) &&
      (await amount) <= maxScrolls
    ) {
      await this.swipeUp(0.85);
      await this.checkIfDisplayedWithScrollDown(
        element,
        maxScrolls,
        amount + 1,
      );
    } else if (amount > maxScrolls) {
      throw new Error(
        `The element '${element}' could not be found or is not visible.`,
      );
    }
  }

  /**
   * Swipe down based on a percentage
   */
  static async swipeDown(percentage = 1): Promise<void> {
    await this.swipeOnPercentage(
      await this._calculateXY(SWIPE_DIRECTION.down.start, percentage),
      await this._calculateXY(SWIPE_DIRECTION.down.end, percentage),
    );
  }

  /**
   * Swipe Up based on a percentage
   */
  static async swipeUp(percentage = 1): Promise<void> {
    await this.swipeOnPercentage(
      await this._calculateXY(SWIPE_DIRECTION.up.start, percentage),
      await this._calculateXY(SWIPE_DIRECTION.up.end, percentage),
    );
  }

  /**
   * Swipe left based on a percentage
   */
  static async swipeLeft(percentage = 1): Promise<void> {
    await this.swipeOnPercentage(
      await this._calculateXY(SWIPE_DIRECTION.left.start, percentage),
      await this._calculateXY(SWIPE_DIRECTION.left.end, percentage),
    );
  }

  /**
   * Swipe right based on a percentage
   */
  static async swipeRight(percentage = 1): Promise<void> {
    await this.swipeOnPercentage(
      await this._calculateXY(SWIPE_DIRECTION.right.start, percentage),
      await this._calculateXY(SWIPE_DIRECTION.right.end, percentage),
    );
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
   * percentages of the screen.
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 }
   *   const to = { x: 25, y:50 }
   * </pre>
   */
  static async swipeOnPercentage(
    from: ScreenCoordinates,
    to: ScreenCoordinates,
  ): Promise<void> {
    SCREEN_SIZE = SCREEN_SIZE || (await driver.getWindowRect());
    const pressOptions = await this._getDeviceScreenCoordinates(
      SCREEN_SIZE,
      from,
    );
    const moveToScreenCoordinates = await this._getDeviceScreenCoordinates(
      SCREEN_SIZE,
      to,
    );
    await this.swipe(pressOptions, moveToScreenCoordinates);
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
   *
   * @example
   * <pre>
   *   // This is a swipe to the left
   *   const from = { x: 50, y:50 }
   *   const to = { x: 25, y:50 }
   * </pre>
   */
  static async swipe(
    from: ScreenCoordinates,
    to: ScreenCoordinates,
  ): Promise<void> {
    await driver.touchPerform([
      {
        action: 'press',
        options: from,
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'moveTo',
        options: to,
      },
      {
        action: 'release',
      },
    ]);
    await driver.pause(1000);
  }

  /**
   * Get the screen coordinates based on a device his screensize
   *
   * @param {number} screenSize the size of the screen
   * @param {object} coordinates like { x: 50, y: 50 }
   *
   * @return {{x: number, y: number}}
   *
   * @private
   */
  static async _getDeviceScreenCoordinates(
    screenSize: ScreenSize,
    coordinates: ScreenCoordinates,
  ): Promise<ScreenCoordinates> {
    return {
      x: Math.round(screenSize.width * (coordinates.x / 100)),
      y: Math.round(screenSize.height * (coordinates.y / 100)),
    };
  }

  /**
   * Calculate the x y coordinates based on a percentage
   */
  static async _calculateXY(
    { x, y }: ScreenCoordinates,
    percentage: number,
  ): Promise<ScreenCoordinates> {
    return {
      x: x * percentage,
      y: y * percentage,
    };
  }
}

export default Gestures;
