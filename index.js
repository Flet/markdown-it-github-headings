module.exports = plugin

const GithubSlugger = require('github-slugger')
const innertext = require('innertext')
const defaultOptions = {
  enableHeadingLinkIcons: true,
  prefixHeadingIds: true,
  prefix: 'user-content-',
  className: 'anchor',
  // shamelessly borrowed from GitHub, thanks y'all
  linkIcon: '<svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewbox="0 0 16 16" width="16"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
  resetSlugger: true
}

function plugin (md, _opts) {
  const options = Object.assign({}, defaultOptions, _opts)

  if (!options.prefixHeadingIds) options.prefix = ''

  const slugger = new GithubSlugger()
  let Token

  md.core.ruler.push('headingLinks', function (state) {
    if (options.resetSlugger) {
      slugger.reset()
    }

    // save the Token constructor because we'll be building a few instances at render
    // time; that's sort of outside the intended markdown-it parsing sequence, but
    // since we have tight control over what we're creating (a link), we're safe
    if (!Token) {
      Token = state.Token
    }
  })

  md.renderer.rules.heading_open = function (tokens, idx, opts, env, self) {
    const children = tokens[idx + 1].children
    // make sure heading is not empty
    if (children && children.length) {
      // Generate an ID based on the heading's innerHTML; first, render without
      // converting gemoji strings to unicode emoji characters
      const unemojiWithToken = unemoji.bind(null, Token)
      const rendered = md.renderer.renderInline(children.map(unemojiWithToken), opts, env)
      const postfix = slugger.slug(
        innertext(rendered)
          .replace(/[<>]/g, '') // In case the heading contains `<stuff>`
          .toLowerCase() // because `slug` doesn't lowercase
      )

      // add 3 new token objects link_open, text, link_close
      const linkOpen = new Token('link_open', 'a', 1)
      const text = new Token('html_inline', '', 0)
      if (options.enableHeadingLinkIcons) {
        text.content = options.linkIcon
      }
      const linkClose = new Token('link_close', 'a', -1)

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
    return Object.assign(new TokenConstructor(), token, { content: token.markup })
  }
  return token
}
