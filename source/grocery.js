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

  droppableItemListeners: function () {
    $(this.dropSelector).droppable({
      accept: this.dragSelector,
      drop: this.dropFunction.bind(this)
    });
  },

  dropFunction: function (event, ui) {
    var thingDragged = ui.draggable.context.outerHTML;
    $(this.dropSelector).append(thingDragged);
    this.updateTotalPrice(ui);
  },

  updateTotalPrice: function(itemInfo){
    var itemPriceString = itemInfo.draggable.find('.item_price').html();
    var itemPrice = parseFloat(itemPriceString);
    var totalPriceString = $(this.totalSelector).html();
    if (totalPriceString === '') {
      var cleanedPrice = this.model.unfunkifyPrice(itemPrice);
      this.view.updatePrice(cleanedPrice, this.totalSelector);
    }
    else {
      var totalPrice = parseFloat(totalPriceString) + itemPrice;
      var cleanedPrice = this.model.unfunkifyPrice(totalPrice);
      this.view.updatePrice(cleanedPrice, this.totalSelector);
    }
  }
};

GroceryList.Model = function() {
};

GroceryList.Model.prototype = {
  unfunkifyPrice: function (priceToFix) {
    return priceToFix.toFixed(2);
  }
}

GroceryList.View = function () {
};

GroceryList.View.prototype = {
  updatePrice: function (newPrice, totalSelector) {
    $(totalSelector)[0].innerHTML = newPrice;
  }
}
