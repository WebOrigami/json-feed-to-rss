import assert from "node:assert";
import { describe, test } from "node:test";
import jsonFeedToRss from "../src/jsonFeedToRss.js";

describe("jsonFeedToRss", () => {
  test("converts a simple JSON Feed entry with one item to RSS format", async () => {
    const jsonFeed = {
      title: "Test Feed",
      home_page_url: "http://example.com",
      feed_url: "http://example.com/feed.json",
      description: "This is a test feed",
      items: [
        {
          id: "1",
          content_html: "This is an <strong>item</strong>.",
          url: "http://example.com/item",
          title: "Test of <strong>item</strong>",
        },
      ],
    };
    const options = { language: "en-us" };
    const result = await jsonFeedToRss(jsonFeed, options);

    const expectedRSS = `<?xml version="1.0" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Test Feed</title>
    <description>This is a test feed</description>
    <link>http://example.com</link>
    <language>en-us</language>
    <atom:link href="http://example.com/feed.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Test of &lt;strong&gt;item&lt;/strong&gt;</title>
      <link>http://example.com/item</link>
      <guid isPermaLink="false">1</guid>
      <content:encoded><![CDATA[This is an <strong>item</strong>.]]></content:encoded>
    </item>
  </channel>
</rss>`;
    assert.equal(result, expectedRSS);
  });

  test("escapes URLs and IDs for XML", () => {
    const jsonFeed = {
      title: "Test Feed",
      home_page_url: "http://example.com/?a=1&b=2",
      feed_url: "http://example.com/feed.json?a=1&b=2",
      items: [
        {
          id: "http://example.com/item?id=1&sort=asc",
          url: "http://example.com/item?id=1&sort=asc",
          title: "Test Item",
        },
      ],
    };

    const result = jsonFeedToRss(jsonFeed);

    assert.match(result, /<link>http:\/\/example\.com\/\?a=1&amp;b=2<\/link>/);
    assert.match(
      result,
      /<atom:link href="http:\/\/example\.com\/feed\.json\?a=1&amp;b=2"/,
    );
    assert.match(
      result,
      /<link>http:\/\/example\.com\/item\?id=1&amp;sort=asc<\/link>/,
    );
    assert.match(
      result,
      /<guid>http:\/\/example\.com\/item\?id=1&amp;sort=asc<\/guid>/,
    );
  });
});
