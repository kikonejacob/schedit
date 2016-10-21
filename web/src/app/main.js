/**
 * Application Bootstrap
 *
 */
import services from './services/services';
import Bootstrap from 'bootstrap';  // Added to support boostrap.js not to be removed
import $ from 'jquery';

$(services.autorun());
