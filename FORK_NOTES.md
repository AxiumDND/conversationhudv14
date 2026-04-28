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
| `"conversation-hud"` (module id, e.g. socketlib registration) | `"conversationhudv14"` |
| `settings-config-conversation-hud.` (settings DOM-id selectors) | `settings-config-conversationhudv14.` |
| `"conversation-hud.migrationWizard"` (settings menu key) | `"conversationhudv14.migrationWizard"` |

### Flag namespace deliberately *kept* as `conversation-hud`

The document-flag namespace (e.g. `flags.conversation-hud.type`, `flags["conversation-hud"]`) was **kept identical to upstream** so existing v13 worlds can be opened in v14 without a data migration. Foundry doesn't require flag namespaces to match the module id — they're arbitrary strings.

This means a journal entry created by upstream `conversation-hud` is readable by this fork. A side-effect is that if both modules were ever installed at once they'd share the same flag namespace; in practice that's a rare configuration and the data shape is identical.

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

Because the flag namespace is unchanged (see above), v13 worlds opened in v14 with this fork installed will see their existing conversation and faction journal entries normally. No data migration is required.

Module *settings* are stored under the new module id, so settings will need to be re-set after switching from upstream to this fork (or vice-versa).

## Foundry v14 compatibility status

The metadata is v14-compatible; the runtime code still needs an audit pass for v14 API breakage. See the "v14 audit" section of the project README for current status.
