(function($, undefined){

	// Bail if ACF (6+) is not available.
	if ( typeof acf === 'undefined' || typeof acf.Field === 'undefined' ) {
		return;
	}

	var transparent = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==)';

	var Field = acf.Field.extend({

		type: 'extended-color-picker',

		$control: function(){
			return this.$('.acf-color-picker');
		},

		$input: function(){
			return this.$('input[type="text"]');
		},

		initialize: function(){

			var $input        = this.$input();
			var $control      = this.$control();
			var fieldPalette  = $control.data('palette');
			var defaultColor  = $control.data('default');

			// Work out the height of the surrounding fields so the trigger button
			// lines up with them (they vary by theme / host plugin) instead of
			// being pinned to a fixed size. Measure our own input first (before
			// wpColorPicker wraps and hides it); if that is not measurable yet
			// (hidden tab, collapsed row, not-yet-laid-out repeater) fall back to
			// a sibling text input in the same row, then to a sensible default.
			var inputHeight = $input.outerHeight();
			if ( ! inputHeight ) {
				inputHeight = this.$el.closest( 'tr, .acf-row, .acf-fields' )
					.find( 'input[type="text"]' ).not( $input ).filter( ':visible' ).first().outerHeight();
			}
			if ( ! inputHeight ) {
				inputHeight = 36;
			}
			var colorPalette;

			if ( fieldPalette === 'no-palette' ) {
				colorPalette = false;
			} else if ( fieldPalette !== '' && fieldPalette != null ) {
				colorPalette = String( fieldPalette ).split(';');
			} else {
				colorPalette = true;
			}

			var args = {
				defaultColor: defaultColor,
				palettes: colorPalette,
				hide: true,
				change: function( event ){
					// timeout is required to ensure the input value is up to date
					setTimeout( function(){
						var $target = $( event.target ).closest('[data-target="target"]');
						acf.val( $target.find('.hiddentarget'), $target.find('.valuetarget').val() );
					}, 1 );
				},
				clear: function( event ){
					// timeout is required to ensure the input value is up to date
					setTimeout( function(){
						var $target = $( event.target ).closest('[data-target="target"]');
						$target.find('.wp-color-result').css({
							'background-image': transparent,
							'background-color': 'transparent'
						});
						acf.val( $target.find('.hiddentarget'), $target.find('.valuetarget').val() );
					}, 1 );
				}
			};

			$input.wpColorPicker( args );

			// Match the trigger button to the measured input height so the control
			// lines up with the surrounding fields. The label and swatch are made
			// to fill this height via CSS (flex), so there is no gap for the
			// button's checkerboard background to show through.
			this.$('.wp-color-result').css( 'height', inputHeight + 'px' );

			// Size the palette popup to fit the number of palette rows.
			// Scoped to this field so other pickers on the page are untouched.
			var paletteRowCount = Math.ceil( this.$('.iris-palette').length / 10 );
			this.$('.iris-picker').css( 'height', ( 194 + ( paletteRowCount * 24 ) ) + 'px' );
		}

	});

	acf.registerFieldType( Field );

})(jQuery);
