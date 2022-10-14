class CityComponent extends HTMLElement {

  static get observedAttributes() { return ['city']; } 

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this.#template());
    this.city = this.shadowRoot.querySelector('input');   
  }

  attributeChangedCallback(_attribute, _oldValue, newValue) {
    this.city.value = newValue;
  }

  #template() {
    const template = document.createElement('template')
    template.innerHTML =
    `
    <input type="text" name="city" disabled placeholder="Postort">
    `;
    return template.content.cloneNode(true);
  }

}


window.customElements.define('city-element', CityComponent);