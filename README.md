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

- Or you can hardcode the message information by the following way.

```js
chromei18n.messages = {
  "en": {
    "prompt_for_name": {
      "message": "What's your name?",
      "description": "Ask for the user's name"
    },
    "hello": {
      "message": "Hello, $USER$",
      "description": "Greet the user",
      "placeholders": {
        "user": {
          "content": "$1",
          "example": "Cira"
        }
      }
    },
    "bye": {
      "message": "Goodbye, $USER$. Come back to $OUR_SITE$ soon!",
      "description": "Say goodbye to the user",
      "placeholders": {
        "our_site": {
          "content": "Example.com",
        },
        "user": {
          "content": "$1",
          "example": "Cira"
        }
      }
    }
  }
}
```

2. You need to add the languages corresponding to the `message.json` files you created to your webpage using the `link rel='alternate'` tag.

```html
<html lang="en"> <!-- Sets document.documentElement.lang to 'en' -->
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

- You don't need to add them if you've hardcoded the message information, but adding them is recommended for SEO purposes.

3. Download `src/chromei18n.js` in this repository and add the `script` tag to your webpage or import it in your JS code.

```html
<script type="text/javascript" src="./src/chromei18n.js"></script>
```

- Or you can use this tag instead of downloading the code.

```html
<script src="https://cdn.jsdelivr.net/gh/kangwooklee29/chromei18n.js@latest/src/chromei18n.js"></script>
```

For more information, please visit these links below.

- [Localization message format](https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats)

- [chrome.i18n API reference](https://developer.chrome.com/docs/extensions/reference/api/i18n)


## Example

- The code that fetches messages after all messages.json files are loaded

```js
document.addEventListener("DOMContentLoaded", async () => {
    await chromei18n.loadMessages(); // necessary if you use the messages.json files, unnecessary if you hardcode the message information.
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = chromei18n.getMessage(el.getAttribute('data-i18n'));
    });
});
```

- The code that fetches messages of a default language

```js
document.addEventListener("DOMContentLoaded", async () => {
    await chromei18n.loadMessagesForLang(document.documentElement.lang); // This library sets document.documentElement.lang as navigator.language.split('-')[0] if you didn't specify it. You can change this code as needed.
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = chromei18n.getMessage(el.getAttribute('data-i18n'));
    });
});
```

## License

MIT license
