const Unibit = require('../src/unibit');
const unibit = new Unibit();

const aboutPage = {
    "relPath": "about.md",
    "url": "about/",
}
const feature1Page = {
    "relPath": "features/feature1.md",
    "url": "features/feature1/",
};
const feature2Page = {
    "relPath": "features/feature2.md",
    "url": "features/feature2/",
};

const linksSSGData = [
    {
        "title": "Jekyll",
        "url": "https://jekyllrb.com"
    },
    {
        "title": "Hugo",
        "url": "https://gohugo.io"
    },
    {
        "title": "Gatsby",
        "url": "https://www.gatsbyjs.org"
    }
]
const linksData = {
    "links": {
        "ssg": linksSSGData
    }
}

const pageContext = {
    site: {
        data: {
            ...linksData
        },
        pages: [aboutPage, feature1Page, feature2Page]
    }
}

describe('getPage', ()=>{
    it('gets a page by url', () => {
        let page = unibit.getPage(pageContext, 'about');
        expect(page).toBe(aboutPage);

        page = unibit.getPage(pageContext, '/about');
        expect(page).toBe(aboutPage);

        page = unibit.getPage(pageContext, '/about/');
        expect(page).toBe(aboutPage);

        page = unibit.getPage(pageContext, 'about/');
        expect(page).toBe(aboutPage);

    });
    it('should not work with file paths', () => {
        let page = unibit.getPage(pageContext, 'about.md');
        expect(page).toBeUndefined();
    });
})

describe('getPages', ()=>{
    it('gets pages from folder', () => {
        let pages = unibit.getPages(pageContext, 'features/');
        expect(pages).toStrictEqual([feature1Page, feature2Page]);
    });
    it('returns empty array if not found', () => {
        let pages = unibit.getPages(pageContext, 'fake/');
        expect(pages).toStrictEqual([]);
    });
})

describe('getData', ()=>{
    it('gets data from data file', () => {
        let data = unibit.getData(pageContext, 'data/links/ssg');
        expect(data).toBe(linksSSGData);
    });

    it('returns null if not found', () => {
        let data = unibit.getData(pageContext, 'data/links/fake');
        expect(data).toBeNull();

        data = unibit.getData(pageContext, 'data/fake');
        expect(data).toBeNull();
    });
})

describe('getPageByFilePath', ()=>{
    it('gets a page by path', () => {
        let data = unibit.getPageByFilePath(pageContext, 'content/features/feature1.md');
        expect(data).toBe(feature1Page);
    });

    it('should not work with urls', () => {
        let data = unibit.getPageByFilePath(pageContext, 'content/features/feature1');
        expect(data).toBeUndefined();
    });
})
