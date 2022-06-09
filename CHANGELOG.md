# markdown-it-github-headings change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## 2.0.1 2022-06-09

 - Add TypeScript Declaration #19 Thank you [@ashaifarhan](https://github.com/ashalfarhan) for contributing!
 - Updated dev dependencies to squelch audit warnings.

## 2.0.0 2020-01-14

  - BREAKING: add resetSlugger option and default to true
    - This change avoids needlessly incrementing the duplicate slug counter between .render() calls. It is now the default behavior.
    - set the option `resetSlugger` to `false` to switch back to the old behavior if desired.

## 1.1.2 2019-09-23

  - Update dependencies per `npm audit`

## 1.1.1 2018-02-27

  - Removed dependency on `fs` for browser compatibility. Thanks [@imcuttle](https://github.com/imcuttle)!

# 1.1.0 2017-11-18
  - Added option to allow a custom svg icon for links (Thanks @adam-lynch!).

## 1.0.0 2017-04-28

Released!
