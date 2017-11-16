# markdown-it-github-headings

Add GitHub style anchor tags to headers

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/markdown-it-github-headings.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/markdown-it-github-headings
[travis-image]: https://img.shields.io/travis/Flet/markdown-it-github-headings.svg?style=flat-square
[travis-url]: https://travis-ci.org/Flet/markdown-it-github-headings
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install markdown-it-github-headings
```

## Usage

```js
var md = require('markdown-it')()
  .use(require('markdown-it-github-headings'), options)

```

## Options and Defaults

The defaults will make the heading anchors behave as close to how GitHub behaves as possible.

Name              | Description                                                    | Default
------------------|----------------------------------------------------------------|-----------------------------------
`className`                     | name of the class that will be added to the anchor tag               | `anchor`
`prefixHeadingIds`              | add a prefix to each heading ID. *(see security note below)*         | `true`
`prefix`                        | if `prefixHeadingIds` is true, use this string to prefix each ID.    | `user-content-`
`enableHeadingLinkIcons`        | Adds the icon <img src="icon.svg"/> next to each heading | `true`
`linkIcon`                      | If `enableHeadingLinkIcons` is true, use this to supply a custom icon (or anything really) | <img src="icon.svg"/>

## Why should I prefix heading IDs?
When using user generated content, its possible to run into **DOM Clobbering** when heading IDs are generated. Since IDs are used by JavaScript and CSS, a user could craft a page that breaks functionality or styles. A good way to avoid clobbering is to add a prefix to every generated ID to ensure they cannot overlap with existing IDs.

If you have full control over the content, there is less of a risk, but be aware that strange bugs related to DOM Clobbering are still possible!

For more information, here are some good resources on the topic:
- [User-generated content and DOM clobbering](http://opensoul.org/2014/09/05/dom-clobbering/)
- [In the DOM, no one will hear you scream](https://www.slideshare.net/x00mario/in-the-dom-no-one-will-hear-you-scream)
- [A discussion about GitHub implementation](https://github.com/jch/html-pipeline/pull/111#issuecomment-34369984)
- [An open issue on markdown-it repo](https://github.com/markdown-it/markdown-it/issues/28)

### But the prefixes make links look real gross.
One solution is to write some client side JavaScript to force non-prefixed hashes to jump to prefixed anchors. This is how its handled on GitHub and npmjs.com.

Check out [marky-deep-links](https://github.com/Flet/marky-deep-links) for an example (works great with browserify or webpack).


## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
