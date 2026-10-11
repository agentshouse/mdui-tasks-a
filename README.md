# Tasks — full House workspace demo

A single-page port of all requested modules from [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin), pinned donor commit `e16c87f213a5ba5e45964e9b67c792105ec74d26`.

## Modules

- Dashboard: donor overview, recent sales, analytics, referrers and devices; local JSON download
- Tasks: the existing 100 donor tasks, complete table/dialog/filter/import/export functionality
- Chats: the donor’s ten conversations and 43 message documents; Send saves a new message to the Room, visible to its members
- Users: all 500 seeded donor users, filters/sorting/pagination, real demo-record creation/edit/deletion and status actions
- Apps: all 15 donor integration cards and original sample connection states, with local search/filter/sort
- Settings: all five donor sections; profile/account/notification preferences are business documents, appearance/display are Runtime Presentation State

All six module trees are eagerly imported and remain mounted. Hash navigation and Back/Forward switch locally, without a document reload, page fetch, code split or new query. One eager observation reads all mounted Room documents after the existing reactive first-sync readiness gate. No demo fixture is imported into the runtime bundle and no business content is cached in browser storage.

## Business data and drafts

The existing App is `a_e.n` at https://dev.agents.house/app/a_e.n and the existing Room is `tasks-pilot` (`r_15.v`). The single writable `tasks` slot now covers nine types: task, workspace-user, conversation, chat-message, integration, dashboard, profile, account and notification-preferences. There is no second App, Room, task collection or UI-buffer schema.

The complete seeded Room has 672 business documents: the previous 100 task documents plus 572 additive donor documents. Source-only fixture provenance and original chat data are in `fixtures/`. Guarded create-only payloads are in `reports/whole-demo/`; they must never be blindly replayed after successful application. Preferences use `preferences/*.md`; House reserves `settings/` for its own settings, including `settings/schema.yaml`.

Every editable document field is staged into its actual durable Room Draft as typed, including invalid/incomplete values. Draft observation restores reloads and other tabs, later overlapping input is reapplied after stale, disjoint changes and Runtime-owned first bases remain. Explicit Save validates; explicit Chat Send saves the message document. Failed fields are visibly retained and block Save until retried. Changing editor scope cannot replay late acknowledgements or field bases into another document. Local Save remains available during provider upload halt, while lost Room reach blocks Save without discarding drafts.

## Honest boundaries

Users/profile/account/notification screens edit donor demo records, never actual House accounts, credentials, permissions or delivery settings. Connect, Invite, passwords, calls, external chat and attachment delivery have no implementation and are explained as unavailable. Donor sample integration states are labeled as demo states. No actual external account is connected or message/call/email operation performed by this port.

New Room messages use a neutral “Room member” sender until House exposes current-member identity. Available Provider head attribution is labeled “Last saved by”; it is not claimed as immutable original authorship. Existing donor message labels remain exact.

Per Master, missing/external avatar images use the donor initials fallback. No external portraits are fetched. All brand icons and the default Inter font are bundled. Manrope is labeled unavailable; donor file-sidebar display preferences are retained as UI preferences without inventing file destinations. Donor chart samples are captured once and rendered locally with SVG/CSS charts instead of introducing unavailable chart dependencies.

## Gates

Use the existing installed dependencies (or the pinned lockfile in an authorized environment):

    npm run lint
    npm test
    npm run build
    npm run release:check

Serialize heavy builds with the shared Porting build lock. Tests include original task/CSV/readiness/draft regressions; exact fixture/schema/MD Model round-trips; six real React module trees; zero navigation query growth; real chat drafting/Send/remount/other-tab behavior; Settings validation and Presentation state; delayed scope changes, failed-field protection and creation-to-saved transitions. The release check covers a closed local asset graph, eager code, source-only demo fixtures, notices and the 2,000-file/20 MiB limits.

Local checks and accepted publication do not establish hosted acceptance. The current browser authentication/installed-release activation blocker remains external; status stays working until the exact published bytes are tested in the hosted renderer. The known Node 24.19.0 versus package-declared >=24.21.0 advisory and non-failing >500 kB single-chunk advisory remain accurately disclosed.

## Notices

The donor MIT LICENSE is retained verbatim in source and `public/LICENSE.txt`. The existing locked production dependency/bridge MIT notices and bundled Inter OFL remain in the release. No dependency was added for these modules. See `SOURCE.md`.


## Local tasks-a preparation

This branch prepares the original satnaing UI from source `58e6567c7c9844b05aaef8f9d609f7717881b119` as a new descendant of the current query-fixed Circle source, preserving all Git/release history. Only this local working tree restores the previous UI. No App has been renamed or published by the preparation. The intended existing App is `a_e.n`, Template display name `tasks-a`, with its unchanged `tasks` slot bound to `r_15.v`; Circle is held separately as `tasks-b`.

Both explicit task query projections use `/id`, `/title`, `/status`, `/label`, `/priority`. Metadata `path`, `all` and business draft field keys keep their forms. Current official SDK tests retain original response keys, validate every production query expression, and reject old shorthand. All existing non-Tasks modules, schema and 672 Room documents remain unchanged. The original UI does not query Notes because it does not display that section.

The test-only current SDK closure is reproducible with `npm ci --prefix tests/current-runtime --ignore-scripts` followed by `npm run test:current-runtime`; `MD_QUERY_CONTRACT_ROOT` can select an already installed isolated closure. It does not upgrade production dependencies. Publication/renaming remain held until the parent authorizes the coordinated split and the dev first-page gate is resolved.
