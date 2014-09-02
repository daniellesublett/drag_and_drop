/*
 * What are the objects in this exercise?
 * What are their properties and methods?
 * How do your objects interact with their respective DOM elements?
 */
$(document).ready( function () {

  $('.item').draggable( {
    helper: 'clone'
  });

  $('#grocery_list').droppable({
    accept: '.item',
    drop: function (event, ui) {
      var itemTargetId = event.target.id;
      var thingDragged = ui.draggable.context.outerHTML;
      $('#' + itemTargetId).append(thingDragged);
      updateTotalPrice(ui);
    }
  });



  var updateTotalPrice = function(itemInfo){
    var itemPriceString = itemInfo.draggable.context.innerText.split(/\s/).slice(-1)[0];
    var itemPrice = parseFloat(itemPriceString);
    var totalPriceString = $('#total_cost')[0];
    // debugger;
    if (totalPriceString.innerHTML === '') {
      var cleanedPrice = unfunkifyPrice(itemPrice);
      totalPriceString.innerHTML = cleanedPrice;
    }
    else {
      var totalPrice = parseFloat(totalPriceString.innerHTML) + itemPrice;
      var cleanedPrice = unfunkifyPrice(totalPrice);
      totalPriceString.innerHTML = cleanedPrice;
    }
  }

  var unfunkifyPrice = function (priceToFix) {
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
});
