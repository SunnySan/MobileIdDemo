/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {
		return;
		/**********設定主選單**********/
		var s = "";
		s += '<ul>';
		s += '	<li class="current"><a href="index.html">Home</a></li>';
		s += '	<li><a href="myPaymentService.html">MyCard</a></li>';
		s += '	<li><a href="myBankService.html">MyShield</a></li>';
		s += '	<li><a href="myGovernmentService.html">MyEID</a></li>';
		s += '	<li><a href="TransactionReport.html">Transaction Report</a></li>';
		s += '	<li><a href="changePinCode.html">Change PIN Code</a></li>';
		/*
		s += '	<li>';
		s += '		<a href="#">Settings</a>';
		s += '		<ul>';
		s += '			<li><a href="changePinCode.html">Change PIN Code</a></li>';
		//s += '			<li><a href="fingerprint.html">My Fingerprint</a></li>';
		s += '		</ul>';
		s += '	</li>';
		*/
		s += '</ul>';
		$('#nav').append(s);
		


		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				offsetY: -15,
				hoverDelay: 0,
				alignment: 'center'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);