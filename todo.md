## questionable dev decisions
- [ ] in search results change the path whenever the highlighted bookmark shows. do not just jump between things in the side tree
- [ ] useSearchParams - might be too weird, but the native bookmark manager uses that. might need react-router memory router

## current errors
- [x] edit folder does not use the name first
- [x] side subtree and side element circular dependency
- [ ] fix the duality between tables/boards
- [ ] add the global state manager with reducer and siblings are closely mapped to the path anyway
- [ ] reload when new thing created - with a listener to refresh things on event, probably in the context object
- [ ] sometimes path gets too many items
- [ ] search does not change the path - then clicking on 'current path' does not redirect
- [ ] ctrl + a does not select everything in the table, but all text - should use the native feature of the glide apps thing
