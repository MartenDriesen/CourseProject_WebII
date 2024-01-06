"use strict";

export default class Request {
    constructor(description, offer, mail) {
      this.description = description;
      this.offer = offer;
      this.mail = mail;
    }
  
    innerHTML() {
      return `
        <div class="request">
          <img src="images/request.svg" alt="">
          <div class="description">${this.description}</div>
          <p class="offer">€${this.offer}</p>
          <p class="mail">${this.mail}</p>
        </div>
      `;
    }
  }