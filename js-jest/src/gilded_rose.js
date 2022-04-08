class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  getQuality({name, quality, sellIn}){
    if (name === 'Aged Brie' || name === 'Backstage passes to a TAFKAL80ETC concert') {
      if (quality < 50) {
        quality += 1;
        if (name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (sellIn < 11) {
            quality +=1;
          }
          if (sellIn < 6) {
            quality += 1 ;
          }
          if (sellIn < 0) {
            return 0;
          }
        }
      }
    } else if (quality > 0) {
      quality -= 1;
    }

    if (sellIn < 0) {
      if ((name === 'Aged Brie' || name === 'Backstage passes to a TAFKAL80ETC concert') && quality < 50) {
        quality += 1;
      } else if (quality > 0) {
        quality -= 1;
      }
    }
    return quality;
  }

  updateItems() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') break;
      this.items[i].sellIn = this.items[i].sellIn - 1;
      this.items[i].quality = this.getQuality(this.items[i]);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
