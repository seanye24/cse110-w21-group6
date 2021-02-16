/**
 * Creates an HTMLElement and set its attributes
 * Created to reduce boilerplate from element creation
 * @param {{string: string}} props - obj containing element name and attribute
 * @return element - new HTMLElement created
 */
const createElement = ({ element: elementType, ...attributes }) => {
  const element = document.createElement(elementType); // create element

  // set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'innerText' || key === 'innerHTML') {
      // some props like innerHTML are not attributes and should be assigned directly
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  return element;
};

export { createElement };
