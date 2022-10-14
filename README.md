# Kommunikation mellan komponenter

Ett exempel på hur man kan använda Custom Elements och Custom Events och attributeChangedCallback för att skicka data mellan komponenter

## Skicka data FRÅN ett element

Använd Custom events och för att skick data från ett Custom Element.
Lagra relevant data i eventets `detail`.

Se `postcode_input_component.js`.

Genom att använda custom events behöver du inte använda `composedPath`. `composedPath` är dåligt eftersom du då är beroende av objektets (Custom Element) interna struktur. Det bryter mot inkapsling, och om objektets interna struktur förändras slutar din kod fungera.

Eventlisternern lyssnar sen efter ditt custom event. Se `address_form_component.js`

## Skicka data TILL ett element 

Använd `setAttribute` (se `address_form_component.js`) och `attributeChangedCallback` (se `city_element_component.js`). 
Kom ihåg att sätta `observedAttributes`.