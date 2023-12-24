class Chromei18n {
    constructor(languages) {
        this.languages = languages;
        this.messages = {};
        this.loadMessages();
    }

    async loadMessages() {
        const promises = this.languages.map(async (language) => {
            try {
                const response = await fetch(`/_locales/${language}/messages.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.messages[language] = await response.json();
            } catch (error) {
                console.error(`Error loading messages for ${language}:`, error);
            }
        });

        await Promise.all(promises);
        console.log('All locale messages loaded.');
    }

/*
Example of messages.json:
{
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
*/
    getMessage(messageName, substitutions = [], options = {}) {
        const messages = this.messages[document.documentElement.lang];
        if (!messages || !messages[messageName])
            return '';

        let message = messages[messageName].message;

        if (!Array.isArray(substitutions))
            substitutions = [substitutions];

        if (options !== null && typeof options === 'object') {
            if (options.escapeLt)
                message = message.replace(/</g, '&lt;');
        }

        if (substitutions.length === 0)
            return message;

        // message has numbers as keys, such as $1, $2, ...
        const numberKeys = message.match(/(?<!\$)\$\d+/g);
        numberKeys.forEach(key => {
            const regex = new RegExp(key, 'g');
            const idx = parseInt(key.replace('$', '')) - 1;
            message = message.replace(regex, substitutions[idx] || '');
        });

        if (!messages[messageName].placeholders)
            return message.replace(/\$\$/g, '$');

        const stringKeys = message.match(/(?<!\$)\$[\w@]+\$/g);
        stringKeys.forEach(key => {
            lowerCasedKey = key.toLowerCase();
            message = message.replace(key, lowerCasedKey);
        });
        Object.keys(messages[messageName].placeholders).forEach(key => {
            if (!messages[messageName].placeholders[key]) return;

            lowerCasedKey = key.toLowerCase();
            const regex = new RegExp(`(?<!\$)\$${lowerCasedKey}\$`, 'g');

            const placeholderContent = messages[messageName].placeholders[key].content || '';

            // placeholderContent is not a number such as Example.com
            if (!/^\$\d+$/.test(placeholderContent)) {
                message = message.replace(regex, placeholderContent)
                return;
            }

            // placeholderContent is a number such as $1, $2, ...
            const idx = parseInt(placeholderContent.replace('$', '')) - 1;
            message = message.replace(regex, substitutions[idx] || '');
        });

        return message.replace(/\$\$/g, '$');
    }
}

const alternateLinks = document.querySelectorAll('link[rel="alternate"]');
const languageList = Array.from(alternateLinks).map(link => link.getAttribute('hreflang'));
const chromei18n = new Chromei18n([document.documentElement.lang, ...languageList]);
export default chromei18n;
