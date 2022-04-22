class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateSellIn () {
    if (this.name !== 'Sulfuras, Hand of Ragnaros'){
      this.sellIn=this.sellIn-1;
    }
  }

  updateQuality () {
    switch (this.name){
    case 'Sulfuras, Hand of Ragnaros':
      break;

    case 'Aged Brie':
      this.updateBrieQuality();
      break;

    case 'Backstage passes to a TAFKAL80ETC concert':
      this.updateBackStagePassQuality();
      break;

    default:
      this.updateStandardItemQuality();
    }
  }

  updateBrieQuality(){
    this.quality = (this.sellIn >= 0) ? this.quality+1 : this.quality+2;
    if (this.quality>50){
      this.quality=50;
    }
  }

  updateStandardItemQuality(){
    this.quality = (this.sellIn >= 0) ? this.quality-1 : this.quality-2;
    if (this.quality < 0){
      this.quality = 0;
    }
  }

  updateBackStagePassQuality(){
    if (this.sellIn > 10) {
      this.quality+=1;
    } else if (this.sellIn <= 10 && this.sellIn >5){
      this.quality+=2;
    } else if (this.sellIn <= 5 && this.sellIn >= 0){
      this.quality+=3;
    } else
      this.quality = 0;

    if (this.quality > 50){
      this.quality = 50;
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateItems() {

    for (let i = 0; i < this.items.length; i++) {

      this.items[i].updateSellIn();
      this.items[i].updateQuality();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
