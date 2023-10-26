export const PIN_CODE = (isAndroid: boolean) => ({
  '0': isAndroid ? '7' : '0',
  '1': isAndroid ? '8' : '1',
  '2': isAndroid ? '9' : '2',
  '3': isAndroid ? '10' : '3',
  '4': isAndroid ? '11' : '4',
  '5': isAndroid ? '12' : '5',
  '6': isAndroid ? '13' : '6',
  '7': isAndroid ? '14' : '7',
  '8': isAndroid ? '15' : '8',
  '9': isAndroid ? '16' : '9',
});
