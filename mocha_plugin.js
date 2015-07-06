/*
mocha -R spec mocha_plugin.js --server= 

*/

/*Set Global Variables */
var url,server,browser,os,dev,browserVersion,username,password=null;

/*Get Required Libs */
var assert = require('assert'), 
fs =         require('fs'), 
should = require('should'),
//webdriver =  require('browserstack-webdriver'), 
plugin =       require('plugin.js');  //node_modules/plugin.js

var driver;
//console.log(pluginConfig);
//console.log(plugin); 
webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
    fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
      if(err) throw err;
    });
  })
};


describe('plugin', function() {
  this.timeout(900000);
  

  before(function(done) {
    var capabilities = {
      'build' : 'Beta',
      'project' : 'Plugin',
      'platform': pluginConfig.platform,
      'browserName' : pluginConfig.browser, 
      'browserVersion':pluginConfig.browserVersion,
      'browserstack.user' : 'paulcommons',
      'browserstack.key' : '65VD4KEAKkQdjh1uEaoh',
      'browserstack.debug' : 'true',
      'acceptSslCerts' : 'true',
      'resolution': pluginConfig.resolution
    }



    driver = new webdriver.Builder().
    usingServer(pluginConfig.server).
    withCapabilities(capabilities).
    build();
    done();
  });
  
/*
  it('should open the plugin', function(done) {
    plugin.goQ1(driver, function() {
      //console.log(result);
      driver.getCurrentUrl().then(function(currentUrl) {
        console.log(currentUrl);
        if(pluginConfig.url+'/employees/question1' !== currentUrl) throw "Not reach Q1";
        done();
      });
    }); 
 });
*/
/*
  it('should get iframe', function(done) {
    driver.get('http://plugin.retrotax-aci.com/');
    //NEED TO CLEAR INPUT VALUE BEFORE INSERTING ANYTHIN
    driver.findElement(webdriver.By.name('apikey')).clear();
    driver.findElement(webdriver.By.name('apikey')).sendKeys(pluginConfig.apikey);
    //driver.findElement(webdriver.By.name('authorization_code')).sendKeys('51DB13');
    //driver.findElement(webdriver.By.name('framework')).clear();
    //driver.findElement(webdriver.By.name('framework')).sendKeys('bootstrap');
    driver.findElement(webdriver.By.id('retrotax_plugin_trigger')).click();
    setTimeout(function() { 
        driver.switchTo().frame("_bftn_iframe");
         setTimeout(function() {
            driver.findElement(webdriver.By.id('lastname')).sendKeys('Your Address Name');
            driver.findElement(webdriver.By.id('firstname')).sendKeys('Your Last Name');

            driver.isElementPresent(webdriver.By.id('lastname'))
            //isDisplayed()
            driver.saveScreenshot('tests/screenshots/'+Math.floor(Date.now() / 1000)+'plugin.png');
          }, 3000);
    }, 20000); //20 secs 
  });
*/
  it('should get iframe', function(done) {
    driver.get('http://plugin.retrotax-aci.com/');
    driver.findElement(webdriver.By.name('apikey')).clear();
    driver.findElement(webdriver.By.name('apikey')).sendKeys(pluginConfig.apikey);
    driver.findElement(webdriver.By.name('hide_fields')).clear();
    driver.findElement(webdriver.By.name('hide_fields')).sendKeys('true');
    driver.findElement(webdriver.By.name('first_name')).clear();
    driver.findElement(webdriver.By.name('first_name')).sendKeys('Test First Name');
    driver.findElement(webdriver.By.id('retrotax_plugin_trigger')).click();
    setTimeout(function() { 
        driver.switchTo().frame("_bftn_iframe");
         setTimeout(function() {
            var isPresent=driver.isElementPresent(webdriver.By.id('firstname'));
            console.log(isPresent);
            var isShown=driver.isDisplayed(webdriver.By.id('firstname'));
            isPresent.is.exactly(true);
            isShown.is.exactly(false);
            //driver.saveScreenshot('tests/screenshots/'+Math.floor(Date.now() / 1000)+'plugin.png');
          }, 3000);
    }, 20000); //20 secs 
  });
/*
  it('should go to question 3', function(done) {
    plugin.goQ3(driver, function() {
      driver.getCurrentUrl().then(function(currentUrl) {
        console.log(currentUrl);
        if(pluginConfig.url+'/employees/question3' !== currentUrl) throw "Not reach Q3";
        done();
      });
    }); 
  });
*/
/*
  it('should successfully create rehire application', function(done) {
    plugin.goQ3(driver, function() {
      driver.getCurrentUrl().then(function(currentUrl) {
        console.log(currentUrl);
        if(pluginConfig.url+'/employees/question3' !== currentUrl) throw "Not reach Q3";
        done();
      });
    }); 
  });
*/
 
  after(function(done) { driver.quit(); done();});
});

