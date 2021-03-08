/**
 * @file settings web component
 */

 /**
 * Custom web component representing the settings popup
 * @extends HTMLElement
 * @param {number} shortBreakLength - short break time
 * @param {number} longBreakLength - long break time
 */
class EndSession extends HTMLElement {
    
    constructor() {
      super();
  
      this.styleElement = createElement('style', {
        innerText: `
            .popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                border: 1px solid black;
                border-radius: 10px;
                z-index: 10;
                background-color: white;
                width: 700px;
                max-width: 80%;
            }
            
            .popup.active {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .popup button, .content button {
                background-color: #48cae4;
                border: none;
                border-radius: 20px;
                color: white;
                letter-spacing: 10px;
                font: 1.1rem 'Duru Sans', sans-serif;
                text-align: center;
                text-decoration: none;
                margin-top: 0;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 1.5em;
                display: block;
                width: 75%;
                cursor: pointer;
            }
            
            .popup-body p {
                padding: 10px 15px;
                text-align: center;
                font: 0.8rem 'Duru Sans', sans-serif;
                color: #000000;
                line-height: 14px;
            /* letter-spacing: 17px;*/
                
            }
            
            #overlay {
                position: fixed;
                opacity: 0;
                transition: 200ms ease-in-out;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                pointer-events: none;
            }
            
            #overlay.active {
                opacity: 1;
                pointer-events: all;
            }
            
            .settings-hr {
                margin-top: -1em;
                margin-bottom: 2em;
            }
            
            .content {
                font: 1.1rem 'Duru Sans', sans-serif;
                padding: 20px;
            }
          `,
      });
  
      // Open Shadow DOM
      this.shadow = this.attachShadow({ mode: 'open' });
  
      // Create end session popup elements
      this.endSessionPopup = createElement('div', {
        className: 'popup',
        id: 'end-session',
      });
      this.endSessionBody = createElement('div', {
        className: 'popup-body',
      });
      this.endSessionText = createElement('p', {
        innerText: 'Do you want to end session?',
      });
      this.endSessionNoButton = createElement('button', {
        innerText: 'No',
        className: 'save-button',
      });
      this.endSessionYesButton = createElement('button', {
        innerText: 'Yes',
      });

      // Create summary popup elements
      this.summaryPopup = createElement('div', {
        className: 'popup',
        id: 'summary',
      });
      this.summaryBody = createElement('div', {
        className: 'content',
      });
      this.summaryTitle = createElement('h1', {
        className: 'summary-hr',
      });
      this.summaryLine = createElement('hr', {
        innerText: 'SUMMARY',
        className: 'summary-title',
      });
      this.summaryActualText = createElement('p', {
        innerText: 'Actual:',
      });
      this.summaryEstimatedText = createElement('p', {
        innerText: 'Estimated:',
      });
      this.summaryCloseButton = createElement('button', {
        innerText: 'CLOSE',
      });
      
      // Create overlay element
      this.overlayEl = createElement('div', {
        id: 'overlay',
      });
  
      // Form end session popup element
      this.endSessionBody.append(
        this.endSessionText,
        this.endSessionNoButton,
        this.endSessionYesButton,
      );
      this.endSessionPopup.append(this.endSessionBody);
  
      // Form summary popup element
      this.summaryBody.append(
        this.summaryTitle,
        this.summaryLine,
        this.summaryActualText,
        this.summaryEstimatedText,
        this.summaryCloseButton,
      );
      this.summaryPopup.append(this.summaryBody);
  
      this.shadow.append(this.styleElement, this.endSessionPopup, this.summaryPopup, this.overlayEl);
    }
  
  }
  
  export default EndSession;