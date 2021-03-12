import {
  initializePopup,
  openPopup,
  closePopup,
} from '../scripts/confirmationPopup';
import { createElement } from '../utils/helpers';

describe('testing popup functionality', () => {
  let confirmationOverlay;
  let confirmationPopup;
  let noButton;
  let yesButton;

  beforeEach(() => {
    const popupElement = createElement('div', {
      innerHTML: `
            <div id="confirmation-overlay" class="overlay">
                <div id="confirmation-popup" class="popup">
                    <p class="confirmation-question">
                        Are you sure you want to end the session?
                    </p>
                    <div class="confirmation-button-container">
                        <button class="confirmation-button confirmation-no-button">
                            Cancel
                        </button>
                        <button class="confirmation-button confirmation-yes-button">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
            `,
    });

    confirmationOverlay = popupElement.querySelector('#confirmation-overlay');
    confirmationPopup = popupElement.querySelector('#confirmation-popup');
    noButton = popupElement.querySelector('.confirmation-no-button');
    yesButton = popupElement.querySelector('.confirmation-yes-button');
  });

  test('popup opens correctly', () => {
    initializePopup(confirmationOverlay);
    openPopup();
    expect(confirmationOverlay.classList.contains('active')).toBe(true);
  });

  test('popup closes correctly', () => {
    initializePopup(confirmationOverlay);
    closePopup();
    expect(confirmationOverlay.classList.contains('active')).toBe(false);
  });

  test('button click closes popop', () => {
    const mockCallback = jest.fn();

    initializePopup(confirmationOverlay, mockCallback);
    openPopup();
    expect(confirmationOverlay.classList.contains('active')).toBe(true);
    yesButton.click();
    expect(confirmationOverlay.classList.contains('active')).toBe(false);
    expect(mockCallback).toHaveBeenCalled();

    openPopup();
    expect(confirmationOverlay.classList.contains('active')).toBe(true);
    noButton.click();
    expect(confirmationOverlay.classList.contains('active')).toBe(false);
    expect(mockCallback).toHaveBeenCalled();
  });
});
