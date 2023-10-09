import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === 'staging'
      ? '[INTERNAL] BKMRK Bookmark Manager'
      : 'BKMRK Bookmark Manager',
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  description: "A better and faster version",
  options_page: "index.html",
  incognito: 'split',
  permissions:['tabs', 'storage', 'activeTab', 'bookmarks'],
  omnibox: {
    keyword: 'bk/'
  },
  short_name: 'bkmrk',
  author: 'stan-dot',
  action: {
    default_popup: 'index.html',
    default_title:"open the popup"
  }
}))