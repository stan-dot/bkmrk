
# done

this before build
https://blog.logrocket.com/creating-chrome-extension-react-typescript/

but don't need content scripts


add body to contain width and height in css
https://developer.chrome.com/docs/extensions/mv3/override/


# todo
overriding the bookmarks page

  "chrome_url_overrides" : {
    "PAGE_TO_OVERRIDE": "myPage.html"
  },

  https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/examples/bookmarks

  https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/examples/bookmarks/popup.js



commands for shortucts
https://developer.chrome.com/docs/extensions/reference/commands/


externally connecteable
to talk to specific websites, might be useful
https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage


### later features
- [ ] path available in the table
- [ ] can copy the path anytime
- [ ] link preview
- [ ] alphabetic sorting, or by date, or tags(?). these could be as keywords inside the title tbh
- [ ] automatic grouping of bookmarks?
- [ ] automatic cutting of tracing links ( need to read more about this one)
- [ ] maybe some sort of similarity view, like Obsidian visualization algorithm...

## notes on link preview
the place it's working in is social media, and google docs
https://workspaceupdates.googleblog.com/2020/08/docs-mobile-link-previews-smart-compose.html
https://stackoverflow.com/questions/62728331/how-do-google-docs-bubble-cards-link-preview-unfurl-external-resource-inside

https://thetrevorharmon.com/blog/a-developers-guide-to-the-open-graph-protocol


maybe with Rust WASM
https://blog.logrocket.com/web-scraping-rust/#be-good-citizen-writing-web-scraper

manual requesting
https://stackoverflow.com/questions/44763985/fetch-only-headers-of-a-get-request-in-node

# bin from manifest
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "start_url": ".",