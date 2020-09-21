const Unibit = require('../src/unibit');
const unibit = new Unibit();

const aboutPage = {
    "absPath": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content/about.md",
    "relPath": "about.md",
    "absDir": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content",
    "relDir": "",
    "url": "about/",
    "basename": "about.md",
    "filename": "about"
}
const feature1Page = {
    "absPath": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content/features/feature1.md",
    "relPath": "features/feature1.md",
    "absDir": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content/features",
    "relDir": "features",
    "url": "features/feature1/",
    "basename": "feature1.md",
    "filename": "feature1"
};
const feature2Page = {
    "absPath": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content/features/feature2.md",
    "relPath": "features/feature2.md",
    "absDir": "/Users/rodik/Work/Stackbit/project-repos/unibit/sample/unibit-universal/content/features",
    "relDir": "features",
    "url": "features/feature2/",
    "basename": "feature2.md",
    "filename": "feature2"
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
        let data = unibit.getPageByFilePath(pageContext, 'features/feature1.md');
        expect(data).toBe(feature1Page);
    });

    it('gets a page by url', () => {
        let data = unibit.getPageByFilePath(pageContext, 'features/feature1');
        expect(data).toBe(feature1Page);
    });
})
