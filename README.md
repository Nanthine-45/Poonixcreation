# Poonix Creation — GitHub Pages website

A responsive static crochet shopping storefront built with HTML, CSS and vanilla JavaScript. It is ready for GitHub Pages.

## Files
- `index.html` — website structure and content
- `style.css` — styling and responsive layout
- `script.js` — product catalogue, category filters, search, cart and WhatsApp order flow

## Preview on your computer
1. Extract the ZIP file.
2. Open the `poonix-creation` folder.
3. Double-click `index.html` to preview in your browser.

## Publish with GitHub Pages (free)
1. Sign in at https://github.com/
2. Click **New repository**.
3. Name it `poonix-creation` (or another name you like).
4. Choose **Public**, then click **Create repository**.
5. Click **Add file → Upload files**.
6. Upload `index.html`, `style.css`, and `script.js` from this folder. Upload the files themselves, not the ZIP.
7. Click **Commit changes**.
8. Open repository **Settings → Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**.
10. Choose branch `main` and folder `/ (root)`, then click **Save**.
11. Wait a few minutes. Your site will be available at:
   `https://YOUR-GITHUB-USERNAME.github.io/poonix-creation/`

If you named the repository `YOUR-GITHUB-USERNAME.github.io`, the URL will instead be:
`https://YOUR-GITHUB-USERNAME.github.io/`

## Personalise before publishing
Open `script.js` in a text editor and update:
- `WHATSAPP_NUMBER`: your WhatsApp number with country code, digits only (example format: `919876543210`).
- `CONTACT_EMAIL`: your preferred business email.
- `INSTAGRAM_URL`: your Poonix Creation Instagram profile URL.
- `products`: change product names, prices, descriptions and emoji placeholders.

You can edit the brand story and page text directly in `index.html`.

## Important limitations
- GitHub Pages hosts static files only. This site is a front-end demo storefront; it does not include WordPress, PHP, MySQL, customer accounts, payment processing, inventory management or a server-side order database.
- The shopping cart is saved in the visitor's browser using local storage.
- WhatsApp ordering works after you add your number to `WHATSAPP_NUMBER`.
- Product photos are currently represented by cute emoji illustrations and pastel backgrounds. Replace these with your own product photos when ready.
- Google Fonts needs an internet connection; fallback fonts are included.
