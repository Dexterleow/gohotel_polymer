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
// import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
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

      <style include="granite-bootstrap"></style>
      <style include="shared-styles">

        :host {
          display: block;

          padding: 10px;
        }

        #hotel_rating_review_score_container{
          width: 27px;
          height: 30px;
          overflow:hidden;
          position: relative;
        }
        
        #hotel_rating_container_right {
          padding-top: 5px;
        }

        .hotel_rating_review_score_image {
          width: 25px;
          z-index: -10;
        }

        #hotel_rating_review_score_container #hotel_rating_review_score_good_verygood_excellent_img {
          position: absolute;
          top: 2px;
        }

        #hotel_rating_review_score_container #hotel_rating_review_score_fair_img {
          position: absolute;
          top: -28px;
        }

        #hotel_rating_review_score_container #hotel_rating_review_score_poor_img {
          position: absolute;
          top: -58px;
        }

        .hotel_rating_images {
          max-width:100%;
          height: auto;
        }

        #hotel_rating_review_stars {
          width: 15px;
        }

        #hotel_rating_review_score {
          color: white;
          margin-left: 4px;
          margin-top: 5px;
          font-size: 13px;
        }
        
        #hotel_rating_amount {
          color:green;
          display: flex;
          float: right;
          margin-right: 5px;
        }

        .hotel_rating_row_border {
           border: 0.5px solid lightgrey;
        }

        .hotel_rating_mobile_fontsize {
          font-size: 10px;
        }

        .hotel_rating_rows_height_adjustment {
          margin-top: -8px;
        }

        .hotel_rating_rows_height_adjustment_city-distance {
          margin-top: -4px;
        }

        #hotel_rating_currency {
          margin-top: -2px;
          font-size:12px;
          margin-right:4px;
        }

        .inline-block {
          display: inline-block;
        }

        .remove-padding {
          padding: 0;
        }

      </style>

      <template is="dom-repeat" items="{{urlHotel}}" initialCount="20" targetFramerate="25">

      <div class="row hotel_rating_row_border">

        <div id="hotel_rating_container_left" class="col-3 col-md-3 remove-padding">
          <img class="hotel_rating_images" src="[[item.image]]">
        </div>
      
        <div id="hotel_rating_container_right" class="col-9 col-md-4">

          <div>[[item.name]]</div>

          <div class="hotel_rating_rows_height_adjustment">
            <div class="inline-block">
            <template is="dom-repeat" items="[[ _makeStarsReview(item.stars) ]]">
              <img id="hotel_rating_review_stars" src="../images/hstar.png" alt="hotel_rating_review_stars" /> 
            </template>
            </div>
            <div class="inline-block hotel_rating_mobile_fontsize">[[item.district]]</div>
          </div>

          <div class="hotel_rating_mobile_fontsize hotel_rating_rows_height_adjustment_city-distance">[[_convertTwoDecimalPlaces(item.distanceToCityCentre)]] <span>km to city centre</span> </span></div>

          <template is="dom-if" if="[[_formatScoreImage_Excellent(item.review.score)]]">

            <div class="inline-block" id="hotel_rating_review_score_container">
              <img class="hotel_rating_review_score_image" id="hotel_rating_review_score_good_verygood_excellent_img" src="../images/reviewscore.png" alt="reviewScore" /> 
              <div id="hotel_rating_review_score">[[item.review.score]]</div>
            </div>

            <div class="inline-block hotel_rating_mobile_fontsize">
              <div>Excellent</div>
              <div><span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>
            </div>

          </template>

          <template is="dom-if" if="[[_formatScoreImage_VeryGood(item.review.score)]]">

            <div class="inline-block" id="hotel_rating_review_score_container">
              <img class="hotel_rating_review_score_image" id="hotel_rating_review_score_good_verygood_excellent_img" src="../images/reviewscore.png" alt="reviewScore" /> 
              <div id="hotel_rating_review_score">[[item.review.score]]</div>
            </div>

            <div class="inline-block hotel_rating_mobile_fontsize">
              <div>Very Good</div>
              <div><span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>
            </div>

          </template>

          <template is="dom-if" if="[[_formatScoreImage_Good(item.review.score)]]">
            
            <div class="inline-block" id="hotel_rating_review_score_container">
              <img class="hotel_rating_review_score_image" id="hotel_rating_review_score_good_verygood_excellent_img" src="../images/reviewscore.png" alt="reviewScore" /> 
              <div id="hotel_rating_review_score">[[item.review.score]]</div>
            </div>

            <div class="inline-block hotel_rating_mobile_fontsize">
              <div>Good</div>
              <div><span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>
            </div>

          </template>

          <template is="dom-if" if="[[_formatScoreImage_Fair(item.review.score)]]">

            <div class="inline-block" id="hotel_rating_review_score_container">
              <img class="hotel_rating_review_score_image" id="hotel_rating_review_score_fair_img" src="../images/reviewscore.png" alt="reviewScore" /> 
              <div id="hotel_rating_review_score">[[item.review.score]]</div>
            </div>

            <div class="inline-block hotel_rating_mobile_fontsize">
              <div>Fair</div>
              <div><span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>
            </div>

          </template>

          <template is="dom-if" if="[[_formatScoreImage_Poor(item.review.score)]]">

            <div class="inline-block" id="hotel_rating_review_score_container">
              <img class="hotel_rating_review_score_image" id="hotel_rating_review_score_poor_img" src="../images/reviewscore.png" alt="reviewScore" /> 
              <div id="hotel_rating_review_score">[[item.review.score]]</div>
            </div>

            <div class="inline-block hotel_rating_mobile_fontsize">
              <div>Poor</div>
              <div><span>[[item.review.reviewsCount]]</span> <span> Reviews </span> </div>
            </div>

          </template>

          <div class="inline-block" id="hotel_rating_amount"><span id="hotel_rating_currency"> S$ </span> <span> [[item.amount]] </span></div>

        <div>

      </div>
      </template>

    `;
  }
  static get properties() {
    return {
      urlHotel: {
        type: Array,
      },
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
    // console.log(score, "is score working - good hotel");
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

  _makeStarsReview(stars) {
    // console.log("make sweets working");
    return new Array(stars);
  }

  handleResponse(event, res) {
    this.urlHotel = res.response;
    // console.log(this.urlHotel, "res");
    // console.log(this.urlHotel.length, "res length");
  }

  _convertTwoDecimalPlaces(x) {
    return Number.parseFloat(x).toFixed(2);
  }

}

window.customElements.define('hotel-ratings', HotelRatings);
