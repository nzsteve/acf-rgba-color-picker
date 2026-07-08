=== ACF RGBA Color Picker ===
Contributors: tmconnect
Tags: acf, acfpro, color, color picker, rgba
Requires at least: 7.0
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 2.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A RGBA-Color-Picker field for Advanced Custom Fields. Maintained by Web Gurus; originally created by Thomas Meyer.

== Description ==

The RGBA Color Picker is a color picker that supports transparency colors in RGBA-Mode.

= Custom color palette =

The plugin offers the possibility to customize the color palette according to your own wishes. You can define your own custom color palette with the `acf/rgba_color_picker/palette` filter. In addition, you can define an individual color palette for each field in the field settings.

**New in version 1.2.0**

If there are a lot of colors for the color palette, the color fields are getting very tiny. To prevent this, the color fields are now displayed in several rows (with a maximum of 10 colors per row). So it is possible to define a lot of colors for the standard palette.

Furthermore, the color picker is now absolutely positioned and this does not shift other elements of the page every time the color picker is opened.

**This plugin requires [ACF](https://www.advancedcustomfields.com/) (version 6.0.0 or higher).**

= Localizations =
* English
* Deutsch


== Installation ==

1. Upload the `rgba_color_picker` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Done!


== Custom color palette ==

Use the `acf/rgba_color_picker/palette` filter to create your own standard color palette for the color picker. Your custom standard color palette, just like the default color palette, can be overridden in the field settings for each field individually.

= Fixed color palette =
Put a code like this into your themes functions.php (you can use HEX or RGBA color values and can also mix them):

`<?php
function set_acf_rgba_color_picker_palette() {
	$palette = array(
		'#FFF',
		'#0018ff',
		'#00FF36',
		'rgba(255,168,0,0.7)'
	);

	return $palette;
}
add_filter('acf/rgba_color_picker/palette', 'set_acf_rgba_color_picker_palette');
?>`

= Dynamic color palette =
If you have an options page where you define some standard colors, create an array from this options like this:

`<?php
function set_acf_rgba_color_picker_palette() {
	// optional - add colors which are not set in the options page
	$palette = array(
		'#FFF',
		'#000'
	);

	if ( have_rows('YOUR_COLOR_REPEATER_FIELD', 'YOUR_OPTIONS_PAGE') ) {
		while( have_rows('YOUR_COLOR_REPEATER_FIELD', 'YOUR_OPTIONS_PAGE') ) { the_row();
			$palette[] = get_sub_field('YOUR_COLOR_FIELD');
		}
	}

	return $palette;
}
add_filter('acf/rgba_color_picker/palette', 'set_acf_rgba_color_picker_palette');
?>`

This is an example using a repeater field to set the colors; if you store your colors within a string, convert this string into an array.

= Hiding color palette =
If you dont want to show a color palette set the return value of the filter to false:

`<?php
add_filter('acf/rgba_color_picker/palette', '__return_false');
?>`

Setting the color palette to false will disable and hide the "Color Palette" and "Hide Color Palette" options in the field settings.


== Screenshots ==

1. The RGBA Color Picker field settings
2. The RGBA Color Picker with the standard color palette
3. The RGBA Color Picker with a custom color palette


== Credits ==

This plugin was originally created by Thomas Meyer (https://dreihochzwo.de). It is now maintained by Web Gurus (https://webgurus.co.nz) and released as an open-source fork under the original GPLv2 (or later) license. Full credit for the original work goes to Thomas Meyer.


== Changelog ==

= v2.0.1 =
* Fixed stale admin styling: the plugin's CSS/JS are now cache-busted by file modification time, so browsers and page caches always load the latest versions (previously the v2.0.0 display fixes could be masked by cached assets)

= v2.0.0 =
* Fixed the colour control height on WordPress 7 / ACF 6: the trigger button now measures and matches the field's own text input, so it lines up with the surrounding fields instead of appearing too short or too tall (including inside repeaters)
* New maintainer: the plugin is now maintained by Web Gurus (major version bump to signify the change of maintainership), with full credit to original creator Thomas Meyer
* Pointed the plugin home to the public GitHub repository
* Removed the donation link

= v1.3.0 =
* Compatibility with WordPress 7 and ACF 6
* Fixed the color control display inside repeater rows on the taller WordPress 7 admin UI (removed the hardcoded control heights)
* Modernised the field JavaScript to the current ACF field API (acf.Field / acf.registerFieldType)
* Scoped the palette popup styling to each field so multiple color pickers no longer affect each other
* Escaped field attribute output in the admin
* Removed the deprecated wpColorPickerL10n localisation and the core wp-color-picker script override
* Removed the donation meta box
* Raised minimum requirements to WordPress 7.0, PHP 7.4 and ACF 6.0

= v1.2.3 =
* Fixed for PHP 8

= v1.2.2 =
* Fixes for WP 5.5

= v1.2.1 =
* Minor bug fixes

= v1.2.0 =
* Correct use of standard color
* Changed position of color picker
* Better handling for color palettes

= v1.1.0 =
* Changed class name to prevent future conflicts with ACF

= v1.0.3 =
* Updated wp-color-picker-alpha to V2.0.0 of compatibility for WP 4.9

= v1.0.2 =
* Optimized init of acf/rgba_color_picker/palette filter

= v1.0.1 =
* Fixed display error on Chrome and Firefox on Windows

= v1.0.0 =
* Initial release of this plugin, tested and stable.
