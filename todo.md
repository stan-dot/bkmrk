## questionable dev decisions
- [ ] in search results change the path whenever the highlighted bookmark shows. do not just jump between things in the side tree
- [ ] useSearchParams - might be too weird, but the native bookmark manager uses that. might need react-router memory router

## current errors
- [x] edit folder does not use the name first
- [x] side subtree and side element circular dependency
- [x] fix the duality between tables/boards

- [x] add the global state manager with reducer and siblings are closely mapped to the path anyway

- [ ] settings somehow worked! but on close some reducer error
- [ ] ask chat how to simpify logic between alert manager and popup context reducer, too many read strings
- [ ] make sure clicks work for
  - [ ] context menus
  - [ ] change in paths
- [ ] number of selection tracked in the navbar!
- [ ] reload when new thing created - with a listener to refresh things on event, probably in the context object
- [ ] ctrl + a does not select everything in the table, but all text - should use the native feature of the glide apps thing
