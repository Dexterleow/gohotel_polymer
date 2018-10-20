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

      <button type="button" on-click="nextHotelData">Load Hotel Data</button>
      <br> <br>

      <style include="shared-styles">

        :host {
          display: block;

          padding: 10px;
        }
        
      </style>

      <div class="card">

        <div class="circle">1</div>

        <h1>Hotel Ratings</h1>

        <div id="hotelResponseName"></div>
        <div id="hotelResponseStars"></div>
        <div id="hotelResponseDistrict"></div>
        <div id="hotelResponseDistanceToCityCentre"></div>
        <div id="hotelResponseReviewScore"></div>
        <div id="hotelResponseReviewCount"></div>
        <div id="hotelResponseAmount"></div>

      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'hotel-ratings',
      },
      imgUrl: {
        type: String,
        reflectToAttribute: true
      }
    };
  }
  handleResponse(event, res) {

    var response = res.response;

    this.hotelResponseName = response[0].name;
    this.hotelResponseStars = response[0].stars;
    this.hotelResponseDistrict = response[0].district;
    this.hotelResponseDistanceToCityCentre = response[0].distanceToCityCentre;
    this.hotelResponseReviewScore = response[0].review.score;
    this.hotelResponseReviewCount = response[0].review.reviewsCount;
    this.hotelResponseAmount = response[0].amount;

    this.$.hotelResponseName.innerHTML = `${this.hotelResponseName}`;
    this.$.hotelResponseStars.innerHTML = `${this.hotelResponseStars}`;
    this.$.hotelResponseDistrict.innerHTML = `${this.hotelResponseDistrict}`;
    this.$.hotelResponseDistanceToCityCentre.innerHTML = `${this.hotelResponseDistanceToCityCentre}`;
    this.$.hotelResponseReviewScore.innerHTML = `${this.hotelResponseReviewScore}`;
    this.$.hotelResponseReviewCount.innerHTML = `${this.hotelResponseReviewCount}`;
    this.$.hotelResponseAmount.innerHTML = `${this.hotelResponseAmount}`;


    console.log(response, "res");
  }
  nextHotelData() {
    // new call to iron-ajax for hotel data
    console.log("ajax call")
    this.$.wego_API.generateRequest();
  }
}

window.customElements.define('hotel-ratings', HotelRatings);
