# chromei18n.js

This is a vanilla JS library for multi-language support, similar to Google Chrome's chrome.i18n API. It supports all three arguments of `chrome.i18n.getMessage()` in vanilla JS.

## How to use

1. Similar to the chrome.i18n API, you must include the `messages.json` file in the following directory structure.

```
project-root/
│
├── _locales/
│   ├── en/
│   │   └── messages.json
│   ├── es/
│   │   └── messages.json
│   └── fr/
│       └── messages.json
...
```

2. You need to add the languages corresponding to the `message.json` files you created to your webpage using the `link rel='alternate'` tag.

```html
<html lang="en">
<head>
    <title>Your Website Title</title>
    <!-- Other tags -->

    <!-- Alternate language links -->
    <link rel="alternate" hreflang="es" href="http://example.com/es/page.html">
    <link rel="alternate" hreflang="fr" href="http://example.com/fr/page.html">
    <!-- Additional links for other languages as needed -->
</head>
...
```

3. Download `src/chromei18n.js` in this repository and add the `script` tag to your webpage or import it in your JS code.

```html
<script type="text/javascript" src="./src/chromei18n.js"></script>
```

- Or you can use this tag instead of downloading the code.

```html
<script src="https://cdn.jsdelivr.net/gh/kangwooklee29/chromei18n.js@v1.0.0/src/chromei18n.js"></script>
```

For more information, please visit these links below.

- [Localization message format](https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats)

- [chrome.i18n API reference](https://developer.chrome.com/docs/extensions/reference/api/i18n)


## Example

```js
document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = chromei18n.getMessage(el.getAttribute('data-i18n'));
});
```
