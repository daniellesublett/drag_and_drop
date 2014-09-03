/*
 * What are the objects in this exercise?
 * What are their properties and methods?
 * How do your objects interact with their respective DOM elements?
 */
$(document).ready( function () {
  var opts = {
    dropSelector: '#grocery_list',
    dragSelector: '.item',
    totalSelector: '#total_cost'
  }
  new GroceryList.Controller(new GroceryList.View(), opts)

});

GroceryList = {};

GroceryList.Controller = function (view, selectors) {
  this.dropSelector = selectors.dropSelector;
  this.dragSelector = selectors.dragSelector;
  this.totalSelector = selectors.totalSelector;
  this.view = view;
  this.model = new GroceryList.Model();


  this.draggableItemListeners();
  this.droppableItemListeners();
};

GroceryList.Controller.prototype = {
  draggableItemListeners: function () {
   $(this.dragSelector).draggable({
      helper: 'clone'
    });
  },

  dropFunction: function (event, ui) {
    var thingDragged = ui.draggable.context.outerHTML;
    $(this.dropSelector).append(thingDragged);
    this.updateTotalPrice(ui);
  },

  droppableItemListeners: function () {
    $(this.dropSelector).droppable({
      accept: this.dragSelector,
      drop: this.dropFunction.bind(this)
    });
  },

  updateTotalPrice: function(itemInfo){
    var itemPriceString = itemInfo.draggable.context.innerText.split(/\s/).slice(-1)[0];
    var itemPrice = parseFloat(itemPriceString);
    var totalPriceString = $(this.totalSelector)[0];
    if (totalPriceString.innerHTML === '') {
      var cleanedPrice = this.model.unfunkifyPrice(itemPrice);
      this.view.updatePrice(cleanedPrice, totalPriceString);
    }
    else {
      var totalPrice = parseFloat(totalPriceString.innerHTML) + itemPrice;
      var cleanedPrice = this.model.unfunkifyPrice(totalPrice);
      this.view.updatePrice(cleanedPrice, totalPriceString);
    }
  },

};

GroceryList.Model = function() {

};

GroceryList.Model.prototype = {
  unfunkifyPrice: function (priceToFix) {
    var stringPrice = priceToFix.toString();
    var splitPrice = stringPrice.split('.');
    if (splitPrice.length === 1)
      return splitPrice[0] + '.00'
    else if (splitPrice[1].length === 1)
      return splitPrice.join('.') + '0';
    else if (splitPrice[1].length > 2)
      return splitPrice[0] + '.' + splitPrice[1].slice(0, 2);
    else
      return priceToFix;
  }

}

GroceryList.View = function () {
};

GroceryList.View.prototype = {
  updatePrice: function (newPrice, elemToManipulate) {
    elemToManipulate.innerHTML = newPrice;
  }
}
