# OpenFin Cross-Window Drag Split-Drop Bug Repro

## Bug Description
When `showViewsOnTabDrag: true` is set in `defaultWindowOptions.viewVisibility`,
dragging a tab from one window and dropping it on the **split zone** (left/right/top/bottom
of an existing view to create a new row/column) of another window fails on the first attempt.

- Dropping on the **tab strip** (top of window) works on first attempt
- The first failed drag "warms up" the system — second attempt works
- Setting `showViewsOnTabDrag: false` fixes the issue but removes the view preview during drag
- Having OpenFin Process Manager open in the background prevents the issue (likely due to its window enumeration)

## Steps to Reproduce

1. Run the server: `node serve.js`
2. Launch: `openfin --launch --config http://localhost:5555/manifest.json`
3. Window 1 opens with example.com
4. In the platform provider window, click "Create Window with View (layout-embedded)"
5. Window 2 opens with google.com
6. Drag the google.com tab from Window 2 to the **left/right/top/bottom split zone** of Window 1's view
7. **Expected:** View splits into two panes
8. **Actual:** Drop fails, view ends up in a separate window

## To verify the fix
Set `showViewsOnTabDrag.enabled` to `false` in manifest.json and repeat steps above.

## Environment
- OpenFin Runtime: 44.146.101.4 (also reproduced on 44.146.100.109)
- OS: Windows
