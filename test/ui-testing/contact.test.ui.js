require('chromedriver')
const expect = require('chai').expect
const test = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

test.describe('UI testing', function() {
  this.timeout(5000)
  const driver = new webdriver.Builder().forBrowser('chrome').build()

  test.it('/contacts/new should render an add contact form', function() {
    driver.get('http://localhost:8080/contacts/new')
    driver.findElement(By.id('new-contact-form'))
      .then(formEl => formEl.isDisplayed())
      .then(isformDisplayed => {
        expect(isformDisplayed).to.equal(true)
        driver.quit()
      })
  })

  test.it('when a user submits the form they should be redirected to /contacts/4', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder().forBrowser('chrome').build()

    driver.get('http://localhost:8080/contacts/new')
    driver.findElement(By.name('first_name')).sendKeys('Spencer').then(() => {
      driver.findElement(By.name('last_name')).sendKeys('Dezart-Smith').then(() => {
        driver.findElement(By.xpath('/html/body/div[1]/div/form/input')).click().then(() => {
          driver.getCurrentUrl()
            .then((url) => {
              expect(url).to.equal('http://localhost:8080/contacts/4')
              driver.quit()
            })
        })
      })
    })
  })

  test.it('/ should show the user a list of contacts', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder().forBrowser('chrome').build()

    driver.get('http://localhost:8080/')
    driver.findElements(By.className('contact-link')).then((contactLinks) => {
      expect(contactLinks.length).to.equal(4)
      driver.quit()
    })
  })

  test.it('click on delete will remove contact upon confirmation', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder().forBrowser('chrome').build()

    driver.get('http://localhost:8080/')
    driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/a[2]')).click().then(() => {
      driver.switchTo().alert().accept()
      driver.findElements(By.className('contact-link')).then((contactLinks) => {
        expect(contactLinks.length).to.equal(3)
        driver.quit()
      })
    })
  })

  test.it('searching for ne should return one contact: NeEddra James', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder().forBrowser('chrome').build()

    driver.get('http://localhost:8080')
    driver.findElement(By.name('q')).sendKeys('ne' + '\n').then(() => {
      driver.findElement(By.className('contact-link')).then((contactLink) => {
        contactLink.getText().then((text) => {
          expect(text).to.equal('NeEddra James')
          driver.quit()
        })
      })
    })
  })
})
