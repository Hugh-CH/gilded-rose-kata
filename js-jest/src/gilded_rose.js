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
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateStandardItemQuality(item){
    const reducedQuality = (item.sellIn >= 0) ? item.quality-1 : item.quality-2;
    const newQuality = (reducedQuality < 0) ? 0 : reducedQuality;
    return new Item(item.name,item.sellIn,newQuality)
  }

  updateBackStagePassQuality(item){
    if (item.sellIn > 10) {
      item.quality+=1;
    }else if (item.sellIn <= 10 && item.sellIn >5){
      item.quality+=2;
    }else if (item.sellIn <= 5 && item.sellIn >= 0){
      item.quality+=3;
    }else
      item.quality = 0;

    if (item.quality > 50){
      item.quality = 50;
    }
    return item;
  }

  updateBrieQuality(item){
    const increasedQuality = (item.sellIn >= 0) ? item.quality+1 : item.quality+2;
    const newQuality = (increasedQuality > 50) ? 50 : increasedQuality;
    return new Item(item.name,item.sellIn,newQuality)}

  updateItems() {

    for (let i = 0; i < this.items.length; i++) {

      this.items[i].updateSellIn();

      switch (this.items[i].name){
        case 'Sulfuras, Hand of Ragnaros':
          console.log('Sulfuras, Hand of Ragnaros');
          break;

        case 'Aged Brie':
          this.items[i] = this.updateBrieQuality(this.items[i]);
          break;

        case 'Backstage passes to a TAFKAL80ETC concert':
          this.items[i] = this.updateBackStagePassQuality(this.items[i]);
          break;

        default:
          this.items[i] = this.updateStandardItemQuality(this.items[i]);
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
