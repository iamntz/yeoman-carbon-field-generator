<?php
use Carbon_Fields\Carbon_Fields;
use <%= FIELD_NAMESPACE %>\<%= FIELD_NAME_CLASS_PHP %>;

define( '<%= FIELD_NAME_PHP_PATH %>', __DIR__ );

Carbon_Fields::extend( <%= FIELD_NAME_CLASS_PHP %>::class, function( $container ) {
	return new <%= FIELD_NAME_CLASS_PHP %>( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
} );
