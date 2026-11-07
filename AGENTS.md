# Creating with the Alan O Cinneide Software BV house style

Read [design/README.md](design/README.md), [design/PROVENANCE.md](design/PROVENANCE.md) and [design/tokens.json](design/tokens.json) before creating an artifact. Use the [reference site](https://kenneide.github.io/aoc-design-system/) and its actual source as visual examples. The user's instructions override these defaults.

Use [design/company.json](design/company.json) as the source of truth for the company name, inquiry email and KVK link. Website footers should show the full company name, a mailto inquiry link and the linked KVK number.

## Established direction

- Company name: **Alan O Cinneide Software BV**. Include **BV** in the wordmark, site metadata, specimens and company references. Do not shorten the company name or substitute B.V.
- Retro-futuristic, optimistic and clear; inspired by Munich 1972 and Moscow 1980.
- The surviving business-card background is the visual reference. Company-facing website headers and footers must prominently show the full spectrum: red → blue → green → lime → gold → white → orange → yellow, including at phone widths and in light/dark modes. Lime alone is insufficient. Use a dedicated spectrum ribbon or complete band graphic, keeping text on quiet surfaces. Flowing bands remain a selective signature motif within content.
- The grounded palette tone is **gold**, not olive. Organic sinusoids and gentle harmonics connect the flowing graphics to the owner’s audio roots. Optimism means bright contrasts, clean construction and shared progress toward a new future.
- Smooth, purposeful animation is desirable. Light/dark theme changes blend semantic colours together over the shared 700 ms theme token with smoothstep easing, as in Gym Circuit Logger. First paint is immediate; rapid reversals start from the current colours, and reduced motion skips the blend. Keep artwork colours and layout fixed. Maestro's colours, typography and branding are explicitly excluded.

## Proposed defaults, awaiting visual feedback

- Space Grotesk, locally hosted and openly licensed, for all typography.
- Use the shared sRGB palette. Ink on paper/white is the default reading pair. Ink on lime/yellow/orange is suitable for coloured panels. White on ink is the inverse pair.
- Use broad, flat, continuous colour bands. Crop them beyond the edge of a dedicated visual area. Keep text off multicolour crossings. Do not turn the motif into a gradient or add a distressed retro filter.
- Start with a clear grid, strong type hierarchy, generous margins and a small number of purposeful colours. Use square or minimally rounded shapes. Avoid generic rounded-card layouts.
- Use motion tokens for short interactions. Decorative band movement is opt-in, finite and respects `prefers-reduced-motion`. Keep text still and usable with JavaScript disabled.
- The reference website, card and slide specimens demonstrate these defaults; they are not user-approved final brand specifications.

Prefer short captions and working specimens over explanatory paragraphs on the reference site. Use `#controls` for live input, feedback and panel examples; preserve their native keyboard behaviour.

## Applying to other formats

For websites, reuse `design/tokens.css` and the SVG. Keep local URLs relative if deploying under a repository prefix. Preserve keyboard focus and readable contrast. For slides, use Space Grotesk with a clear title/content hierarchy and 16:9 layouts; derive sizes for the viewing distance rather than copying CSS pixels. For cards, use the 65 × 65 mm size as a historical reference. Obtain printer specifications and proof colour, bleed, safe area, paper and white-ink behaviour before producing a print file. Never claim the reconstructed card is the lost original.

Do not invent contact details, testimonials, customers or service claims. Clearly identify speculative marketing copy. Do not copy receipts, invoices or administrative records into this repository. Public examples may use the owner's public GitHub profile, as the site does.

## Repository work

Change tokens in JSON, then run `npm run generate`; do not hand-edit generated CSS or SVG. Run `npm run build` before completing a change. Inspect altered layouts at mobile and desktop widths, and test keyboard and reduced-motion behaviour when interactions change. Document accepted design changes in the guidance and provenance file so future creators do not rely on superseded examples. Do not add a package, component framework or external service without a concrete need.
