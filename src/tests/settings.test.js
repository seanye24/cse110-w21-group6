import '../scripts/settings';

test('break length values are being initialized correctly', () => {
  initializeBreakLengths();
  expect(getShortBreakLength()).toBe(5);
  expect(getLongBreakLength()).toBe(30);
});
