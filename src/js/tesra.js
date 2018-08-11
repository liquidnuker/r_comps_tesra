import {
  items
}
from "./items.js";

class Tesra {
  constructor(opts) {
    this.data = opts.dataSrc;
    this.previous = [];
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
    this.shuffle(this.data);
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

  findIndex(arr, value) {
    for (let key = 0; key < arr.length; key++) {
      if (arr[key] === value) {
        return key;
      }
    }
  }

  removePrevious() {
    this.placeholder = [];
    this.data.map((i) => {
      // remove previous items from main item array
      if (this.findIndex(this.previous, i) === undefined) {
        this.placeholder.push(i);
      }
    });
    this.setPrevious();
  }

  setPrevious() {
    // Each randomized item will display once every cycle
    for (let i = 0, l = 2; i < l; i++) {
      if (this.previous.length !== this.data.length - 2) {
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
    let timer = setInterval(() =>  {
      this.getId(id).innerHTML = text.substr(0, index);
      // todo: return text.substr(0, index);
      if (++index === text.length + 1) {
        clearInterval(timer);
      }
    }, speed);
  }

  getId(el) {
    return document.getElementById(el);
  }

  generateAttr(el, attr) {
    Object.keys(attr).forEach((i) => {
      return this.getId(el).setAttribute(i, attr[i]);
    });

    return el;
  }

  setTextContent(el, textContent) {
    return this.getId(el).textContent = textContent;
  }

  showItems() {
    if (this.typewriter) {
      this.typewrite("tesra101_segment1_comment", this.placeholder[0].ct, 32);
      this.typewrite("tesra101_segment2_comment", this.placeholder[1].ct, 32);
    } else {
      this.setTextContent("tesra101_segment1_comment", this.placeholder[0].ct);
      this.setTextContent("tesra101_segment2_comment", this.placeholder[1].ct);
    }

    this.setTextContent("tesra101_segment1_name", this.placeholder[0].name);
    this.setTextContent("tesra101_segment1_info", this.placeholder[0].info);

    this.generateAttr("tesra101_segment1_avatar", {
      src: "src/img/avatars/" + this.placeholder[0].avatar + ".jpg",
      alt: this.placeholder[0].avatar
    })

    this.setTextContent("tesra101_segment2_name", this.placeholder[1].name);
    this.setTextContent("tesra101_segment2_info", this.placeholder[1].info);
    
    this.generateAttr("tesra101_segment2_avatar", {
      src: "src/img/avatars/" + this.placeholder[1].avatar + ".jpg",
      alt: this.placeholder[1].avatar
    })
  }
}

let TR = new Tesra({
  dataSrc: items,
  autoplay: true,
  interval: 1600,
  typewriter: true
});

TR.init();