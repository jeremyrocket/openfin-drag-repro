# OpenFin Cross-Window Drag Split-Drop Bug Repro

## Bug Description
When `showViewsOnTabDrag: true` is set in `defaultWindowOptions.viewVisibility`,
dragging a tab from one window and dropping it on the **split zone** (left/right/top/bottom
of an existing view to create a new row/column) of another window fails on the first attempt.

- Dropping on the **tab strip** (top of window) works on first attempt
- The first failed drag "warms up" the system — second attempt works
- Setting `showViewsOnTabDrag: false` fixes the issue but removes the view preview during drag
- Having OpenFin Process Manager open in the background prevents the issue (likely due to its window enumeration)

## Manifests

Two manifests are provided to demonstrate the issue:

| File | `showViewsOnTabDrag.enabled` | Behaviour |
|------|------------------------------|-----------|
| [`manifest-broken.json`](manifest-broken.json) | `true` | First split-drop fails — view ends up in a separate window |
| [`manifest-working.json`](manifest-working.json) | `false` | Split-drop works on first attempt (but no view preview during drag) |

The **only** difference between them is the value of
`platform.defaultWindowOptions.viewVisibility.showViewsOnTabDrag.enabled`.

## Steps to Reproduce

1. Run the server: `node serve.js`
2. Launch with the **broken** manifest:
   ```
   openfin --launch --config http://localhost:5555/manifest-broken.json
   ```
3. Two windows open automatically — Window 1 (example.com) and Window 2 (google.com)
4. Drag the google.com tab from Window 2 to the **left/right/top/bottom split zone** of Window 1's view
5. **Expected:** View splits into two panes
6. **Actual:** Drop fails, view ends up in a separate window

## To verify the fix

Launch with the **working** manifest instead and repeat the steps above:
```
openfin --launch --config http://localhost:5555/manifest-working.json
```
The split-drop succeeds on the first attempt because `showViewsOnTabDrag` is disabled.

## Environment
- OpenFin Runtime: 44.146.101.4 (also reproduced on 44.146.100.109)
- OS: Windows
