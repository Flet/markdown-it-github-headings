declare module 'markdown-it-github-headings' {
  import type { PluginWithOptions } from 'markdown-it';
  type GithubHeadingsPluginOptions = {
    /**
     * Name of the class that will be added to the anchor tag.
     * @default "anchor"
     */
    className?: string;
    /**
     * Add a prefix to each heading ID.
     * @see https://github.com/Flet/markdown-it-github-headings#why-should-i-prefix-heading-ids
     * @default true
     */
    prefixHeadingIds?: boolean;
    /**
     * If `prefixHeadingIds` is true, use this string to prefix each ID.
     * @default "user-content"
     */
    prefix?: string;
    /**
     * Adds the icon next to each heading.
     * @default true
     */
    enableHeadingLinkIcons?: boolean;
    /**
     * If `enableHeadingLinkIcons` is true, use this to supply a custom icon (or anything really).
     */
    linkIcon?: string;
    /**
     * Reset the slugger counter between .render calls for duplicate headers. (See tests for example).
     * @default true
     */
    resetSlugger?: boolean;
  };
  const markdownItGithubHeadings: PluginWithOptions<GithubHeadingsPluginOptions>;
  export = markdownItGithubHeadings;
}
