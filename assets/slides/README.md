# Earlier presentation exports

Online HTML presentations are now the primary format. Use `../../presentations/index.html` and see `../../presentations/README.md`. These files preserve the earlier PowerPoint proposal and PNG exports.

Twelve reusable 16:9 slides in `house-style-templates.pptx`. Duplicate the slide closest to your content and replace the sample copy. Text and the chart remain editable. The band artwork is embedded as a high-resolution image, derived from the shared SVG assets. Keep its proportions when resizing.

Install the bundled `../fonts/SpaceGrotesk.ttf` on any computer used to edit or present the deck. Its licence is in `../fonts/OFL.txt`. The chart contains explicitly illustrative values, not company results.

Layouts: paper title, lime title, section divider, agenda, two-column content, statement, comparison, roadmap, data chart, visual with commentary, decision and closing.

The PNG files are the full-size previews shown on the reference site. They are previews, not editable slide sources. These layouts are proposals for visual feedback.

## Regeneration

`scripts/create-slides.mjs` reads the company record, shared colour tokens and generated wave assets. It uses `@oai/artifact-tool`, `@napi-rs/canvas` and `sharp` from the supplied presentation runtime. They are optional authoring dependencies, not website dependencies. Set `AOC_SLIDE_RUNTIME` to the runtime's `node_modules` directory and `AOC_SLIDE_BUILD` to a private working directory, then run the script with the runtime's Node executable. The script exports a candidate deck and PNG previews. Validate and visually review the candidate before replacing the distributed PPTX and previews. The published chart includes a workbook snapshot of its illustrative values.
