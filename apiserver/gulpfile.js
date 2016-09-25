var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');
});


/**
 * Determine if a letter is upper case
 * @param value The letter that need to be checked
 * @returns {boolean} True if the letter is upper case false otherwise
 */
function isUpperCase(value) {
    return value[1].match(/[A-Z]/i);
}