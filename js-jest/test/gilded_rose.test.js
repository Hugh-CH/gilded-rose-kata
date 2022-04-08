const {Shop, Item} = require('../src/gilded_rose');

describe('Gilded Rose', function() {
  it('should foo', function() {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  it('Should increase brie quality by one but not above 50 if before sell by date', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 5, 0),new Item('Aged Brie', 5, 49),new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
  });
  it('Should increase brie quality by two but not above 50 if after sell by date', function() {
    const gildedRose = new Shop([new Item('Aged Brie', 0, 0),new Item('Aged Brie', 0, 49),new Item('Aged Brie', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
  });
  it('Should decrease quality by one but not below zero', function() {
    const gildedRose = new Shop([new Item('Test Item', 2, 0),new Item('Test Item', 2, 1),new Item('Test Item', 2, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(19);
  });
  it('Should decrease quality by two but not below zero if past sell by date', function() {
    const gildedRose = new Shop([new Item('Test Item', 0, 0),new Item('Test Item', 0, 1),new Item('Test Item', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(18);
  });
  it('Should not update Sulfuras, Hand of Ragnaros', function() {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 0),new Item('Sulfuras, Hand of Ragnaros', 0, 1),new Item('Sulfuras, Hand of Ragnaros', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(1);
    expect(items[2].quality).toBe(20);
  });
});
