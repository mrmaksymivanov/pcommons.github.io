<?php
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

global $apiConfig;
$apiConfig = array(
    // True if objects should be returned by the service classes.
    // False if associative arrays should be returned (default behavior).
    'use_objects' => false,
  
    // The application_name is included in the User-Agent HTTP header.
    'application_name' => 'RetroTax Maps - Geo Tax Credits',
    'oauth2_client_id' => '176193785775-q3rkglcsei8uurdd4nph6uroitq6jutd.apps.googleusercontent.com',
   
/*
    // OAuth2 Settings, you can get these keys at https://code.google.com/apis/console
    'oauth2_client_id' => '346038317672-8cdqoj3hev379q572h9jee7b03ibr24p.apps.googleusercontent.com',
    'oauth2_client_secret' => 'gmGUIXww1xvkcBgbu8UR6eRe',
    'oauth2_redirect_uri' => 'http://maps.retrotax.co',

    // The developer key, you get this at https://code.google.com/apis/console
    'developer_key' => 'AIzaSyAMUWwUECY6rPcpgs-nQUc1MM8fH79uyqI',
  

    // OAuth2 Settings, you can get these keys at https://code.google.com/apis/console
    'oauth2_client_id' => '176193785775.apps.googleusercontent.com',
    'oauth2_client_secret' => 'o8XaK9bKm3MZCGiWSZjtKWhJ',
    'oauth2_redirect_uri' => 'http://maps.retrotax.co',
*/
    // The developer key, you get this at https://code.google.com/apis/console
    'developer_key' => 'AIzaSyDNOR4XNNc_M0jZ6cuXGA6djWm7BIa_jLc',
  
    // Site name to show in the Google's OAuth 1 authentication screen.
    'site_name' => 'maps.retrotax.co',

    // Which Authentication, Storage and HTTP IO classes to use.
    'authClass'    => 'Google_OAuth2',
    'ioClass'      => 'Google_CurlIO',
    'cacheClass'   => 'Google_FileCache',

    // Don't change these unless you're working against a special development or testing environment.
    'basePath' => 'https://www.googleapis.com',

    // IO Class dependent configuration, you only have to configure the values
    // for the class that was configured as the ioClass above
    'ioFileCache_directory'  =>
        (function_exists('sys_get_temp_dir') ?
            sys_get_temp_dir() . '/Google_Client' :
        '/tmp/Google_Client'),

    // Definition of service specific values like scopes, oauth token URLs, etc
    'services' => array(
      'analytics' => array('scope' => 'https://www.googleapis.com/auth/analytics.readonly'),
      'calendar' => array(
          'scope' => array(
              "https://www.googleapis.com/auth/calendar",
              "https://www.googleapis.com/auth/calendar.readonly",
          )
      ),
      'books' => array('scope' => 'https://www.googleapis.com/auth/books'),
      'latitude' => array(
          'scope' => array(
              'https://www.googleapis.com/auth/latitude.all.best',
              'https://www.googleapis.com/auth/latitude.all.city',
          )
      ),
      'moderator' => array('scope' => 'https://www.googleapis.com/auth/moderator'),
      'oauth2' => array(
          'scope' => array(
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/userinfo.email',
          )
      ),
      'plus' => array('scope' => 'https://www.googleapis.com/auth/plus.me'),
      'siteVerification' => array('scope' => 'https://www.googleapis.com/auth/siteverification'),
      'tasks' => array('scope' => 'https://www.googleapis.com/auth/tasks'),
      'urlshortener' => array('scope' => 'https://www.googleapis.com/auth/urlshortener'),
      'drive' => array('scope' => 'https://www.googleapis.com/auth/drive')
    )
);