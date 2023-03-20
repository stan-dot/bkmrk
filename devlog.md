
# 28.09.2022
## notes on link preview
- [ ] link preview
the place it's working in is social media, and google docs
https://workspaceupdates.googleblog.com/2020/08/docs-mobile-link-previews-smart-compose.html
https://stackoverflow.com/questions/62728331/how-do-google-docs-bubble-cards-link-preview-unfurl-external-resource-inside

https://thetrevorharmon.com/blog/a-developers-guide-to-the-open-graph-protocol

maybe with Rust WASM
https://blog.logrocket.com/web-scraping-rust/#be-good-citizen-writing-web-scraper

manual requesting
https://stackoverflow.com/questions/44763985/fetch-only-headers-of-a-get-request-in-node


## termination of the link preview
https://stackoverflow.com/questions/50949594/axios-having-cors-issue

this is about security and CORS would be persistent.
could theoretically do this, with some microbackend and 


# 16.03.2023
struggle with regex

# 20.03.2023

## refactor

# MVP
- [x] done API
- [x] add proper menus on context
https://www.w3schools.com/html/html5_draganddrop.asp
browser provides the image for dragging
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- [x] solve the selection bit
- [x] fix search bookmarks field positioning
- [x] a 'undo' popup in the left bottom corner

- [x] fix the issue with 'add new bookmark' alert
- [x] fix the issue with 'add new folder' alert
- [x] make the settings alert
- [x] history context for back and forward arrows. history is a queue?
- [x] context for basic nodes - language independent

### bug fixes
- [x] fix the click does not work right with double click but right with context click
- [x] fix the broken alerts and context menus
- [x] fix the starting root - make it disappear
- [x] fix the side bar no context menu
- [x] wrong row gets targeted for any changes
- [x] side subtree gets error on deletion. also the erroneous state with 0 is preserved for far too long. cannot read properties of undefined props.node
- [x] download excludes urls
- [x] make the loading screen nicer. maybe with a loading bar?

### recently done
- [x] split global tree into context, with callbacks
- [x] add table context menu not only on left click, but also button - need to simplify the getData and column creation utilities

### decided against
do rows as lower level container

### reaction to changes considerations
options
bookmark changes in the current folder
bookmark changes outside of the current view
bookmark changes upstream in the path
bookmark changes completely elsewhere, like on a different tab

things that need to change
current rows. rows appears completely downstream from the path
current path
loaded status?
global tree - complex, it changes, but only folders changes matter, the numbers should update too though

todo maybe simplify with reducer, with diff actions for all of these
