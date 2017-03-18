import { BagitPage } from './app.po';

describe('bagit App', () => {
  let page: BagitPage;

  beforeEach(() => {
    page = new BagitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
