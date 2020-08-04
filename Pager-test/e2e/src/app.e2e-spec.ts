import { AppPage } from './app.po';
import { browser, logging, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppComponent } from '../../src/app/app.component';
import { PagerModule } from '@progress/kendo-angular-pager';

const expectedH1 = 'Top European Destinations';
const expectedTitle = `${expectedH1}`;
const pageSize = 7;
const skip = 0 + pageSize;
const totalDestinations = 23;
const destinationDataExample = {
        destinationId: 13,
        destinationName: `SEVILLE, SPAIN`,
        destinationText: `Seville. Any time of year…`};


describe('Pager-test first tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    //Clear session storage
    browser.get('');
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');

  });

  it('should have a title', function() {
    browser.get('');
    expect(browser.getTitle()).toEqual('Pager-test');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('E2E tests', () => {
  
  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('my-app'));
    //map all needed page elements
    return {
      navElts: navElts,

      dataCompHref: navElts.get(0),

      dataComp: element(by.css('.wrapper')),
      dataTitle: element(by.css('.title')),
      contContainer: element(by.css('.content-container')), 
      destComp: element.all(by.css('.content-container > destination-component')),
      divComp: element(by.xpath('/html/body/my-app/div/div/destination-component[6]/div')),
      destImg: element(by.xpath('/html/body/my-app/div/div/destination-component[6]/div/img')),
      destName: element(by.xpath('/html/body/my-app/div/div/destination-component[6]/div/h3')),
      destText: element(by.xpath('/html/body/my-app/div/div/destination-component[6]/div/p')),

      kendoComp: element(by.css('.k-pager-wrap')),
      kendoPrevButtons: element.all(by.css('.k-pager-wrap > kendo-datapager-prev-buttons')),
      kendoFirstPagebutton: element(by.xpath('/html/body/my-app/div/kendo-datapager/kendo-datapager-prev-buttons/button[1]')),
      kendoPreviousPagebutton: element(by.xpath('/html/body/my-app/div/kendo-datapager/kendo-datapager-prev-buttons/button[2]')),

      kendoNumericWrap: element(by.css('.k-pager-numbers-wrap')),
      kendoNumericButtonsSelected: element(by.css('button.k-state-selected')),
      kendoNumericButtons: element.all(by.css('.k-pager-numbers > li')),

      kendoNextButtons: element.all(by.css('.k-pager-wrap > kendo-datapager-next-buttons')),
      kendoNextPagebutton: element(by.xpath('/html/body/my-app/div/kendo-datapager/kendo-datapager-next-buttons/button[1]')),
      kendoLastPagebutton: element(by.xpath('/html/body/my-app/div/kendo-datapager/kendo-datapager-next-buttons/button[2]')),

      kendoInfo: element(by.css('.k-pager-info')),
      kendoSizeList: element(by.css('.k-pager-sizes')),

      kendoDropDownlist: element(by.css('kendo-dropdownlist.k-widget')),
      kendoDropDownSelected: element(by.className('k-input')),
      kendoDropDownAll: element(by.className('k-input > li'))

    };
  }

  describe('Initial page', () => {
    //is the element properly rendered on the page
    it(`has title '${expectedTitle}'`, () => {
      let page = getPageElts();
      expect(page.dataTitle.getText()).toEqual(expectedTitle.toUpperCase());
    });
    //is the element properly rendered on the page
    it('has Content Container component on the page', () => {
      let page = getPageElts();
      expect(page.contContainer.isPresent()).toBeTruthy();
    });
    //is the element properly rendered on the page
    it('has kendoUI pager component on the page', () => {
      let page = getPageElts();
      expect(page.kendoComp.isPresent()).toBeTruthy();
    });
  });

  describe('Content Container', () => {
    //Check if the correct amount of items are displayed
    it(`has '${pageSize}' destinations displayed`, () => {
      let page = getPageElts();
      expect(page.destComp.count()).toEqual(pageSize);
    });
    //check if the correct amount of data is used
    it(`has '${totalDestinations}' total destinations displayed`, () => {
      let page = getPageElts();
      let totalPages = Math.ceil(totalDestinations / pageSize);
      let lastPageCount = totalDestinations - (pageSize * (totalPages - 1));
      for (var i = 1; i < totalPages; i++) {
        element(by.buttonText(i.toString())).click();
        browser.waitForAngular();

        expect(page.destComp.count()).toEqual(pageSize);
      }
      element(by.buttonText(totalPages.toString())).click();
      expect(page.destComp.count()).toEqual(lastPageCount);

    });
    //check if the data rendered is correct for each destination
    it(`is destination component data displayed correctly`, () => {
      let page = getPageElts();
      element(by.buttonText('2')).click();
      browser.waitForAngular();
      expect(page.destName.getText()).toEqual(destinationDataExample.destinationName);
      expect(page.destText.getText()).toEqual(destinationDataExample.destinationText);
    });
    //check if the data rendered is styled in accordance with the styles in the pager component and styles.css
    it(`is destination component data styled correctly`, () => {
      let page = getPageElts();
      element(by.buttonText('2')).click();
      browser.waitForAngular();
      //container styles
      expect(page.divComp.getCssValue('width')).toBe('170px');
      expect(page.divComp.getCssValue('height')).toBe('230px');
      expect(page.divComp.getCssValue('margin-left')).toBe('10px');
      //img styles
      expect(page.destImg.getCssValue('width')).toBe('160px');
      expect(page.destImg.getCssValue('height')).toBe('150px');
      expect(page.destImg.getCssValue('margin-bottom')).toBe('10px');
      //destination header styles
      expect(page.destName.getCssValue('margin')).toBe('0px');
      expect(page.destName.getCssValue('overflow')).toContain('hidden');
      //700  Bold
      expect(page.destName.getCssValue('font-weight')).toContain('700');
      expect(page.destName.getCssValue('text-transform')).toContain('uppercase');
      //rgb(101,101,101) = #656565
      expect(page.destName.getCssValue('color')).toContain('rgba(101, 101, 101, 1)');
      
    });

  });

  describe('Pager component', () => {
    beforeAll(() => browser.get(''));
    //Check if the component/widget is displayed properly
    it('Is pager component rendering all its elements', () => {
      let page = getPageElts();
      expect(page.kendoFirstPagebutton.isPresent()).toBeTruthy();
      expect(page.kendoPreviousPagebutton.isPresent()).toBeTruthy();
      expect(page.kendoNumericWrap.isPresent()).toBeTruthy();
      expect(page.kendoNextPagebutton.isPresent()).toBeTruthy();
      expect(page.kendoLastPagebutton.isPresent()).toBeTruthy();
      expect(page.kendoInfo.isPresent()).toBeTruthy();
      expect(page.kendoSizeList.isPresent()).toBeTruthy();
    });
    //check all buttons in the widget, starting with first page
    it('Is first page button working properly', () => {
      let page = getPageElts();
      element(by.buttonText('2')).click();
      browser.waitForAngular();
      page.kendoFirstPagebutton.click();
      browser.waitForAngular();
      expect(page.kendoNumericButtonsSelected.getText()).toEqual('1');      
    });
    //previous page button test
    it('Is previous page button working properly', () => {
      let page = getPageElts();
      element(by.buttonText('3')).click();
      browser.waitForAngular();
      page.kendoPreviousPagebutton.click();
      browser.waitForAngular();
      expect(page.kendoNumericButtonsSelected.getText()).toEqual('2');      
    });
    //numeric buttons test
    it('Are numeric buttons displayed properly', () => {
      let page = getPageElts();
      let totalPages = Math.ceil(totalDestinations / pageSize);
      expect(page.kendoNumericButtons.count()).toEqual(totalPages);            
    });
    //next button test
    it('Is next page button working properly', () => {
      let page = getPageElts();
      element(by.buttonText('2')).click();
      browser.waitForAngular();
      page.kendoNextPagebutton.click();
      browser.waitForAngular();
      expect(page.kendoNumericButtonsSelected.getText()).toEqual('3');      
    });

    it('Is last page button working properly', () => {
      let page = getPageElts();
      element(by.buttonText('2')).click();
      browser.waitForAngular();
      page.kendoLastPagebutton.click();
      browser.waitForAngular();
      expect(page.kendoNumericButtonsSelected.getText()).toEqual('4');      
    });
    // check if the custom page size is seelcted in the drop down menu
    it(`Is drop down list containing'${pageSize}' option`, () => {
      let page = getPageElts();
      expect(page.kendoDropDownSelected.getText()).toEqual(pageSize.toString());
    });

    it(`Is drop down list working`, () => {
      let page = getPageElts();
      page.kendoDropDownlist.click();
      browser.waitForAngular();
      browser.sleep(5000);
    });

    //Trying to click on the drop down list elements, to verify logic
    //But i don't know how to click on them and google is not helping me...
    //i click on the list itself but can't really identify the elements in any way
    /*
    it(`Is drop down page change working`, () => {
      let page = getPageElts();
      page.kendoDropDownlist.click();
      browser.waitForAngular();
      browser.sleep(5000);
    });
    */

  });

});