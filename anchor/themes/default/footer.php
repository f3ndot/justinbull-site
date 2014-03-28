		<div class="wrap">
	            <footer id="bottom">
	                <small>
	                  <a rel="license" href="//creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="//i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />
	                  &copy; <?php echo date('Y'); ?> <a href="/attribution/">Justin A. S. Bull</a>. <a rel="license" href="//creativecommons.org/licenses/by/4.0/">Some rights reserved</a>.
	                </small>

	                <ul role="navigation">
	                    <li><a href="<?php echo rss_url(); ?>">RSS</a></li>
	                    <?php if(twitter_account()): ?>
	                    <li><a href="<?php echo twitter_url(); ?>">@<?php echo twitter_account(); ?></a></li>
	                    <?php endif; ?>

	                    <li><a href="/" title="Return to my website.">Home</a></li>
	                </ul>
	            </footer>

	        </div>
        </div>
    </body>
</html>