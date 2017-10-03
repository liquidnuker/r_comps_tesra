import {items} from "./items.js";

class Tesra {
  constructor(opts) {
    this.ts = opts.dataSrc;
    this.previous = [];
    this.limit = opts.limit;
    this.autoplay = opts.autoplay;
    this.interval = opts.interval;
    this.typewriter = opts.typewriter;
  }

  init() {
    this.start();
    if (this.autoplay) {
      setInterval(() => {
        this.start();
      }, this.interval);
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

  typewrite(id, text, speed) {
    let index = 0;
    let timer = setInterval(function () {      
      document.getElementById(id).innerHTML = text.substr(0, index);
      // todo: return text.substr(0, index);
      if (++index === text.length + 1) {
        clearInterval(timer);
      }
    }, speed);
  }

  showItems() {
    if (this.typewriter) {
      this.typewrite("tesra101_segment1_comment", this.placeholder[0].ct, 32);
      this.typewrite("tesra101_segment2_comment", this.placeholder[1].ct, 32);
    } else {
      document.getElementById("tesra101_segment1_comment").textContent = this.placeholder[0].ct;
      document.getElementById("tesra101_segment2_comment").textContent = this.placeholder[1].ct;
    }

    // todo: shorten
    document.getElementById("tesra101_segment1_name").textContent = this.placeholder[0].name;
    document.getElementById("tesra101_segment1_info").textContent = this.placeholder[0].info;
    document.getElementById("tesra101_segment1_avatar").setAttribute("alt", this.placeholder[0].avatar);

    document.getElementById("tesra101_segment2_name").textContent = this.placeholder[1].name;
    document.getElementById("tesra101_segment2_info").textContent = this.placeholder[1].info;
    document.getElementById("tesra101_segment2_avatar").setAttribute("alt", this.placeholder[1].avatar);
  }
}

let TR = new Tesra({
  dataSrc: items,
  limit: 2,
  autoplay: false,
  interval: 1600,
  typewriter: true
});

TR.init();