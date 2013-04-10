(function(window,undefined){

    var History = window.History; // Note: We are using a capital H instead of a lower h

    $(function () {

        $('.work-zone .work-item.clickable img').on('click', function () {
            $workItem = $(this).parent()
            if($workItem.hasClass('featured')) {
                $workItem.removeClass('featured');
                if($workItem.data('featured-size') != undefined) {
                    $workItem.css('height', 'auto');
                }
            } else {
                $workItem.addClass('featured');
                if($workItem.data('featured-size') != undefined) {
                    $workItem.css('height', $workItem.data('featured-size'));
                }
            }
            $('.work-zone').masonry('reload');
        });

        $('.work-zone').masonry({
          itemSelector: '.work-item',
          isAnimated: !Modernizr.csstransitions,
          gutterWidth: 17,
          columnWidth: 133
        });

        function animatePage(options) {
            defaultOptions = {
                loading: false,
                navigation: false
            }
            if (typeof options == 'object') {
                options = $.extend(defaultOptions, options);
            } else {
                options = defaultOptions;
            }

            if (!canAnimate) { return false; }
            if (!$.support.transition) {
                $.fn.transition = $.fn.animate;
            }

            if(options.loading == true) {
                $content.transition({
                    opacity: 0.5,
                    y: "-=25px"
                }, 1500, 'snap');
                if(options.navigation == true) {
                    $sidenav.delay(200).transition({
                        opacity: 0.5,
                        y: "-=25px"
                    }, 1500, 'snap');
                }
            } else {
                $content.transition({
                    opacity: 1,
                    y: "+=25px"
                }, 1500, 'snap');
                if(options.navigation == true) {
                    $sidenav.delay(200).transition({
                        opacity: 1,
                        y: "+=25px"
                    }, 1500, 'snap');
                }
            }
        }

        var $content = $('#contextual-content');
        var $sidenav = $('#side-navigation section');
        var canAnimate = $('html.opacity.cssanimations').length > 0;

        if ( History.enabled ) {
            // Bind to StateChange Event
            History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
                var State = History.getState(); // Note: We are using History.getState() instead of event.state
                // History.log(State.data, State.title, State.url);
                animatePage({loading: true });

                $.ajax({
                    url: State.url,
                    dataType: 'html',
                    success: function (data) {
                        var pageContentHTML = $(data).filter('#primary-container').find('#contextual-content').html()
                        document.title = $(data).filter('title').text();

                        $content.stop(true,true);
                        $sidenav.stop(true,true);
                        $content.html(pageContentHTML);

                        animatePage();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        document.location.href = State.url;
                        return false;
                    }
                });
            });
            $('#side-navigation a').click(function (e) {
                // Continue as normal for cmd clicks etc
                if ( e.which == 2 || e.metaKey ) { return true; }
                e.preventDefault();

                var $link = $(this);
                var url = $link.attr('href');
                if(location.pathname.substr(location.pathname.lastIndexOf('/')+1) == url) {
                    return false;
                }

                History.pushState(null, $link.attr('title')||null, url);
                return false;
            })
        }

        animatePage({navigation: true});


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