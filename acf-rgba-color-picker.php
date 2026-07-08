<?php
/*
Plugin Name: ACF RGBA Color Picker
Plugin URI:  https://wordpress.org/plugins/acf-rgba-color-picker/
Description: Adds an Advanced Custom Fields field for an extended color picker with transparency option.
Version: 1.3.0
Requires at least: 7.0
Requires PHP: 7.4
Author: Thomas Meyer
Author URI: https://dreihochzwo.de
Text Domain: acf-extended-color-picker
Domain Path: /languages
License: GPLv2 or later.
Copyright: Thomas Meyer
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;

// check if class already exists
if( !class_exists('dhz_acf_plugin_extended_color_picker') ) :

class dhz_acf_plugin_extended_color_picker {

	public $settings;

	function __construct() {

		// vars
		$this->settings = array(
			'plugin'			=> 'ACF RGBA Color Picker',
			'this_acf_version'	=> 0,
			'min_acf_version'	=> '6.0.0',
			'version'			=> '1.3.0',
			'url'				=> plugin_dir_url( __FILE__ ),
			'path'				=> plugin_dir_path( __FILE__ ),
			'plugin_path'		=> 'https://wordpress.org/plugins/acf-rgba-color-picker/'
		);

		// set text domain (on init to avoid loading translations too early in WP 6.7+)
		add_action( 'init', array($this, 'load_textdomain') );

		add_action( 'admin_init', array($this, 'acf_or_die'), 11);

		// include field
		add_action( 'acf/include_field_types', array($this, 'include_field_types') );

	}

	/**
	 * Load the plugin text domain.
	 */
	function load_textdomain() {
		load_plugin_textdomain( 'acf-extended-color-picker', false, dirname( plugin_basename(__FILE__) ) . '/languages/' );
	}

	/**
	 * Let's make sure ACF is installed & activated.
	 * If not, we give notice and kill the activation of ACF RGBA Color Picker.
	 * Also works if ACF is deactivated.
	 */
	function acf_or_die() {

		if ( !class_exists('acf') ) {
			$this->kill_plugin();
		} else {
			$this->settings['this_acf_version'] = acf()->settings['version'];
			if ( version_compare( $this->settings['this_acf_version'], $this->settings['min_acf_version'], '<' ) ) {
				$this->kill_plugin();
			}
		}
	}

	function kill_plugin() {
		deactivate_plugins( plugin_basename( __FILE__ ) );
			if ( isset( $_GET['activate'] ) ) {
				unset( $_GET['activate'] );
			}
		add_action( 'admin_notices', array($this, 'acf_dependent_plugin_notice') );
	}

	function acf_dependent_plugin_notice() {
		echo '<div class="error"><p>' . sprintf( __('%1$s requires ACF v%2$s or higher to be installed and activated.', 'acf-extended-color-picker'), esc_html( $this->settings['plugin'] ), esc_html( $this->settings['min_acf_version'] ) ) . '</p></div>';
	}

	/**
	*  Include field type
	*/
	function include_field_types() {

		if ( class_exists('acf') ) {
			include_once('fields/acf-rgba-color-picker-v5.php');
		}

	}

}
// initialize
new dhz_acf_plugin_extended_color_picker();

// class_exists check
endif;
