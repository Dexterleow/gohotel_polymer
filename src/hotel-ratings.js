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

        #reviewScore_Container{
          // height:283px;
          width:81px;
          height: 94px;
          overflow:hidden;
          position: relative;
        }
      
        #reviewScore_Container #reviewScore_Good_VeryGood_Excellent_Img {
          position: absolute;
          top: 2px;
        }

        #reviewScore_Container #reviewScore_Fair_Img {
          position: absolute;
          top: -93px;
        }

        #reviewScore_Container #reviewScore_Poor_Img {
          position: absolute;
          top: -188px;
        }
        
      </style>

      <div> Hotel Ratings list: </div>

      <template is="dom-repeat" items="{{urlHotel}}">

        <div><br/># [[index]]</div>
        
        <div>Hotel name: <span>[[item.name]]</span></div>

        <div>Hotel stars: <span>[[item.stars]]</span></div>

        <div>Hotel district: <span>[[item.district]]</span></div>

        <div>Hotel distanceToCityCentre: <span>[[item.distanceToCityCentre]] <span>km to city centre</span> </span></div>

        <div>Hotel Review Score: <span>[[item.review.score]]</span></div>

        <template is="dom-if" if="[[_formatScoreImage_Excellent(item.review.score)]]">

           Excellent

           <div id="reviewScore_Container">
             <img id="reviewScore_Good_VeryGood_Excellent_Img" src="../images/reviewscore.png" alt="reviewScore" /> 
           </div>

        </template>

        <template is="dom-if" if="[[_formatScoreImage_VeryGood(item.review.score)]]">

          Very Good

          <div id="reviewScore_Container">
            <img id="reviewScore_Good_VeryGood_Excellent_Img" src="../images/reviewscore.png" alt="reviewScore" /> 
          </div>

        </template>

        <template is="dom-if" if="[[_formatScoreImage_Good(item.review.score)]]">

          Good

          <div id="reviewScore_Container">
            <img id="reviewScore_Good_VeryGood_Excellent_Img" src="../images/reviewscore.png" alt="reviewScore" /> 
          </div>

        </template>

        <template is="dom-if" if="[[_formatScoreImage_Fair(item.review.score)]]">

          Fair

          <div id="reviewScore_Container">
            <img id="reviewScore_Fair_Img" src="../images/reviewscore.png" alt="reviewScore" /> 
          </div>

        </template>

        <template is="dom-if" if="[[_formatScoreImage_Poor(item.review.score)]]">

          Poor

          <div id="reviewScore_Container">
            <img id="reviewScore_Poor_Img" src="../images/reviewscore.png" alt="reviewScore" /> 
          </div>

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
    };
  }

  _formatScoreImage_Excellent(score) {
    // console.log(score, "is score working - excellent hotel");
    if (score >= 86 && score <= 100 ) {
      return true;
    } 
  }

  _formatScoreImage_VeryGood(score) {
    // console.log(score, "is score working - very good hotel");
    if (score >= 80 && score <= 85 ) {
      return true;
    } 
  }

  _formatScoreImage_Good(score) {
    // console.log(score, "is score working - very good hotel");
    if (score >= 75 && score <= 79 ) {
      return true;
    } 
  }

  _formatScoreImage_Fair(score) {
    // console.log(score, "is score working - fair hotel");
    if (score >= 68 && score <= 74 ) {
      return true;
    } 
  }
  
  _formatScoreImage_Poor(score) {
    // console.log(score, "is score working - poor hotel");
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
