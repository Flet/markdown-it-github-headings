var test = require('tape')

const md = require('markdown-it')
const anchor = require('..')
const fs = require('fs')
const path = require('path')
const svg = fs.readFileSync(path.join(__dirname, '../icon.svg')).toString('utf8')

test('works as expected', function (t) {
  var result = md().use(anchor).render('# Hello')
  var expectedResult = `<h1><a id="user-content-hello" class="anchor" href="#hello" aria-hidden="true">${svg}</a>Hello</h1>\n`
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('multiple headers', function (t) {
  var input = `
## Hello
### World
`

  var expectedResult = `<h2><a id="user-content-hello" class="anchor" href="#hello" aria-hidden="true">${svg}</a>Hello</h2>
<h3><a id="user-content-world" class="anchor" href="#world" aria-hidden="true">${svg}</a>World</h3>
`
  var result = md().use(anchor).render(input)
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('duplicate headers', function (t) {
  var input = `
# Hello
## Hello
### Hello
`

  var expectedResult = `<h1><a id="user-content-hello" class="anchor" href="#hello" aria-hidden="true">${svg}</a>Hello</h1>
<h2><a id="user-content-hello-1" class="anchor" href="#hello-1" aria-hidden="true">${svg}</a>Hello</h2>
<h3><a id="user-content-hello-2" class="anchor" href="#hello-2" aria-hidden="true">${svg}</a>Hello</h3>
`
  var result = md().use(anchor).render(input)
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('prefix: foo-', function (t) {
  var result = md().use(anchor, {prefix: 'foo-'}).render('# Hello')
  var expectedResult = `<h1><a id="foo-hello" class="anchor" href="#hello" aria-hidden="true">${svg}</a>Hello</h1>\n`
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('prefixHeadingIds: false', function (t) {
  var result = md().use(anchor, {prefixHeadingIds: false}).render('# Hello')
  var expectedResult = `<h1><a id="hello" class="anchor" href="#hello" aria-hidden="true">${svg}</a>Hello</h1>\n`
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('enableHeadingLinkIcons: false', function (t) {
  var result = md().use(anchor, {enableHeadingLinkIcons: false}).render('# Hello')
  var expectedResult = `<h1><a id="user-content-hello" class="anchor" href="#hello" aria-hidden="true"></a>Hello</h1>\n`
  t.equals(result, expectedResult, 'works')
  t.end()
})

test('custom linkIcon', function (t) {
  const customContents = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8"><path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z"></path></svg><img/><h1>Hello<span><span>World</span></span></h1>`
  var result = md().use(anchor, {linkIcon: customContents}).render('# Hello')
  var expectedResult = `<h1><a id="user-content-hello" class="anchor" href="#hello" aria-hidden="true">${customContents}</a>Hello</h1>\n`
  t.equals(result, expectedResult, 'works')
  t.end()
})
