/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './shared-styles.js';

class HotelRatings extends PolymerElement {


  static get template() {
    return html`
      <iron-ajax
        auto
        id="wego_API"
        url="http://137.116.129.201/api/hotels"
        params='{"part":"snippet", "q":"polymer"}'
        method="get"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
      </iron-ajax>

      <style include="shared-styles">

        :host {
          display: block;

          padding: 10px;
        }
        
      </style>

      <div> Hotel Ratings list: </div>

      <template is="dom-repeat" items="{{urlHotel}}">

        <div><br/># [[index]]</div>
        
        <div>Hotel name: <span>[[item.name]]</span></div>

        <div>Hotel stars: <span>[[item.stars]]</span></div>

        <div>Hotel district: <span>[[item.district]]</span></div>

        <div>Hotel distanceToCityCentre: <span>[[item.distanceToCityCentre]]</span></div>

        <div>Hotel Review Score: <span>[[item.review.score]]</span></div>

        // <template is="dom-if" if="[[item.review.score < 50 ]]">
        //   this score is below 50
        // </template>

        <div>Hotel Review Count: <span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>

        <div>Hotel Costs: <span> S$ </span> <span> [[item.amount]] </span></div>

        <img src="[[item.image]]">



      </template>

    `;
  }
  static get properties() {
    return {
      urlHotel: {
        type: Array,
      },
      // prop1: {
      //   type: Array,
      //   value: 'hotel-ratings',
      // },
      // itsHidden: {
      //   value: false,
      //   Type: Boolean
      // }
    };
  }
  handleResponse(event, res) {

    this.urlHotel = res.response;

    console.log(this.urlHotel, "res");
    console.log(this.urlHotel.length, "res length");
  }
  nextHotelData() {
    // new call to iron-ajax for hotel data
    this.$.wego_API.generateRequest();
    console.log("ajax call");
  }

}

window.customElements.define('hotel-ratings', HotelRatings);
