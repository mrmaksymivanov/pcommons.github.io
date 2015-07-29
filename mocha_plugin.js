/*
mocha -R spec mocha_plugin.js --server= 

*/

/*Set Global Variables */
var url,server,browser,os,dev,browserVersion,username,password=null;

/*Get Required Libs */
var assert = require('assert'), 
fs =         require('fs'), 
expect =     require('chai').expect,
plugin =     require('plugin.js');  //node_modules/plugin.js

var driver;

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
/*
  it('should supply first name in form and not display firstname field in iframe', function(done) {
    driver.get('http://plugin.retrotax-aci.com/');
    driver.findElement(webdriver.By.name('apikey')).clear();
    driver.findElement(webdriver.By.name('apikey')).sendKeys(pluginConfig.apikey);
    driver.findElement(webdriver.By.name('hide_fields')).clear();
    driver.findElement(webdriver.By.name('hide_fields')).sendKeys('true');
    driver.findElement(webdriver.By.name('first_name')).clear();
    driver.findElement(webdriver.By.name('first_name')).sendKeys('Testing');
    driver.findElement(webdriver.By.id('retrotax_plugin_trigger')).click();
    setTimeout(function() { 
        driver.switchTo().frame("_bftn_iframe");
         setTimeout(function() {
            driver.isElementPresent(webdriver.By.id('firstname'));
            driver.findElement(webdriver.By.id('firstname')).isDisplayed().then(function(bool){
                expect(bool).to.be.false;        
                if(bool){
                  driver.saveScreenshot('tests/screenshots/'+Math.floor(Date.now() / 1000)+'plugin.png');
                  setTimeout(function() { done();}, 3000);
                }else{
                  done();
                }
            });
          }, 3000);
    }, 20000); //20 secs 
  });

  it('should supply last name in form and not display lastname field in iframe', function(done) {
    driver.get('http://plugin.retrotax-aci.com/');
    driver.findElement(webdriver.By.name('apikey')).clear();
    driver.findElement(webdriver.By.name('apikey')).sendKeys(pluginConfig.apikey);
    driver.findElement(webdriver.By.name('hide_fields')).clear();
    driver.findElement(webdriver.By.name('hide_fields')).sendKeys('true');
    driver.findElement(webdriver.By.name('last_name')).clear();
    driver.findElement(webdriver.By.name('last_name')).sendKeys('Testing');
    driver.findElement(webdriver.By.id('retrotax_plugin_trigger')).click();
    setTimeout(function() { 
        driver.switchTo().frame("_bftn_iframe");
         setTimeout(function() {
            driver.isElementPresent(webdriver.By.id('lastname'));
            driver.findElement(webdriver.By.id('lastname')).isDisplayed().then(function(bool){       
                expect(bool).to.be.false;        
                if(bool){
                  driver.saveScreenshot('tests/screenshots/'+Math.floor(Date.now() / 1000)+'plugin.png');
                  setTimeout(function() { done();}, 3000);
                }else{
                  done();
                }
            });
          }, 3000);
    }, 20000); //20 secs 
  });
*/
  it('should supply address name in form and not display address OR address2 field in iframe', function(done) {
    driver.get('http://plugin.retrotax-aci.com/');
    driver.findElement(webdriver.By.name('apikey')).clear();
    driver.findElement(webdriver.By.name('apikey')).sendKeys(pluginConfig.apikey);
    driver.findElement(webdriver.By.name('hide_fields')).clear();
    driver.findElement(webdriver.By.name('hide_fields')).sendKeys('true');
    driver.findElement(webdriver.By.name('last_name')).clear();
    driver.findElement(webdriver.By.name('last_name')).sendKeys('Testing');
    driver.findElement(webdriver.By.id('retrotax_plugin_trigger')).click();
    setTimeout(function() { 
        driver.switchTo().frame("_bftn_iframe");
         setTimeout(function() {
            driver.findElement(webdriver.By.id('lastname')).isDisplayed().then(function(bool){       
                expect(bool).to.be.false;        
                if(bool){
                  driver.saveScreenshot('tests/screenshots/'+Math.floor(Date.now() / 1000)+'plugin.png');
                  setTimeout(function() { done();}, 3000);
                }else{
                  done();
                }
            });
          }, 3000);
    }, 20000); //20 secs 
  });
 
  after(function(done) { driver.quit(); done();});
});

//TODO: sethide_fields to true and set a value in first_name field and it should not be displayed
//TODO: sethide_fields to true and set a value in city field and it should not be displayed
//TODO: sethide_fields to true and set a value in state field and it should not be displayed
//TODO: sethide_fields to true and set a value in zip field and it should not be displayed
//TODO: sethide_fields to true and set a value in address field and it (and address2) should not be displayed
//TODO: sethide_fields to true and set a value in dob field and it should not be displayed

//TODO: repeat all of the above but set framework to 'bootstrap', not the default 'material-design'

//TODO: set rehire to true and question section should not be displayed

//TODO: set plugin_type to ats - authorization section and hiring manager section should NOT be displayed
//TODO: set plugin_type to obs - authorization section and hiring manager section should be displayed