"use strict";

export default class Character {
    constructor(id, name, faction, species, gender, ship, favorite, costum, backstory, inventor) {
        this.id = id;
        this.name = name;
        this.faction = faction
        this.species = species;
        this.gender = gender;
        this.ship = ship;
        this.favorite = favorite;
        this.costum = costum;
        this.backstory = backstory;
        this.inventor = inventor;
    }    

    innerHTML() {
        if (this.favorite) {
            
            this.favorite = 'images/activestar.png';
        } else {
            console.log(this.favorite)
            this.favorite = 'images/star.png';
        }

        if (this.costum) {
            this.costum = 'images/costum.png';
        } else {
            this.costum = null;
        }

        return `
        <div class="character">
          <button class="delete" id='${this.id}'></button>
          <img class="cart" src="images/cart.svg" alt="">
          <button id='${this.id}' class="favorite"></button>
          <img class="costumicon" src="${this.costum}" alt="">
          <img class="faction" src="${this.faction}" alt="">
          <div class="text">
              <p class="property">${this.name}</p>
              <p class="propertytitle">Species</p>
              <p class="shipProperty">${this.species}</p>
              <p class="propertytitle">Ship:</p>
              <p class="shipProperty">${this.ship}</p>
              <p class="propertytitle">Invented by</p>
              <p class="shipProperty">${this.inventor}</p>
              <img class="gender" src="${this.gender}" alt="">
          </div>
        </div>`;
    }
}