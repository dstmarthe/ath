_All That Happens_

All that happens - a blog dedicated to interesting news. Stories about things that move the zietgiest.
This blog is built with Hugo, Bootstrap, and the Mundana theme.

## Article Tips

- You can use markdown and html
- Cover image thumbnails need have "cover" in filename, store in same article directory as index.md of article
  - Ideal image dimensions: 750x500px
- Date in the .md file should look like: 2023-05-16T21:10:44-04:00
  - YEAR-MONTH-DATE(T for time)(militarytime don't have to put seconds)-04:00(We will keep using -04:00 for EST time)
- Images: `![Example alt text](exampleimg.jpg)` square braces is the alt text, and the curved braces are the path or url
- Images: With HTML do images like - `<img src="path.jpg" target="_blank" alt="alt text" />` image tags do not have a closing tag
- Links: Use the HTML way - `<a href="https://" target="_blank"></a>`
- Lists: Ordered - `1. Item 1` bullet - `* Item 2` make sure to leave one space between the number and info
- Lists: Unordered - `- Item 1` bullet - `+ Item 2` make sure to leave one space between the number and info
  - To make a sub-item, on the next line press tab and then write a list item
- Headings: Use hashtags to designate headings, the more hashes the smaller the heading eg "##" is an `<h2>` and "###" is an `<h3>` never use just one hash or `<h1>`.
- Bold text with double asteriks eg: `**bold**` makes **bold**
- Italicize with single asteriks eg: `*italics*` makes _italics_
- To make text larger or otherwise edit individual peices of text, use the `<span>` tag with classes and styles eg: `"This is some example text and I want <span class="text-warning">this</span> to be red"`
- Refer to the [Bootstrap](https://getbootstrap.com/docs/5.3/content/typography/) typography guide for quick edits to put into the class to edit text

## Shortcodes

- Shortcodes allow you to quickly make components with pre-built code
- Youtube videos: if you want to insert a Youtube video type `{{ youtube url}}` instead of "url" insert the string of characters of "v=" in a Youtube link
  - eg: `{{ youtube salY_Sm6mv4&ab_channel=AaronJack }}`



`<figure > <img src="/media/spf13.jpg"  />`

- Figcaption

`<figure > <img src="/media/spf13.jpg"  />`

Slap a `<figcaption>` tag to add caption at bottom of media.
