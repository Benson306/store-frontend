import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './shop-button.js';
import './shop-common-styles.js';
import './shop-form-styles.js';
import './shop-input.js';
import './shop-select.js';
import './shop-checkbox.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ShopCheckout extends PolymerElement {
  static get template() {
    return html`
    <style include="shop-common-styles shop-button shop-form-styles shop-input shop-select shop-checkbox">

      .main-frame {
        transition: opacity 0.5s;
      }

      :host([waiting]) .main-frame {
        opacity: 0.1;
      }

      shop-input, shop-select {
        font-size: 16px;
      }

      shop-select {
        margin-bottom: 20px;
      }

      paper-spinner-lite {
        position: fixed;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
      }

      .billing-address-picker {
        margin: 28px 0;
        height: 20px;
        @apply --layout-horizontal;
      }

      .billing-address-picker > label {
        margin-left: 12px;
      }

      .grid {
        margin-top: 40px;
        @apply --layout-horizontal;
      }

      .grid > section {
        @apply --layout-flex;
      }

      .grid > section:not(:first-child) {
        margin-left: 80px;
      }

      .row {
        @apply --layout-horizontal;
        @apply --layout-end;
      }

      .column {
        @apply --layout-vertical;
      }

      .row > .flex,
      .input-row > * {
        @apply --layout-flex;
      }

      .input-row > *:not(:first-child) {
        margin-left: 8px;
      }

      .shop-select-label {
        line-height: 20px;
      }

      .order-summary-row {
        line-height: 24px;
      }

      .total-row {
        font-weight: 500;
        margin: 30px 0;
      }

      @media (max-width: 767px) {

        .grid {
          display: block;
          margin-top: 0;
        }

        .grid > section:not(:first-child) {
          margin-left: 0;
        }

      }

    </style>

    <div class="main-frame">
      <iron-pages id="pages" selected="[[state]]" attr-for-selected="state">
        <div state="init">
          <iron-form id="checkoutForm"
              on-iron-form-response="_didReceiveResponse"
              on-iron-form-presubmit="_willSendRequest">
            <form method="post" action="data/sample_success_response.json" enctype="application/x-www-form-urlencoded">

              <div class="subsection" visible$="[[!_hasItems]]">
                <p class="empty-cart">Your <iron-icon icon="shopping-cart"></iron-icon> is empty.</p>
              </div>

              <header class="subsection" visible$="[[_hasItems]]">
                <h1>Checkout</h1>
                <span>Shop is a demo app - form data will not be sent</span>
              </header>

              <div class="subsection grid" visible$="[[_hasItems]]">
                <section>
                  <h2 id="accountInfoHeading">Account Information</h2>
                  <div class="row input-row">
                    <shop-input>
                      <input type="email" id="accountEmail" name="accountEmail"
                          placeholder="Email" autofocus required
                          aria-labelledby="accountEmailLabel accountInfoHeading">
                      <shop-md-decorator error-message="Invalid Email" aria-hidden="true">
                        <label id="accountEmailLabel">Email</label>
                        <shop-underline></shop-underline>
                      </shop-md-decorator>
                    </shop-input>
                  </div>
                  <div class="row input-row">
                    <shop-input>
                      <input type="tel" id="accountPhone" name="accountPhone" pattern="\\d{10,}"
                          placeholder="Phone Number" required
                          aria-labelledby="accountPhoneLabel accountInfoHeading">
                      <shop-md-decorator error-message="Invalid Phone Number" aria-hidden="true">
                        <label id="accountPhoneLabel">Phone Number</label>
                        <shop-underline></shop-underline>
                      </shop-md-decorator>
                    </shop-input>
                  </div>
                  
                </section>

                <section> 
                  <h2>Select Delivery Location</h2>  
                  <div class="column">
                      <shop-select>
                        <select id="shipCountry" name="shipCountry" required
                            aria-labelledby="shipCountryLabel shipAddressHeading">
                            <option value="Nairobi Area">Nairobi Area - Ksh250.00</option>
                            <option value="Nairobi">Nairobi - Ksh260.00</option>
                            <option value="Athi River">Athi River - Ksh280.00</option>
                            <option value="Gilgil">Gilgil - Ksh280.00</option>
                            <option value="Juja">Juja - Ksh280.00</option>
                            <option value="Kangundo">Kangundo - Ksh280.00</option>
                            <option value="Kiambu">Kiambu - Ksh280.00</option>
                            <option value="Kikuyu">Kikuyu - Ksh280.00</option>
                            <option value="Kitengela">Kitengela - Ksh280.00</option>
                            <option value="Machakos">Machakos - Ksh280.00</option>
                            <option value="Ongata Rongai">Ongata Rongai - Ksh280.00</option>
                            <option value="Ruiru">Ruiru - Ksh280.00</option>
                            <option value="Thika">Thika - Ksh280.00</option>
                            <option value="Gatundu">Gatundu - Ksh300.00</option>
                            <option value="Githunguri">Githunguri - Ksh300.00</option>
                            <option value="Karatina">Karatina - Ksh300.00</option>
                            <option value="Kutus">Kutus - Ksh300.00</option>
                            <option value="Limuru">Limuru - Ksh300.00</option>
                            <option value="Muranga">Muranga - Ksh300.00</option>
                            <option value="Naivasha">Naivasha - Ksh300.00</option>
                            <option value="Nakuru">Nakuru - Ksh300.00</option>
                            <option value="Ngong">Ngong - Ksh300.00</option>
                            <option value="Nyeri">Nyeri - Ksh300.00</option>
                            <option value="Othaya">Othaya - Ksh300.00</option>
                            <option value="Embu">Embu - Ksh320.00</option>
                            <option value="Kerugoya">Kerugoya - Ksh320.00</option>
                            <option value="Molo">Molo - Ksh320.00</option>
                            <option value="Tala">Tala - Ksh320.00</option>
                            <option value="Chuka">Chuka - Ksh330.00</option>
                            <option value="Kagio">Kagio - Ksh330.00</option>
                            <option value="Kangema">Kangema - Ksh330.00</option>
                            <option value="Kiganjo">Kiganjo - Ksh330.00</option>
                            <option value="Kijabe">Kijabe - Ksh330.00</option>
                            <option value="Kilgoris">Kilgoris - Ksh330.00</option>
                            <option value="Matuu">Matuu - Ksh330.00</option>
                            <option value="Mwea">Mwea - Ksh330.00</option>
                            <option value="Narok">Narok - Ksh330.00</option>
                            <option value="Nyahururu">Nyahururu - Ksh330.00</option>
                            <option value="Sagana">Sagana - Ksh330.00</option>
                            <option value="Eldoret">Eldoret - Ksh340.00</option>
                            <option value="Isinya">Isinya - Ksh340.00</option>
                            <option value="Kitui">Kitui - Ksh340.00</option>
                            <option value="Makuyu">Makuyu - Ksh340.00</option>
                            <option value="Sultan Hamud">Sultan Hamud - Ksh340.00</option>
                            <option value="Emali">Emali - Ksh350.00</option>
                            <option value="Engineer">Engineer - Ksh350.00</option>
                            <option value="Kajiado">Kajiado - Ksh350.00</option>
                            <option value="Kericho">Kericho - Ksh350.00</option>
                            <option value="Kibwezi">Kibwezi - Ksh350.00</option>
                            <option value="Makindu">Makindu - Ksh350.00</option>
                            <option value="Makutano">Makutano - Ksh350.00</option>
                            <option value="Njoro">Njoro - Ksh350.00</option>
                            <option value="Murarandia">Murarandia - Ksh370.00</option>
                            <option value="Kisii">Kisii - Ksh380.00</option>
                            <option value="Kisumu">Kisumu - Ksh380.00</option>
                            <option value="Meru">Meru - Ksh380.00</option>
                            <option value="Nanyuki">Nanyuki - Ksh380.00</option>
                            <option value="Sotik">Sotik - Ksh390.00</option>
                            <option value="Wote">Wote - Ksh390.00</option>
                            <option value="Bomet">Bomet - Ksh400.00</option>
                            <option value="Bungoma">Bungoma - Ksh400.00</option>
                            <option value="Chogoria">Chogoria - Ksh400.00</option>
                            <option value="Eldama Ravine">Eldama Ravine - Ksh400.00</option>
                            <option value="Kakamega">Kakamega - Ksh400.00</option>
                            <option value="Kangari">Kangari - Ksh400.00</option>
                            <option value="Litein">Litein - Ksh400.00</option>
                            <option value="Mwingi">Mwingi - Ksh400.00</option>
                            <option value="Naromoru">Naromoru - Ksh400.00</option>
                            <option value="Nkubu">Nkubu - Ksh400.00</option>
                            <option value="Nyamira">Nyamira - Ksh400.00</option>
                            <option value="Runyenjes">Runyenjes - Ksh400.00</option>
                            <option value="Sabasaba">Sabasaba - Ksh400.00</option>
                            <option value="Awendo">Awendo - Ksh420.00</option>
                            <option value="Kitale">Kitale - Ksh420.00</option>
                            <option value="Maua">Maua - Ksh420.00</option>
                            <option value="Mbale">Mbale - Ksh420.00</option>
                            <option value="Nandi Hills">Nandi Hills - Ksh420.00</option>
                            <option value="Webuye">Webuye - Ksh420.00</option>
                            <option value="Timau">Timau - Ksh430.00</option>
                            <option value="Bondo">Bondo - Ksh450.00</option>
                            <option value="Burnt Forest">Burnt Forest - Ksh450.00</option>
                            <option value="Isiolo">Isiolo - Ksh450.00</option>
                            <option value="Kabarnet">Kabarnet - Ksh450.00</option>
                            <option value="Kapsabet">Kapsabet - Ksh450.00</option>
                            <option value="Maseno">Maseno - Ksh450.00</option>
                            <option value="Migori">Migori - Ksh450.00</option>
                            <option value="Mtito Andei">Mtito Andei - Ksh450.00</option>
                            <option value="Mumias">Mumias - Ksh450.00</option>
                            <option value="Olkalau">Olkalau - Ksh450.00</option>
                            <option value="Oloitoktok">Oloitoktok - Ksh450.00</option>
                            <option value="Londiani">Londiani - Ksh460.00</option>
                            <option value="Voi">Voi - Ksh460.00</option>
                            <option value="Keroka">Keroka - Ksh480.00</option>
                            <option value="Mombasa">Mombasa - Ksh480.00</option>
                            <option value="Ahero">Ahero - Ksh500.00</option>
                            <option value="Busia">Busia - Ksh500.00</option>
                            <option value="Homabay">Homabay - Ksh500.00</option>
                            <option value="Iten">Iten - Ksh500.00</option>
                            <option value="Kilifi">Kilifi - Ksh500.00</option>
                            <option value="Luanda">Luanda - Ksh500.00</option>
                            <option value="Malaba">Malaba - Ksh500.00</option>
                            <option value="Mariakani">Mariakani - Ksh500.00</option>
                            <option value="Moi's Bridge">Moi's Bridge - Ksh500.00</option>
                            <option value="Mtwapa">Mtwapa - Ksh500.00</option>
                            <option value="Muhoroni">Muhoroni - Ksh500.00</option>
                            <option value="Ogembo">Ogembo - Ksh500.00</option>
                            <option value="Oyugis">Oyugis - Ksh500.00</option>
                            <option value="Rongo">Rongo - Ksh500.00</option>
                            <option value="Siaya">Siaya - Ksh500.00</option>
                            <option value="Ugunja">Ugunja - Ksh500.00</option>
                            <option value="Kimilili">Kimilili - Ksh540.00</option>
                            <option value="Sabatia">Sabatia - Ksh540.00</option>
                            <option value="Garissa">Garissa - Ksh550.00</option>
                            <option value="Kapenguria">Kapenguria - Ksh550.00</option>
                            <option value="Lugari">Lugari - Ksh550.00</option>
                            <option value="Mukurweini">Mukurweini - Ksh550.00</option>
                            <option value="Nambale">Nambale - Ksh550.00</option>
                            <option value="Mwatate">Mwatate - Ksh580.00</option>
                            <option value="Rachuonyo">Rachuonyo - Ksh580.00</option>
                            <option value="Diani">Diani - Ksh600.00</option>
                            <option value="Masii">Masii - Ksh600.00</option>
                            <option value="Mwala">Mwala - Ksh600.00</option>
                            <option value="Malindi">Malindi - Ksh620.00</option>
                            <option value="Taveta">Taveta - Ksh620.00</option>
                            <option value="Baraton">Baraton - Ksh650.0</option>
                            <option value="Kehancha">Kehancha - Ksh650.00</option>
                            <option value="Marsabit">Marsabit - Ksh650.00</option>
                            <option value="Chwele">Chwele - Ksh680.00</option>
                            <option value="Mbita">Mbita - Ksh700.00</option>
                            <option value="Nzoia">Nzoia - Ksh700.00</option>
                            <option value="Turbo">Turbo - Ksh700.00</option>
                            <option value="Isebania">Isebania - Ksh750.00</option>
                            <option value="Kendubay">Kendubay - Ksh750.00</option>
                            <option value="Lamu">Lamu - Ksh1,400.00</option>
                            <option value="Lodwar">Lodwar - Ksh1,500.00</option>
                            <option value="Maralal">Maralal - Ksh1,600.00</option>
                            <option value="Lokichogio">Lokichogio - Ksh1,650.00</option>
                        </select>
                        <shop-md-decorator aria-hidden="true">
                          <shop-underline></shop-underline>
                        </shop-md-decorator>
                      </shop-select>
                    </div>   
                  <h2>Order Summary</h2>
                  <dom-repeat items="[[cart]]" as="entry">
                    <template>
                      <div class="row order-summary-row">
                        <div class="flex">[[entry.item.title]]</div>
                        <div>[[_getEntryTotal(entry)]]</div>
                      </div>
                    </template>
                  </dom-repeat>
                  <div class="row total-row">
                    <div class="flex">Total</div>
                    <div>[[_formatPrice(total)]]</div>
                  </div>
                  <shop-button responsive id="submitBox">
                    <input type="button" on-click="_submit" value="Pay">
                  </shop-button>
                </section>
              </div>
            </form>
          </iron-form>
        </div>

        <!-- Success message UI -->
        <header state="success">
          <h1>Thank you</h1>
          <p>[[response.successMessage]]</p>
          <shop-button responsive>
            <a href="/">Finish</a>
          </shop-button>
        </header>

        <!-- Error message UI -->
        <header state="error">
          <h1>We couldn&acute;t process your order</h1>
          <p id="errorMessage">[[response.errorMessage]]</p>
          <shop-button responsive>
            <a href="/checkout">Try again</a>
          </shop-button>
        </header>

      </iron-pages>

    </div>

    <!-- Handles the routing for the success and error subroutes -->
    <app-route
        active="{{routeActive}}"
        data="{{routeData}}"
        route="[[route]]"
        pattern="/:state">
     </app-route>

    <!-- Show spinner when waiting for the server to repond -->
    <paper-spinner-lite active="[[waiting]]"></paper-spinner-lite>
    `;
  }
  static get is() { return 'shop-checkout'; }

  static get properties() { return {

    /**
     * The route for the state. e.g. `success` and `error` are mounted in the
     * `checkout/` route.
     */
    route: {
      type: Object,
      notify: true
    },

    /**
     * The total price of the contents in the user's cart.
     */
    total: Number,

    /**
     * The state of the form. Valid values are:
     * `init`, `success` and `error`.
     */
    state: {
      type: String,
      value: 'init'
    },

    /**
     * An array containing the items in the cart.
     */
    cart: Array,

    /**
     * The server's response.
     */
    response: Object,

    /**
     * If true, the user must enter a billing address.
     */
    hasBillingAddress: {
      type: Boolean,
      value: false
    },

    /**
     * If true, shop-checkout is currently visible on the screen.
     */
    visible: {
      type: Boolean,
      observer: '_visibleChanged'
    },

    /**
     * True when waiting for the server to repond.
     */
    waiting: {
      type: Boolean,
      readOnly: true,
      reflectToAttribute: true
    },

    /**
     * True when waiting for the server to repond.
     */
    _hasItems: {
      type: Boolean,
      computed: '_computeHasItem(cart.length)'
    }

  }}

  static get observers() { return [
    '_updateState(routeActive, routeData)'
  ]}

  _submit(e) {
    if (this._validateForm()) {
      // To send the form data to the server:
      // 2) Remove the code below.
      // 3) Uncomment `this.$.checkoutForm.submit()`.

      // this.$.checkoutForm.dispatchEvent(new CustomEvent('iron-form-presubmit', {
      //   composed: true}));

      // this._submitFormDebouncer = Debouncer.debounce(this._submitFormDebouncer,
      //   timeOut.after(1000), () => {
      //     this.$.checkoutForm.dispatchEvent(new CustomEvent('iron-form-response', {
      //       composed: true, detail: {
      //         response: {
      //           success: 1,
      //           successMessage: 'Demo checkout process complete.'
      //         }
      //       }}));
      //   });
      // this.$.checkoutForm.action = 'http://localhost:3000/checkout';

      this.$.checkoutForm.submit();
    }
  }

  /**
   * Sets the valid state and updates the location.
   */
  _pushState(state) {
    this._validState = state;
    this.set('route.path', state);
  }

  /**
   * Checks that the `:state` subroute is correct. That is, the state has been pushed
   * after receiving response from the server. e.g. Users can only go to `/checkout/success`
   * if the server responsed with a success message.
   */
  _updateState(active, routeData) {
    if (active && routeData) {
      let state = routeData.state;
      if (this._validState === state) {
        this.state = state;
        this._validState = '';
        return;
      }
    }
    this.state = 'init';
  }

  /**
   * Sets the initial state.
   */
  _reset() {
    let form = this.$.checkoutForm;

    this._setWaiting(false);
    form.reset && form.reset();

    let nativeForm = form._form;
    if (!nativeForm) {
      return;
    }

    // Remove the `aria-invalid` attribute from the form inputs.
    for (let el, i = 0; el = nativeForm.elements[i], i < nativeForm.elements.length; i++) {
      el.removeAttribute('aria-invalid');
    }
  }

  /**
   * Validates the form's inputs and adds the `aria-invalid` attribute to the inputs
   * that don't match the pattern specified in the markup.
   */
  _validateForm() {
    let form = this.$.checkoutForm;
    let firstInvalid = false;
    let nativeForm = form._form;

    for (let el, i = 0; el = nativeForm.elements[i], i < nativeForm.elements.length; i++) {
      if (el.checkValidity()) {
        el.removeAttribute('aria-invalid');
      } else {
        if (!firstInvalid) {
          // announce error message
          if (el.nextElementSibling) {
            this.dispatchEvent(new CustomEvent('announce', {bubbles: true, composed: true,
              detail: el.nextElementSibling.getAttribute('error-message')}));
          }
          if (el.scrollIntoViewIfNeeded) {
            // safari, chrome
            el.scrollIntoViewIfNeeded();
          } else {
            // firefox, edge, ie
            el.scrollIntoView(false);
          }
          el.focus();
          firstInvalid = true;
        }
        el.setAttribute('aria-invalid', 'true');
      }
    }
    return !firstInvalid;
  }

  /**
   * Adds the cart data to the payload that will be sent to the server
   * and updates the UI to reflect the waiting state.
   */
  _willSendRequest(e) {
    let form = e.target;
    let body = form.request && form.request.body;

    this._setWaiting(true);

    if (!body) {
      return;
    }
    // Populate the request body where `cartItemsId[i]` is the ID and `cartItemsQuantity[i]`
    // is the quantity for some item `i`.
    body.cartItemsId = [];
    body.cartItemsQuantity = [];

    this.cart.forEach((cartItem) => {
      body.cartItemsId.push(cartItem.item.name);
      body.cartItemsQuantity.push(cartItem.quantity);
    });
  }

  /**
   * Handles the response from the server by checking the response status
   * and transitioning to the success or error UI.
   */
  _didReceiveResponse(e) {
    let response = e.detail.response;

    this.response = response;
    this._setWaiting(true);

    if (response.success) {
      this._pushState('success');
      this._reset();
      this.dispatchEvent(new CustomEvent('clear-cart', {bubbles: true, composed: true}));
    } else {
      this._pushState('error');
    }
  }

  _toggleBillingAddress(e) {
    this.hasBillingAddress = e.target.checked;

    if (this.hasBillingAddress) {
      this.$.billAddress.focus();
    }
  }

  _computeHasItem(cartLength) {
    return cartLength > 0;
  }

  _formatPrice(total) {
    let sum = total + 200;
    return isNaN(sum) ? '' : 'KES ' + sum.toFixed(2);
  }

  _getEntryTotal(entry) {
    return this._formatPrice(entry.quantity * entry.item.price);
  }

  _visibleChanged(visible) {
    if (!visible) {
      return;
    }
    // Reset the UI states
    this._reset();
    // Notify the page's title
    this.dispatchEvent(new CustomEvent('change-section', {
      bubbles: true, composed: true, detail: { title: 'Checkout' }}));
  }

}

customElements.define(ShopCheckout.is, ShopCheckout);
