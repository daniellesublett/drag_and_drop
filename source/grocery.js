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
    if (totalPriceString.innerHTML === '')
      totalPriceString.innerHTML = itemPrice;
    else {
      var totalPrice = parseFloat(totalPriceString.innerHTML) + itemPrice;
      totalPriceString.innerHTML = totalPrice;
    }

  }


});
