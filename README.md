This package exports a single function, `jsonFeedToRss`, which accepts a JavaScript function in [JSON Feed](https://www.jsonfeed.org/) format and returns the corresponding RSS XML.

```js
import jsonFeedToRss from "@weborigami/json-feed-to-rss";

const jsonFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "pondlife",
  description: "Dispatches from off the grid",
  feed_url: `https://pondlife.netlify.app/feed.json`,
  home_page_url: "https://pondlife.netlify.app",
  items: [
    {
      content_html:
        "So why did I come all the way out here away from everyone? …",
      date_published: "2025-08-13T17:00:00.000Z",
      id: "https://pondlife.netlify.app/posts/2025-08-13.html",
      title: "Solitude",
      url: "https://pondlife.netlify.app/posts/2025-08-13.html",
    },
  ],
};

const xml = jsonFeedToRss(jsonFeed);
```

An optional second parameter can supply the following options:

- `feed_url`: the public URL where the RSS feed lives
- `language`: a [language tag](https://en.wikipedia.org/wiki/IETF_language_tag) identifying the language of the feed content
