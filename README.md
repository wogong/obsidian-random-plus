# Random Note Plus

Random Note Plus is an Obsidian community plugin that opens a random note while allowing you to exclude specific folders.

## Features

- Ribbon icon: **Open Random Note**
- Command: **Open Random Note**
- Settings tab with folder exclusions (one folder per line)
- If no eligible notes remain after filtering, a notice is shown

## Excluded folder behavior

- Enter folder paths relative to your vault root
- `Templates` excludes notes under `Templates/...`
- Leading and trailing slashes are normalized (for example `/Archive/` becomes `Archive`)
- Matching is prefix-based on folder path

## Install (manual)

1. Build the plugin:
   ```bash
   npm install
   npm run build
   ```
2. Copy `main.js`, `manifest.json`, and `styles.css` to:
   ```text
   <Vault>/.obsidian/plugins/random-note-plus/
   ```
3. In Obsidian, go to **Settings → Community plugins**, then enable **Random Note Plus**.

## Development

```bash
npm install
npm run dev
```

- `npm run dev`: watch mode build via esbuild
- `npm run build`: type-check and production bundle
- `npm run lint`: run ESLint

## Release

1. Update `manifest.json` version.
2. Update `versions.json` with `"<version>": "<minAppVersion>"`.
3. Create a GitHub release tag matching the version exactly (no leading `v`).
4. Attach `manifest.json`, `main.js`, and `styles.css` as release assets.

## Compatibility

- Plugin ID: `random-note-plus`
- Minimum Obsidian version: `0.15.0`
- Desktop only: `false`

## Notes for local development

For local testing, make sure your plugin folder name in the vault matches the plugin ID in `manifest.json`:

```text
.obsidian/plugins/random-note-plus/
```
