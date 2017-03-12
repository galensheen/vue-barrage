/**
 * Created by galen on 2017/3/13.
 */
  
class Barrage {
  constructor(options = {}) {
    this.options = options;
    this.barrages = [];
    this.id = 1;
  }
  
  add(msg) {
    let b = document.createElement('div');
    b.style.position = 'fixed';
    b.style.zIndex = 2000;
    if (this.options.isColor) {
      b.style.color = `rgb(${Math.random() * 255 >> 0}, ${Math.random() * 255 >> 0}, ${Math.random() * 255 >> 0})`;
    } else {
      b.style.color = this.options.color || '#333333';
    }
    b.style.fontSize = this.options.fontSize || '18px';
    b.style.overflow = 'hidden';
    b.classList = ['barrage'];
    b.id = 'barrage' + this.id++;
    b.style.transform = 'translateX(' + (window.innerWidth + Math.random() * 300 >> 0) + 'px)';
    b.innerText = this.truncate(msg);
    b.style.top = (Math.random() * (window.innerHeight) >> 0) + 'px';
    
    this.barrages.push(b);
    document.body.appendChild(b);
  }
  
  truncate(msg) {
    let len = this.options.maxLength || 20;
    msg = msg + '';
    if (msg.length <= len) return msg;
    return msg.substr(0, len) + '...';
  }
  
  scrolling() {
    for (let barrage of this.barrages) {
      let bounding = barrage.getBoundingClientRect();
      if (bounding.left < -bounding.width) {
        document.body.removeChild(barrage);
      }
      barrage.style.transform = 'translateX(' + (bounding.left - (this.options.velocity || 2)) + 'px)';
    }
  }
}

function install(Vue, options) {
  let barrage = new Barrage(options);
  function fly() {
    requestAnimationFrame(fly);
    barrage.scrolling();
  }
  
  Vue.prototype.$barrage = barrage;
  
  fly();
}

export {install};
