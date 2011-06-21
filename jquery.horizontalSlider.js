/**
 * jQuery horizontal slider plugin.
 *
 * @author Franziskus Domig
 * @date   2011-06-21
 */
(function($) {
	$.fn.horizontalSlider = function(options) {
		var defaults = {
			step: 500,
			animationLength: 500,
			sliderClass: 'horizontal-slider'
		};

		var options = $.extend(defaults, options);

		return this.each(function() {
			var height = 0;
			var maxPos = 0;
			var startPos = 0;
			var obj = $(this);

			// add css class
			obj.addClass(options.sliderClass);

			// calculate slider height
			obj.find('> div').each(function() {
				if (height < $(this).outerHeight(true)) {
					height = $(this).outerHeight(true);
				}
				maxPos+=$(this).outerWidth(true);
			});

			// do not add sliders if we do not need to scroll
			if (maxPos < obj.width()) {
				return;
			}

			obj.css('height', height);
			obj.css('overflow', 'hidden');

			// add thumbnail container and controls
			obj.wrapInner('<div class="thumbnails" />');
			obj.prepend('<div class="action back"></div>');
			obj.append('<div class="action forward"></div>');
			obj.find('.action').height(height);

			// set thumbnail width
			var thumbWidth = obj.width() - obj.find('.action').outerWidth()*2;
			obj.find('.thumbnails').width(maxPos);

			// start pos and max pos
			startPos = obj.find('.thumbnails').position().left;
			maxPos = thumbWidth - maxPos + obj.find('.action').outerWidth();

			// navigation button action
			obj.find('.action').click(function() {
				var element = $(this);
				var direction = $(element).hasClass('back') ? 1 : -1;
				var current = $(element).parent().find('.thumbnails').position();
				var newPos = current.left + (options.step*direction);

				if (newPos > startPos) {
					newPos = startPos;
				} else if (newPos < maxPos) {
					newPos = maxPos;
				}

				$(element).parent().find('.thumbnails').animate({
					left: newPos
				}, options.animationLength);
			});

		});

	};
})(jQuery);