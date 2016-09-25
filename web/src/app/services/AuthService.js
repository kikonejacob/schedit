//
// auth
// Manages anything and everything related to 
// authorization
//

import * as $ from 'jquery';
import * as Radio from 'radio';
import * as cookies from 'cookies-js';
import 

var COOKIE_NAME = 'token';

class Auth {


  constructor(){

    Object.assign(this,{
       token: '',
       authorized: false

    });

    this.channel = Radio.channel('auth');
    this.determineLogin();
    this.configureEvents();
    this._configureAjax();
  },

  // Log us out by destroying the token
  logout() {
    cookies.expire(COOKIE_NAME);
    this.set('authorized', false);
    this.set('token', '');
    this.channel.trigger('logout');
  }

  // Determine if we're authorized based on the cookie
  determineLogin() {
    var token = cookies.get(COOKIE_NAME);

    // Set the status of our authorization
    if (token) {
      this.authorized=true;
      this.token=token;
    } else {
      this.authorized= false;
    }

    // Trigger it on the channel, and register it as a request
    this.trigger('authorize', {
      token: this.token,
      authorized: this.authorized
    });
  },

  // Register our events on the channel
  configureEvents() {
    this.channel.reply('authorized', () => {
      return this.authorized;
    });
    this.channel.reply('token', () => {
      return this.token;
    });
    this.channel.comply('logout', this.logout, this);
  },

  // Include our token in every subsequent request
  _configureAjax() {
    var self = this;
    $.ajaxSetup({
      beforeSend(jqXHR, settings) {
        if (self.authorized)) {
          jqXHR.setRequestHeader('Authorization', 'token ' + self.token));
        }
        return true;
      }
    });
  }
});

export default new Auth();