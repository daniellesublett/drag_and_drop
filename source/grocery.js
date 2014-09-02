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
    }
  });

});
