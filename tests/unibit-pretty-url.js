import { prettyUrl } from '../src/utils';

test('Unibit pretty-url conversion', () => {
    expect(prettyUrl('index.html')).toBe('/');
    expect(prettyUrl('pages')).toBe('pages');
    expect(prettyUrl('pages/')).toBe('pages/');
    expect(prettyUrl('/pages')).toBe('/pages');
    expect(prettyUrl('/pages/')).toBe('/pages/');
    expect(prettyUrl('pages/index.html')).toBe('pages');
    expect(prettyUrl('pages/index.htm')).toBe('pages');
    expect(prettyUrl('/pages/index.html')).toBe('/pages');
    expect(prettyUrl('pages/about/index.html')).toBe('pages/about');
    expect(prettyUrl('pages/index/index.htm')).toBe('pages/index');
    expect(prettyUrl('pages/index')).toBe('pages/index');
    expect(prettyUrl('pages/index.txt')).toBe('pages/index.txt');
    expect(prettyUrl('something.html')).toBe('something');
    expect(prettyUrl('something.htm')).toBe('something');
    expect(prettyUrl('pages/something.html')).toBe('pages/something');
    expect(prettyUrl('http://app.stackbit.com/')).toBe('http://app.stackbit.com/');
    expect(prettyUrl('//app.stackbit.com')).toBe('//app.stackbit.com');
    expect(prettyUrl('//app.stackbit.com/index')).toBe('//app.stackbit.com/index');
    expect(prettyUrl('//app.stackbit.com/index.html')).toBe('//app.stackbit.com');
    expect(prettyUrl('pages/not-an-index.html')).toBe('pages/not-an-index');
    expect(prettyUrl('pages/not-an-index.txt')).toBe('pages/not-an-index.txt');
    expect(prettyUrl('pages/file.nohtml')).toBe('pages/file.nohtml');
    expect(prettyUrl('pages/file.nohtm')).toBe('pages/file.nohtm');
    expect(prettyUrl('pages/file.txt')).toBe('pages/file.txt');
});
