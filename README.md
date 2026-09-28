# Drawing the Line — PLS210 Presentation #1

This is a static GitHub Pages presentation built with plain HTML, CSS, and vanilla JavaScript. It does **not** require Node.js, npm, React, a local server, API keys, or paid libraries.

## Files

```text
/index.html
/style.css
/script.js
/assets/
  horse-guide.svg
  mountain-horses.jpg
/presenter-notes.md
```

## Before publishing: verify these research details

Search `index.html` for `[VERIFY` and confirm each item against your original source material before presenting:

- the original Threads post/thread;
- the final platform choice;
- the exact analytical time window;
- the exact original post URL/details if you later add a link.

The current page treats **7–14 September 2026** as a proposed design boundary, not as an established property of the controversy.

## Navigation

- `→` or Space: next slide
- `←`: previous slide
- swipe left/right on a tablet or phone
- round arrow buttons: previous/next
- `⛶`: fullscreen when supported
- Home / End: first / last slide

The moving horse at the bottom is the progress marker. Animation respects the user's `prefers-reduced-motion` setting.

# Publish on GitHub Pages — beginner steps

## 1. Create the repository

1. Sign in to GitHub.
2. In the upper-right corner, click the **+** button.
3. Choose **New repository**.
4. Repository name: `pls210-presentation` (or another short name you prefer).
5. Choose **Public** unless your GitHub plan/organization explicitly supports Pages from private repositories.
6. You may leave “Add a README file” unchecked because this project already contains one.
7. Click **Create repository**.

## 2. Upload the presentation

1. Open the new repository.
2. Click **Add file**.
3. Click **Upload files**.
4. Drag **all of the contents** of this folder into the upload area:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `presenter-notes.md`
   - the entire `assets` folder
5. Confirm that `index.html` appears at the **top level** of the repository — not inside another folder.
6. At the bottom, use a commit message such as `Upload PLS210 presentation`.
7. Click **Commit changes**.

The repository should look like this:

```text
pls210-presentation/
  index.html
  style.css
  script.js
  README.md
  presenter-notes.md
  assets/
    horse-guide.svg
    mountain-horses.jpg
```

## 3. Enable GitHub Pages

1. In the repository, click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Under **Branch**, choose `main`.
5. In the folder dropdown, choose `/ (root)`.
6. Click **Save**.

## 4. Find the public link

1. Stay on **Settings → Pages**.
2. GitHub will build the website. This can take a few minutes.
3. Refresh the page if needed.
4. A message will appear showing the published site address, normally in this form:

```text
https://YOUR-USERNAME.github.io/pls210-presentation/
```

5. Click **Visit site** and test the presentation.

## 5. Test before class

Test the public GitHub Pages version, not only the local files.

Check:

- the landscape image loads;
- the horse progress marker appears;
- arrow keys work;
- Space advances;
- the navigation buttons work;
- fullscreen works in your browser;
- all text fits at the projector/laptop resolution;
- every `[VERIFY]` item has been resolved or intentionally kept as a transparent design note;
- the references are readable;
- the presentation can be completed comfortably in 8–10 minutes.

## 6. Update later

For a small text change:

1. Open the repository on GitHub.
2. Click the file you want to change, for example `index.html`.
3. Click the pencil **Edit** icon.
4. Make the change.
5. Click **Commit changes**.
6. GitHub Pages will redeploy automatically.

For a replacement image or several changed files:

1. Click **Add file → Upload files**.
2. Upload the updated file with the same filename/path.
3. Commit the change.
4. Wait for GitHub Pages to rebuild.

## Asset notes

### `assets/mountain-horses.jpg`
The landscape image you supplied. It is used on the opening and conclusion slides.

### `assets/horse-guide.svg`
An original lightweight line-art horse used as the moving progress marker. It is embedded locally and does not rely on an external image host.

## Editing research content

Most visible presentation text is inside `index.html`. Search for the slide heading you want to edit. Each slide is clearly labeled in HTML comments such as:

```html
<!-- 08 — LIT 1 -->
```

You should not need to modify `script.js` unless you want to change navigation behavior.
