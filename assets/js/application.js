(function(window,undefined){

  if (window.location.hash == '#verify') {
    $('#verify').modal()
  }

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

  var $statusText = $('#life-status');
  var $signedStatusText = $('#signed-life-status');

  $.getJSON('/life-status.php', function (data) {
    if(typeof data.status != 'undefined') {
      if (data.cached == true) {
        $statusText.text(data.status + ' (Cached)');
      } else {
        $statusText.text(data.status);
      }
      if (typeof data.color != 'undefined') {
        $statusText.css('color', data.color);
      }
      if (data.bold == true) {
        $statusText.css('font-weight', 'bold');
      }
      $signedStatusText.text(data.verify);
    } else {
      $statusText.text('Error fetching life status');
      $statusText.css('color', 'red');
      $statusText.css('font-weight', 'bold');
      $signedStatusText.text("There was an error contacting the life status server.\n\nIt may be offline or temporarily unavailable.");
    }
  });

})(window);
