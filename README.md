# Alan O Cinneide Software — house style

An evolving design system for websites, presentations and printed material. Version 0.2 is a **proposal for review**, grounded in the company's surviving business-card background and a retro-futuristic direction inspired by Munich 1972 and Moscow 1980.

**[Open the reference site](https://kenneide.github.io/aoc-design-system/)** · **[Give feedback](https://github.com/kenneide/aoc-design-system/issues/new?template=design-feedback.yml)**

## Start here

- [Design principles and application guidance](design/README.md)
- [Instructions for AI models](AGENTS.md)
- [Shared tokens](design/tokens.json) and [generated CSS](design/tokens.css)
- [Reusable band SVG](assets/bands.svg) and [surviving reference](assets/reference/BusinessCardBackground.png)
- [Provenance and decision status](design/PROVENANCE.md)

The reference website includes a company homepage concept, two presentation slide specimens a square business-card concept, and a live controls playground. These are compositions to evaluate, not a live company marketing site or production-ready print files. Copy and taglines in specimens are proposals, not verified service claims.

## Local development

Requires Node.js 22+ and Python 3 for the preview server. There are no npm dependencies or external runtime services.

```sh
npm run generate # after changing tokens
npm run dev      # http://127.0.0.1:4173
npm run check    # generated asset consistency, local links, reading contrast
npm run build    # checks, then copies the public site into dist/
```

Open through the local HTTP server; the palette loads the JSON tokens via fetch. All fonts and assets are hosted locally. No analytics or third-party embeds.

## Editing

Edit `design/tokens.json`, then run `npm run generate`. The generator writes `design/tokens.css` and `assets/bands.svg`; commit these generated files alongside the tokens. The site reads the same JSON for the interactive colour swatches.

Change compositions in `index.html`, layout in `styles.css`, and interactions in `app.js`. Record meaningful decisions in the design guidance and provenance document so the examples and instructions agree.

## Publication and review

The Pages workflow validates pull requests and deploys pushes to `main`. GitHub Pages must use **GitHub Actions** as its source. Only the allowlisted public website files are copied to `dist/`; administrative records are never included.

Feedback can reference the stable section anchors: `#principles`, `#colour`, `#typography`, `#graphic`, `#motion` / `#controls`, `#applications`, `#use`. Specimens are numbered 06.1 (web), 06.2 (slides), 06.3 (card). Use the design feedback issue template with a section link and the desired change. Update guidance and examples together after a decision is accepted.

## Rights

Company artwork and identity assets remain the property of their respective rights holders. No general licence to the company's brand assets is granted by publishing this repository. Space Grotesk is redistributed under the [SIL Open Font License](assets/fonts/OFL.txt). Historical Olympic systems are inspiration only; no Olympic emblems, mascots or pictograms are reproduced.
