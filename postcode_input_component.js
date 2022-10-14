class CityFoundEvent extends CustomEvent {

  constructor(city) {
    super('cityfound', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {city: city}
    })
  }
}


class PostcodeInputComponent extends HTMLElement {

  constructor(apiKey) {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this.#template());
    this.input = this.shadowRoot.querySelector('input');
    this.apiKey = apiKey
   
  }

  async connectedCallback() {
    this.input.addEventListener('keyup', this.#fetchCity.bind(this)) 
  }

  async #fetchCity(e) {
    e.stopPropagation();
    const postCode = e.target.value.replace(' ', '');
    if (postCode.length == 5) {
      let res;
      try {
        res = await fetch(`https://api.papapi.se/lite/?query=${postCode}&format=json&apikey=${this.apiKey}`);
      }
      catch (error) {
        console.log(error);
      }
      if (res.ok) {
        let data;
        try {
          data = await res.json();
        } catch (error) {
          console.log(error);
        }
        const city = data.results[0].city
        if (city) {
          this.dispatchEvent(new CityFoundEvent(city));
        }
      }
    }

  }


  #template() {
    const template = document.createElement('template')
    template.innerHTML =
    `
    <input type="text" name="name" placeholder="Postkod">
    `;
    return template.content.cloneNode(true);
  }

}





window.customElements.define('postcode-input', PostcodeInputComponent);