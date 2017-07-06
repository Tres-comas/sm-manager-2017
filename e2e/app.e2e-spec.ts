import { SmManagerPage } from './app.po';

describe('sm-manager App', () => {
  let page: SmManagerPage;

  beforeEach(() => {
    page = new SmManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
