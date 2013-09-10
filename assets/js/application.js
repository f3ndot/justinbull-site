(function(window,undefined){

  $('[rel=tooltip]').tooltip();
  $('#dead').popover({
    html: true,
    placement: 'top',
    trigger: 'manual'
  }).on('click', function(e) {
    $(this).popover('toggle');
    e.stopPropagation();
  });

  var hidePopover = function() {
    $('#dead').popover('hide');
  };

  $(document).on('click', function(e) {
    if (!$(e.target).is('.popup-marker, .popover-title, .popover-content, .popover-content p, .popover-content p a')) {
      hidePopover();
    }
  });

})(window);
