# Reactive first-sync readiness

Implements Master `messages/20261011T1400Z-master-rooms-wait-for-sync.md` using the existing host runtime. The installed declaration defines SyncStatus.lastCompleted as string | null; null is initial incomplete synchronization. No package or protocol is patched.

- Observe both Rooms and Sync Status continuously. Before first completed sync, show Loading without declaring a missing binding. Start typed reads only when the latest Room list has exactly one bound Room and lastCompleted is a string.
- Completed missing/multiple Room reach fails closed and clears when the original sole binding returns. Close stale query observers; late async setup/results cannot repopulate a lost reach.
- Preserve open edits through temporary reach loss; prevent new provider reads/writes while unavailable. Exact draft/write/save guards recheck availability at asynchronous boundaries and never discard already prepared House drafts. A different replacement locator does not silently move an existing editor to another Room.
- Existing refusal, write-halt, returned-draft and storage-loss warnings stay. No generic Room picker, permanent sync strip, guessed locator, content fallback, permission expansion, sandbox change, or new external resource.

Tests cover initial empty Room list with incomplete sync, both event orders, completed zero/multiple Rooms, delayed valid reach, temporary loss/recovery and unsaved-state preservation, plus rejected writes and stale observation cleanup. These are local checks, not hosted acceptance.

## Whole-workspace local-first architecture

All six donor modules are eagerly imported and mounted behind client-side hash navigation. The workspace observes every mounted Room document once after readiness; switching pages performs no fetch or query. Tasks retains its existing reactive local observation. Editable task/user/message/preference fields are staged as typed in actual business-document Room Drafts, including invalid text. Readiness, provider halt and lost-reach protections apply to every explicit Save/Send. UI appearance/display preferences use Runtime Presentation State and no extra schema. See README for the hosted acceptance boundary.


## Local tasks-a preparation

This branch prepares the original satnaing UI from source `58e6567c7c9844b05aaef8f9d609f7717881b119` as a new descendant of the current query-fixed Circle source, preserving all Git/release history. Only this local working tree restores the previous UI. No App has been renamed or published by the preparation. The intended existing App is `a_e.n`, Template display name `tasks-a`, with its unchanged `tasks` slot bound to `r_15.v`; Circle is held separately as `tasks-b`.

Both explicit task query projections use `/id`, `/title`, `/status`, `/label`, `/priority`. Metadata `path`, `all` and business draft field keys keep their forms. Current official SDK tests retain original response keys, validate every production query expression, and reject old shorthand. All existing non-Tasks modules, schema and 672 Room documents remain unchanged. The original UI does not query Notes because it does not display that section.

The test-only current SDK closure is reproducible with `npm ci --prefix tests/current-runtime --ignore-scripts` followed by `npm run test:current-runtime`; `MD_QUERY_CONTRACT_ROOT` can select an already installed isolated closure. It does not upgrade production dependencies. Publication/renaming remain held until the parent authorizes the coordinated split and the dev first-page gate is resolved.
