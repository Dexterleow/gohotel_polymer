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

        <template is="dom-if" if="[[_formatScoreImage_Excellent(item.review.score)]]">
           this score is between 86 to 100. excellent hotel. HOrrayyyy it is working
        </template>

        <template is="dom-if" if="[[_formatScoreImage_VeryGood(item.review.score)]]">
          this score is between 80 to 85. very good hotel. HOrrayyyy it is working
        </template>

        <template is="dom-if" if="[[_formatScoreImage_Good(item.review.score)]]">
          this score is between 75 to 79. good hotel. HOrrayyyy it is working
        </template>

        <template is="dom-if" if="[[_formatScoreImage_Fair(item.review.score)]]">
          this score is between 68 to 74. fair hotel. HOrrayyyy it is working
        </template>

        <template is="dom-if" if="[[_formatScoreImage_Poor(item.review.score)]]">
          this score is between 0 to 67. fair hotel. HOrrayyyy it is working
        </template>

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

  _formatScoreImage_Excellent(score) {

    console.log(score, "is score working - excellent hotel");
    if (score >= 86 && score <= 100 ) {
      return true;
    } 
  }

  _formatScoreImage_VeryGood(score) {

    console.log(score, "is score working - very good hotel");
    if (score >= 80 && score <= 85 ) {
      return true;
    } 
  }

  _formatScoreImage_Good(score) {

    console.log(score, "is score working - very good hotel");
    if (score >= 75 && score <= 79 ) {
      return true;
    } 
  }

  _formatScoreImage_Fair(score) {

    console.log(score, "is score working - fair hotel");
    if (score >= 68 && score <= 74 ) {
      return true;
    } 
  }
  
  _formatScoreImage_Poor(score) {

    console.log(score, "is score working - poor hotel");
    if (score >= 0 && score <= 67 ) {
      return true;
    } 
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
