
# MVP
## core features
- [x] the open in incognito doesn't work
- [ ] filtering with hooks for column header context menus
- [ ] lunr search to display, could be smart & advanced; still can search inside the results

## navigation and interactvity
- [ ] context menu refactor 
  - [ ] need to be unified, almost the same functions tbh
  - [ ] thing, position, closecallbacks are there for now. rename, delete, cut copy paste should work on all
  - [ ] show in folder in only search result
  - [ ] could extract button groups as diff modules, that better than some Map of name to config
  - [ ] open all children, or the thing itself - should be dependent on ifLeaf
- [ ] context menus - 
  - [x] side panel
  - [ ] path display
    - [ ] go to a sibling
    - [ ] copy the path
  - [ ] any area (add new bookmark, add new folder)
  - [ ] main table
  - [ ] search results - navigate to parent folder
- [ ] keyboard usage and selection
  - [ ] info: https://developer.chrome.com/docs/extensions/reference/commands/
  - [ ] multiple selection with `ctrl` clicked and/or shift
  - [ ] react to `ctrl`+a clicks
- [ ] sorting
  - [ ]  A-Z
  - [ ]  by date

# Cleanup
## appearance
- [ ] different styles - darkmode, etc - with tailwind possibly
- [ ] prettify the whole thing, make it nice colours and right sizes  
- [ ] add 3 dots at the end of each link cell
- [ ] add a folder icon
- [ ] add shadow
- [ ] mirror layout minutely, if there's grid, do grid

# After MVP
## Development View
- [ ] cypress tests 
  - [ ] basic test suite to see if works at all
  - [ ] test basic functionality with some mock data

## Ordering features - operations on whole tree 
- [ ] Identify Duplicate bookmarks.
- [ ] Clean your bookmarks by deleting empty folders.
- [ ] automatic cutting of tracing links (need to read more about this one)
- [ ] save into cookies which items on the side tree were open


## expanded features
- [ ] universal reader - reads text from any website, pure text, and presents it in 1 hour doses, aligns with topics, etc

### Keywords
- [ ] keywords by areas inside the title that wouldn't be displayed
- [ ] maybe some sort of similarity view, like Obsidian visualization algorithm... (for keyword maps)

## NOT in the scope
- [ ] externally connecteable; to talk to specific websites, might be useful; https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage 
- [ ] time view of bookmarks in a given folder - it's not feasible to store all that data. added date is enough

# done
### basic features
- [x] display some table
- [x] load bookmarks
- [x] column grouping https://glideapps.github.io/glide-data-grid/?path=/story/glide-data-grid-docs--column-grouping
- [x] path available above the table, copiable
- [x] can copy the path anytime
- [x] general layout - should be very similar to the original; will be able to use absolute positioning
- [x] tree to navigate on the left with navigation changes
- [x] add display children prop to side tree element
- [x] if a folder, on click it should open
- [x] use [this](https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react) example to create a new context menu div @ any location - just need to track position, then using absolute location

## done bug fixes
- [x] console.log(date.toLocaleString('en-GB', { timeZone: 'UTC' }));
- [x] todo get the local timezone
- [x] this should be displayed - so instead of 'loaded' a general state - display table or not, and another state for the text to be shown (loading/ this:)    
- [x] on click elsewhere any context menu should automatically change - CHANGED, just a 'close' button for now
- [x] make some nodes impossible to delete, rename if it's a stuck variant
