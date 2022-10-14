class AddressFormComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this.#template());
    this.form = this.shadowRoot.querySelector('form');
    this.postCode = this.shadowRoot.querySelector('form input[name="postcode"]')
    this.city = this.shadowRoot.querySelector('city-element');
  }

  connectedCallback() {
    const tmp = new PostcodeInputComponent('c763243c9495cbf94a81e92bd650c202e4ac17e9');
    this.postCode.replaceWith(tmp);
    this.form.addEventListener('cityfound', this.#showCity.bind(this))
  }
  
  #showCity(e) {
    this.city.setAttribute('city', e.detail.city)
  }

  #template() {
    const template = document.createElement('template')
    template.innerHTML =
    `
    <form>
      <input type="text" name="name" placeholder="Namn">
      <br>
      <input type="text" name="address" placeholder="Adress">
      <br>
      <input type="text" name="postcode" placeholder="Postkod">
      <city-element>
    </form>
    `;
    return template.content.cloneNode(true);
  }

}





window.customElements.define('address-form', AddressFormComponent);