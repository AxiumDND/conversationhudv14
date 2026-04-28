# Fork Notes — ConversationHUD v14

This is a Foundry VTT v14 compatible fork of [CristianVasile23/conversation-hud](https://github.com/CristianVasile23/conversation-hud) (original last verified at v13).

The fork uses a **distinct module id** so it can be installed alongside the original without collision. Below is a list of every place the naming or manifest differs from the upstream repo.

## Versioning convention

- Upstream tags use plain semver (e.g. `6.0.0`).
- This fork prefixes all versions with the target Foundry major version.
- First release: **`14.0.0`** (matches `module.json` `version`).
- Future fixes: `14.0.1`, `14.1.0`, etc. The leading `14.` always denotes Foundry v14.

## `module.json` differences

| Field | Upstream | This fork |
|---|---|---|
| `id` | `conversation-hud` | `conversationhudv14` |
| `title` | `ConversationHUD` | `ConversationHUD v14` |
| `version` | `#{VERSION}#` (substituted at release) | `14.0.0` |
| `compatibility.minimum` | `13` | `14` |
| `compatibility.verified` | `13` | `14` |
| `compatibility.maximum` | `13` | `14` |
| `description` | original blurb | original blurb + fork attribution |
| `url` / `manifest` / `download` | `#{URL}#` etc. (GH Actions placeholders) | removed (set when this fork has its own release pipeline) |
| `license` / `readme` | full GitHub URLs to upstream | local paths (`LICENSE`, `README.md`) |
| `packs[].label` | `ConversationHUD Macros` | `ConversationHUD v14 Macros` |

The `packs[].name` (`chud-macro-compendium`) and `packs[].path` were left unchanged so Foundry can read the bundled compendium data without a re-pack.

## Code-level rename of the module id

Foundry resolves a module's runtime folder, socket namespace, settings namespace, document flag namespace, and template paths from the module id. Renaming `id` therefore cascades into the source tree. The following replacements were applied across `js/**/*.{js,mjs}` and `templates/**/*.hbs`:

| Pattern | Replaced with |
|---|---|
| `modules/conversation-hud/` | `modules/conversationhudv14/` |
| `"conversation-hud"` (quoted module id) | `"conversationhudv14"` |
| `'conversation-hud'` | `'conversationhudv14'` |
| `flags.conversation-hud.` | `flags.conversationhudv14.` |
| `settings-config-conversation-hud.` | `settings-config-conversationhudv14.` |
| `"conversation-hud.migrationWizard"` (settings menu key) | `"conversationhudv14.migrationWizard"` |

This affects, among others:
- `js/constants/generic.js` — `MODULE_NAME` constant
- `js/init.js` — `socketlib.registerModule(...)` call
- All `js/forms/*`, `js/sheets/*`, `js/conversation-types/**`, `js/hooks/*` template paths
- All Handlebars `{{> "modules/.../..."}}` partial includes
- Form `name="flags.conversationhudv14.X"` attributes (so submitted form data lands in the new flag namespace)

A full list of touched files is in the rename commit.

## Things that intentionally were NOT renamed

These look related but are independent of the module id; renaming would have broken styling, internal selectors, or asset references for no benefit:

- **CSS class names** under `css/` (`.conversation-hud-content`, `.conversation-hud-dropzone`, etc.) — pure styling hooks.
- **Font family / file names** under `font/` (`conversation-hud-font-icons`) — internal asset name; no consumer outside the bundled `font.css`.
- **DOM element id** `ui-conversation-hud` (created in `js/hooks/renderLayout.mjs`, read in conversation-types and hooks) — a chosen DOM id, not derived from the module id.
- **Sheet-registration scopes** `"faction-sheet"` and `"conversation-sheet"` (`js/sheets/registerSheets.js`) and the resulting `sheetClass` strings (`"conversation-sheet.ConversationSheet"`, `"faction-sheet.FactionSheet"`). These are sheet-config namespaces independently chosen by the module; documents store them in `flags.core.sheetClass` and renaming would invalidate all existing journal entries created with the original module.
- **Compendium pack name** `chud-macro-compendium` and path `packs/chud-macro-compendium` — would require re-packing the LevelDB.
- **Media URLs** in `module.json` and **upstream license/readme links** in source comments still point at the upstream repo (we don't host our own copies yet).

## Migration / data compatibility

Because the document-flag namespace was renamed (`flags.conversation-hud.*` → `flags.conversationhudv14.*`), worlds that previously used the upstream module will **not** automatically see their existing conversation/faction journal entries in this fork. Two options if a worlds-level migration is ever needed:

1. Add a one-off migration step that copies `flags["conversation-hud"]` → `flags["conversationhudv14"]` on JournalEntry, JournalEntryPage, Scene, and Token documents.
2. Or temporarily set `MODULE_NAME` back to `"conversation-hud"` and reverse the bulk rename (not recommended — defeats the point of side-by-side install).

For new v14 worlds this is a non-issue.

## Foundry v14 compatibility status

The metadata is v14-compatible; the runtime code still needs an audit pass for v14 API breakage. See the "v14 audit" section of the project README for current status.
