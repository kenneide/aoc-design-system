# HTML presentation templates

Open `index.html` from the reference site. All twelve layouts are native HTML and CSS, with the shared Space Grotesk font and SVG artwork loaded locally. The gallery in the main site embeds live previews of these same slides.

Use **Present** for one slide at a time. Arrow keys, Page Up/Down and Space navigate. Home and End jump to the first and last slide. Escape or **All slides** returns to the overview. **Full screen** uses the browser's fullscreen API when available. The controls work with touch and keyboard. No automatic animation or advance is used.

Links such as `index.html#slide-05` open a particular layout. Without JavaScript, the full document remains readable, with an anchor index. Browser printing includes every slide. All URLs are relative for hosting under a repository prefix.

To make a presentation, copy this directory into the same site structure, edit the slide content in `index.html`, and keep the relative links to the shared styles, tokens, font and SVG assets intact. Each `.slide-frame` is a 16:9 container. Positions are percentages and font sizes use container query units, so slides scale together without rearranging their composition. Add or remove slide sections as needed; navigation counts them automatically. Keep slide IDs unique and update the anchor index.

The `?preview=1#slide-05` URL displays a single decorative preview without controls. It is intended for the site's non-interactive gallery iframes. The caption link opens the real presentation.

Content and chart values are illustrative placeholders. The bar chart is HTML and CSS with an accessible description. When replacing data, update the visible labels, heights and description together. Preserve the company identity from `design/company.json`. Keep text off the multicolour artwork and preserve SVG proportions.
