
### basic features
- [x] display some table
- [x] load bookmarks
- [x] column grouping https://glideapps.github.io/glide-data-grid/?path=/story/glide-data-grid-docs--column-grouping
- [x] path available above the table, copiable
- [x] can copy the path anytime
- [x] general layout - should be very similar to the original; will be able to use absolute positioning
- [ ] tree to navigate on the left with navigation changes
- [ ] add display children prop to side tree element


## done bug fixes
- [x] console.log(date.toLocaleString('en-GB', { timeZone: 'UTC' }));
- [x] todo get the local timezone
- [x] this should be displayed - so instead of 'loaded' a general state - display table or not, and another state for the text to be shown (loading/ this:)    

## bug fixes
- [ ] make some nodes impossible to delete, rename if it's a stuck variant
- [ ] on click elsewhere any context menu should automatically change
- [ ] the open in incognito doesn't work

## navigation and interactvity
- [ ] context menus for
  - [ ] side panel
  - [ ] path display
  - [ ] any area
  - [ ] main table
- [ ] multiple selection with ctrl clicked and/or shift
- [ ] react to ctrl+a clicks
- [ ] different styles - darkmode, etc - with tailwind possibly
- [ ] sorting A-Z, by date
- [ ] filtering, sorting - with hooks for column header context menus
- [ ] if a folder, on click it should open
- [ ] use [this](https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react) example to create a new context menu div @ any location - just need to track position, then using absolute location
- [ ] when clicking anywhere, 2 options - add new bookmark, add new folder
- [ ] cypress tests - maybe

## extra context menus
- [ ] add sorting by website - from a context menu
- [ ] change path copying into a context menu functionality, also to go to a sibling
- [ ] show the option to navigate to parent folder of any searched item
- [ ] lunr search to display, could be smart & advanced; still can search inside the results, I always do so tbh

## Ordering features 
- [ ] Identify Duplicate bookmarks.
- [ ] Clean your bookmarks by deleting empty folders.
- [ ] automatic cutting of tracing links ( need to read more about this one)
- [ ] save into cookies which items on the side tree were open



### Keywords
- [ ] keywords by areas inside the title that wouldn't be displayed
- [ ] visualizations for keyword maps

## very advanced features
- [ ] time view of bookmarks in a given folder
- [ ] commands for shortucts https://developer.chrome.com/docs/extensions/reference/commands/
- [ ] externally connecteable; to talk to specific websites, might be useful; https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage 
- [ ] maybe some sort of similarity view, like Obsidian visualization algorithm...
