const Unibit = require('../src/unibit');
const pageContext = require('./mocks/pageContext.mock.json')
const unibit = new Unibit();

describe('getPage', ()=>{
    it('gets a page by url', () => {
        let page = unibit.getPage(pageContext, 'about');
        expect(page).toBe(pageContext.site.pages[0]);
    });
    it('should not work with file paths', () => {
        let page = unibit.getPage(pageContext, 'about.md');
        expect(page).toBeUndefined();
    });
})

describe('getPages', ()=>{
    const pageContext = require('./mocks/pageContext.mock.json')
    it('gets pages from folder', () => {
        let pages = unibit.getPages(pageContext, 'features/');
        expect(pages).toStrictEqual([pageContext.site.pages[1], pageContext.site.pages[2], pageContext.site.pages[3]]);
    });
    it('returns empty array if not found', () => {
        let pages = unibit.getPages(pageContext, 'fake/');
        expect(pages).toStrictEqual([]);
    });
})

describe('getData', ()=>{
    const pageContext = require('./mocks/pageContext.mock.json')
    it('gets data from data file', () => {
        let data = unibit.getData(pageContext, 'data/links/ssg');
        expect(data).toBe(pageContext.site.data.links.ssg);
    });

    it('returns null if not found', () => {
        let data = unibit.getData(pageContext, 'data/links/fake');
        expect(data).toBeNull();

        data = unibit.getData(pageContext, 'data/fake');
        expect(data).toBeNull();
    });
})

describe('getPageByReference', ()=>{
    const pageContext = require('./mocks/pageContext.mock.json')
    it('gets a page by path', () => {
        let data = unibit.getPageByReference(pageContext, 'features/feature1.md');
        expect(data).toBe(pageContext.site.pages[1]);
    });

    it('gets a page by url', () => {
        let data = unibit.getPageByReference(pageContext, 'features/feature1');
        expect(data).toBe(pageContext.site.pages[1]);
    });
})
