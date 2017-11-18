var test = require('tape')

const md = require('markdown-it')
const anchor = require('..')
const svg = anchor.svgLinkIconText

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
