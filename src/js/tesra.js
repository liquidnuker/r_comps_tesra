import {items} from "./items.js";

class Tesra {
  constructor(opts) {
    this.ts = opts.dataSrc;
    this.tsContainer = opts.tsContainer;
    this.previous = [];
    this.limit = opts.limit;
    this.autoplay = opts.autoplay;
    this.interval = opts.interval;
  }

  init() {
    if (this.autoplay) {
      setInterval(() => {
        this.start();
      }, this.interval);
    } else {
      this.start();
    }
  }

  start() {
    this.ts = this.shuffle(this.ts);
    this.removePrevious();
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  indexFinder(value) {
    let previous = this.previous;
    for (var key = 0; key < previous.length; key++) {
      if (previous[key] === value) {
        return key;
      }
    }
  }

  removePrevious() {
    this.placeholder = [];
    this.ts.map((i) => {
      // remove previous items from main item array
      if (this.indexFinder(i) === undefined) {
        this.placeholder.push(i);
      }
    });
    this.setPrevious();
  }

  setPrevious() {
    // reset previous items and push current items
    // this.previous = [];
    // for (let i = 0, l = this.limit; i < l; i++) {
    //   this.previous.push(this.placeholder[i]); 
    // }
    // this.showItems();
    
    // Each randomized item will display once every cycle
    for (let i = 0, l = this.limit; i < l; i++) {
      if (this.previous.length !== this.ts.length - this.limit) {
        this.previous.push(this.placeholder[i]);
      } else {
        this.previous = [];
        this.previous.push(this.placeholder[i]);
      }      
    }
    this.showItems();
  }

  showItems() {
    document.getElementById(this.tsContainer).innerHTML = "";
    for (let i = 0, l = this.limit; i < l; i++) {
      let tsItems = document.createElement("div");
      tsItems.className = "col-sm-6";
      tsItems.innerHTML = `
      ${this.placeholder[i].ct}
      ${this.placeholder[i].name}<br>
      ${this.placeholder[i].info}
      ${this.placeholder[i].avatar}`;

      document.getElementById(this.tsContainer).appendChild(tsItems);
    }
  }
}

let TR = new Tesra({
  dataSrc: items,
  tsContainer: "tesra_placeholder",
  limit: 2,
  autoplay: true,
  interval: 1000
});

TR.init();