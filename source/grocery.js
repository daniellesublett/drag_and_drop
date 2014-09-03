/*
 * What are the objects in this exercise?
 * What are their properties and methods?
 * How do your objects interact with their respective DOM elements?
 */
$(document).ready( function () {

  new GroceryList.Controller('#grocery_list', '.item', new GroceryList.View())

});

GroceryList = {};

GroceryList.Controller = function (dropSelector, dragSelector, view) {
  this.dropSelector = dropSelector;
  this.dragSelector = dragSelector;
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
    var itemTargetId = event.target.id;
    var thingDragged = ui.draggable.context.outerHTML;
    $('#' + itemTargetId).append(thingDragged);
    this.updateTotalPrice(ui);
  },

  droppableItemListeners: function () {
    $(this.dropSelector).droppable({
      accept: '.item',
      drop: this.dropFunction.bind(this)
    });
  },

  updateTotalPrice: function(itemInfo){
    var itemPriceString = itemInfo.draggable.context.innerText.split(/\s/).slice(-1)[0];
    var itemPrice = parseFloat(itemPriceString);
    var totalPriceString = $('#total_cost')[0];
    if (totalPriceString.innerHTML === '') {
      var cleanedPrice = this.model.unfunkifyPrice(itemPrice);
      totalPriceString.innerHTML = cleanedPrice;
    }
    else {
      var totalPrice = parseFloat(totalPriceString.innerHTML) + itemPrice;
      var cleanedPrice = this.model.unfunkifyPrice(totalPrice);
      totalPriceString.innerHTML = cleanedPrice;
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
  updatePrice: function (newPrice) {
    console.log(newPrice)
  }
}
