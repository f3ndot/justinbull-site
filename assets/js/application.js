(function(window,undefined){

    // Prepare
    var History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !History.enabled ) {
        // History.js is disabled for this browser.
        // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log(State.data, State.title, State.url);
    });

    // Wait for Document
    $(function () {

        if ( History.enabled ) {
            $('#side-navigation a').click(function (e) {
                e.preventDefault();
                
                var url = $(this).attr('href');
                if(location.pathname.substr(location.pathname.lastIndexOf('/')+1) == url) {
                    return false;
                }

                $.ajax({
                    url: url,
                    dataType: 'html',
                    success: function (data) {
                        var pageContentHTML = $(data).filter('#primary-container').find('#contextual-content').html()
                        $('#contextual-content').html(pageContentHTML)
                        History.pushState(null, $(data).filter('title').text(), url);
                    }
                });
                return false;
            })
        }

        if ($('html.opacity.cssanimations').length > 0) {
            if (!$.support.transition) {
                $.fn.transition = $.fn.animate;
            }

            $('#contextual-content').transition({
                opacity: 1,
                y: "+=25px"
            }, 1500, 'snap');
            $('#side-navigation section').delay(200).transition({
                opacity: 1,
                y: "+=25px"
            }, 1500, 'snap');
        }


        $('form').submit(function (e) {
            e.preventDefault();
            var $form = $(this);
            var $submitBtn = $('#submit');
            $('#error-p').remove();

            $submitBtn.val('Sending...').addClass('sending');
            
            $.post('mailer.php',{email: $('#email').val(), message: $('#message').val()}, function(data) {
                $submitBtn.val('Sent!').attr('disabled', true).removeClass('sending').addClass('disabled');
                $('form').unbind('submit');
            }, 'json')
            .error(function() {
                $submitBtn.removeClass('sending').val('Error sending').addClass('error');
                $form.append('<p id="error-p">Please email me directly at <a href="mailto:me@justinbull.ca">me@justinbull.ca</a></p>');
            });
            return false;
        });

    });

})(window);