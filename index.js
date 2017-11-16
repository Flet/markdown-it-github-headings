module.exports = plugin

var fs = require('fs')
var GithubSlugger = require('github-slugger')
var innertext = require('innertext')
var defaultOptions = {
  enableHeadingLinkIcons: true,
  prefixHeadingIds: true,
  prefix: 'user-content-',
  className: 'anchor',
  // shamelessly borrowed from GitHub, thanks y'all
  linkIcon: fs.readFileSync('./icon.svg').toString('utf-8')
}

function plugin (md, _opts) {
  var options = Object.assign({}, defaultOptions, _opts)

  if (!options.prefixHeadingIds) options.prefix = ''

  var slugger = new GithubSlugger()
  var Token

  md.core.ruler.push('headingLinks', function (state) {
    // save the Token constructor because we'll be building a few instances at render
    // time; that's sort of outside the intended markdown-it parsing sequence, but
    // since we have tight control over what we're creating (a link), we're safe
    if (!Token) {
      Token = state.Token
    }
  })

  md.renderer.rules.heading_open = function (tokens, idx, opts, env, self) {
    var children = tokens[idx + 1].children
    // make sure heading is not empty
    if (children && children.length) {
      // Generate an ID based on the heading's innerHTML; first, render without
      // converting gemoji strings to unicode emoji characters
      var unemojiWithToken = unemoji.bind(null, Token)
      var rendered = md.renderer.renderInline(children.map(unemojiWithToken), opts, env)
      var postfix = slugger.slug(
        innertext(rendered)
          .replace(/[<>]/g, '') // In case the heading contains `<stuff>`
          .toLowerCase() // because `slug` doesn't lowercase
      )

      // add 3 new token objects link_open, text, link_close
      var linkOpen = new Token('link_open', 'a', 1)
      var text = new Token('html_inline', '', 0)
      if (options.enableHeadingLinkIcons) {
        text.content = options.linkIcon
      }
      var linkClose = new Token('link_close', 'a', -1)

      // add some link attributes
      linkOpen.attrSet('id', options.prefix + postfix)
      linkOpen.attrSet('class', options.className)
      linkOpen.attrSet('href', '#' + postfix)
      linkOpen.attrSet('aria-hidden', 'true')

      // add new token objects as children of heading
      children.unshift(linkClose)
      children.unshift(text)
      children.unshift(linkOpen)
    }

    return md.renderer.renderToken(tokens, idx, options, env, self)
  }
}

function unemoji (TokenConstructor, token) {
  if (token.type === 'emoji') {
    return Object.assign(new TokenConstructor(), token, {content: token.markup})
  }
  return token
}
