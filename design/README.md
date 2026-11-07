# House style / v0.3

**Status: proposed visual system.** The reference artwork and user direction are established. Typography, exact digital palette, compositions and motion values are proposals to refine through feedback.

## Company identity and contact

Use **Alan O Cinneide Software BV** everywhere the company is named, including wordmarks, page titles, specimen branding and company references. Keep **BV** without periods, as specified by the owner. A line break before “Software BV” is allowed; do not omit the suffix.

[company.json](company.json) is the canonical public identity record. Inquiry links use `mailto:alan.ocinneide@gmail.com`. Website footers show the full company name, an email inquiry link and **KVK 84179686** linked to the official KVK search for that number. The site and specimens use these values; tests check the footer against the shared record. Changes to contact details must update the record and all corresponding links together.

## Character

Retro-futuristic: optimistic colour, geometric clarity and a sense of forward movement. Use Munich 1972 and Moscow 1980 as references for the ambition of a coherent identity across media. The company's own flowing-band artwork takes precedence over historical imitation. The aim is an expressive identity with clear information, suitable for professional websites, presentations and small printed objects.

## Colour

The original PNG embeds a Display P3 profile. The values below are the dominant flat regions converted to sRGB with Pillow's LittleCMS-backed `ImageCms.profileToProfile`, then counted by exact RGB frequency. This is a digital starting palette, not a recovered print specification.

| Name | sRGB | Intended use |
| --- | --- | --- |
| Blue | `#038BCD` | Graphic accents, bands |
| Green | `#009037` | Graphic accents, bands |
| Lime | `#B2C906` | Signature light field, emphasis, bands |
| Gold | `#96845C` | Flat digital gold, bands |
| White | `#FFFFFF` | Reading surfaces, separation, bands |
| Orange | `#F7A800` | Light accent fields, bands |
| Yellow | `#FFEE16` | Light accent fields, bands |
| Red | `#E5312C` | Small graphic accents, bands |
| Ink | `#20231D` | Proposed default text and actions |
| Paper | `#F6F5EF` | Proposed soft neutral background |
| Muted | `#5D6257` | Proposed secondary text on paper/white |
| Line | `#D8D9CE` | Proposed decorative separators |

Use ink on paper, white, lime, yellow and orange; use white on ink. These pairs meet 4.5:1 contrast for normal text. Muted on paper and white also meets 4.5:1. Blue, green, red and gold are graphic colours; do not assume white or ink body text will pass on them. Check any new pair. Never rely on colour alone to convey state.

Use quiet reading surfaces and a dominant accent within content. Company-facing websites must also show the complete eight-colour spectrum prominently in both the header and footer: red → blue → green → lime → gold → white → orange → yellow. A lime highlight alone is not a sufficient company identity statement. This website framing requirement does not require every colour in every control, content section or non-website artifact.

## Typography and hierarchy

Space Grotesk is the proposed family, chosen for a geometric, technical character with distinctive details. Its bundled variable font supports weights 300–700. Use 400 for body copy, 500 for headings and 500–600 for compact identity text. The fallback is Arial, sans-serif. Do not use the font's heavier weights for every element.

Web body text starts at 16 px with 1.6 line height; specimens may use smaller text to represent an artifact at reduced scale. Limit body line length to roughly 45–75 characters. Display type uses tight tracking (about −0.06 em) and approximately 1.0 line height; headings use −0.04 em and 1.1–1.15. Small uppercase labels use slight positive tracking and should be brief. Scale display type responsively; never clip words to preserve a desktop composition.

For presentations, use physical slide sizes with a minimum body size appropriate to the audience (start around 24 pt at full 16:9 slide size). Website thumbnails are scaled visual specimens, not presentation templates. For print, verify actual-size legibility and use the provided font under its licence.

## Layout and graphic

Use a 4 px spacing foundation: 4, 8, 12, 16, 24, 32, 48, 64 and 96 px. Content spans at most 1440 px on the reference site, with gutters from 20 to 64 px. Establish reading order using type size, alignment, spacing and thin rules. Use asymmetric two-column layouts where a large statement balances explanatory copy. Stack at small widths. Corners are square or minimally rounded (2 px on controls).

The `assets/bands.svg` graphic is generated from shared tokens. It is a new interpretation of the surviving artwork, with broad continuous curves and flat fills. Preserve the sequence red → blue → green → lime → gold → white → orange → yellow. Crop freely inside a visual area, without stretching the curve proportions. The original has different curve geometry; preserve it as evidence, not as an editable master.

Give the motif a dedicated area. Avoid running body text across moving or multicolour bands. Do not add gradients, shadows within the bands, faux grain or ornamental Olympic iconography. The reference site uses restrained shadows only for physical card staging and interactive response.

## Motion and interaction

- Quick response: 180 ms. Settling transitions: 400 ms. Ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Theme changes: 700 ms (`motion.theme`), with smoothstep easing (`motion.themeEase`, the equivalent cubic Bézier). Blend semantic palette colours together in sRGB, following Gym Circuit Logger. Apply initial and saved themes before first paint without animation. Interruptions reverse from the current displayed colours. Reduced motion applies the destination immediately, including when enabled during a blend. Keep layout, text position and artwork colours fixed.
- The band demonstration runs for 1800 ms on request, then stops. No perpetual motion, scroll hijacking or text animation.
- Respect `prefers-reduced-motion` in CSS and JavaScript. Disable smooth scrolling and decorative transitions under that preference.
- Keep keyboard focus visible. Use descriptive control labels and live status for clipboard feedback. Clipboard failure must reveal the value for manual copying.

## Applications

**Website (06.1):** wordmark, generous heading, brief supporting copy, single action and dedicated graphic panel. Company-facing websites use a prominent, full-width spectrum ribbon in both the header and footer, including on phones and in light/dark modes. Use `assets/spectrum.svg` for a compact frame or a complete flowing-band composition that leaves all eight colours visible. Keep navigation, identity and contact text on separate quiet reading surfaces. Do not crop out colours or reduce the frame to a single accent or hairline; start at 32 px high on phones and 48 px on larger screens. The rectangular spectrum ribbon may scale to its container; flowing curves retain their proportions. This is an illustrative company homepage, not verified marketing copy.

**Slides (06.2):** HTML is the primary presentation format, as specified by the owner. Twelve native HTML/CSS layouts are linked at `#slide-templates` and live in `presentations/index.html`. The site gallery embeds live previews of those same layouts. Paper/lime titles, ink section and closing layouts, agenda, two-column content, statement, comparison, roadmap, data chart, visual with commentary and decision layouts use shared colours, the locally hosted Space Grotesk font, precise alignment and selective SVG wave accents. Keep 16:9 compositions, with proportional container-relative type and positioning. Use the wave trim at its native proportions for eyebrows and footers, and broad crops in dedicated graphic areas. Presentation view supports buttons, keyboard navigation, direct slide links and optional browser fullscreen. The full document remains readable without JavaScript and prints all slides. Content and chart values are illustrative. See `presentations/README.md` for reuse. The earlier PPTX and PNG exports are historical secondary artifacts, not the source of the online presentations.

**Business card (06.3):** new square card concept based on the known 65 × 65 mm, double-sided, 300 g/m² kraft format. The screen mockup represents colour relationships, not substrate behaviour. The historic kraft specification does not establish a white underprint. Confirm paper, colour process, bleed and safe area with the printer; white portions may be unprinted stock. A physical proof is necessary before approving production.

## Feedback and decision process

Link to the section or specimen when opening a design feedback issue. Describe what feels right, what should change and the intended result. Preserve established references, and update tokens, examples and written rules together when a proposed choice changes. Record the accepted decision and its source in `PROVENANCE.md`. Do not describe this version as approved until the owner has explicitly reviewed it.

## Live control patterns / v0.2

The `#controls` playground demonstrates native range, switch, radio group, checkbox, text and select inputs, primary/secondary/disabled buttons, in-place action feedback and a modal panel. Controls immediately update a local composition; no data is sent or stored. Arrow keys operate the slider and radio group; Space toggles switches and checkboxes. The dialog traps focus natively, closes with Escape, and returns focus to its opener.

Interaction references: Gym Circuit Logger (native effort slider, 700 ms palette settling, 420/320 ms panel opening/closing, interruption cancellation) and Mise en Place (quick control feedback). These are behavioural references, not inherited branding. The sliding selection marker uses the 400 ms settling token. Range input follows the pointer immediately, with a short visual settling response. No simulated network request or artificial loading delay. Reduced motion removes transitions and modal animation while preserving all state changes.

## Inspiration and waveform assets / v0.3

The owner clarified the tone as gold: `#96845C` remains the sampled sRGB value, now named `gold`. This is a flat digital representation; metallic gold is a separate print finish, not simulated with gradients. The previous `olive` token is renamed to `gold` in this pre-release system; consumers should update `colour.olive` and `--colour-olive` to `colour.gold` and `--colour-gold`.

The flowing graphics express the owner’s audio roots through organic sinusoids. `npm run generate` creates three flat-colour SVG variants: `bands.svg` (organic wave), `bands-calm.svg` (long wave), `bands-resonance.svg` (stronger harmonic character), plus `signal.svg` (line-wave illustration). Curves combine a broad fundamental and subtle second, third and fifth harmonics, represented by cubic Hermite segments using analytic derivatives. Wave geometry lives in `tokens.json` under `wave`. Every boundary uses exactly the same phase and amplitude with a constant vertical offset; higher-frequency components are restrained to keep the contours clean and smooth. Parallel offsets preserve band order and prevent crossings. Geometry is a new proposal; the original raster stays unchanged.

The `#inspiration` section links to Moscow 1980 poster collections, Munich 1972 design references, and external SVG emblem records. Historical emblems are reference links, not company assets; poster scans are not relabelled as SVG masters. The owner’s intended optimism is clean construction, bright contrasts, reaching forward and shared societal progress, not gritty science fiction.

Waveform refinement: show all eight brand colours, including red, in each complete exported graphic. The signal illustration uses evenly spaced vertical offsets of a shared sinusoid, with no crossings, on ink so white remains visible. Band boundaries leave visible space for both red and yellow rather than pushing red outside the canvas.

## Wave details / visual review

The owner accepted the smoother, broader wave direction on 7 November 2026. Keep identical amplitude, phase and constant vertical spacing across the shared contours; restrained higher harmonics give character without extra bulges.

`#wave-details` demonstrates three eyebrow treatments (colour tab, signal on ink and floating ribbon), two content accents (wave rule and edge crop), and paper/ink footer concepts. The owner responded positively to these applications (“Excellent”) before requesting slide templates; individual compositions remain working references rather than immutable specifications. `assets/wave-trim.svg` is generated from `wave.trim` geometry for shallow placements; preserve its aspect ratio rather than flattening the full-size wave artwork. Footer specimens keep all eight colours visible and company/contact information on quiet surfaces. Specimen headlines are illustrative copy.

## Dark mode / screen proposal

Use `darkRole` in `tokens.json` for screen themes: night `#151813` for the page, charcoal `#252A22` for raised reading surfaces, paper for primary text, mist `#BFC5B6` for secondary text, and `#4A5144` for decorative rules. Lime actions use ink text; yellow marks focus. Use semantic CSS roles (`--background`, `--surface`, `--text`, `--secondary-text`, `--border`, `--action`, `--on-action`, `--focus`) instead of changing the brand palette. Body and secondary text on both dark surfaces, and ink on lime actions, meet AA contrast for normal text. Rules are decorative; input boundaries use the stronger secondary-text role.

Keep all eight spectrum colours unchanged in artwork and header/footer ribbons. Preserve light and ink specimens when their surface is part of the demonstrated artifact; print and slide artwork does not invert with the website. The reference site follows `prefers-color-scheme` until the user activates the native “Dark mode” toggle. Its pressed state means dark mode is enabled. An explicit choice is stored locally when available, applied before styles load, and retained on reload. Without JavaScript the system preference still themes reading surfaces and the unavailable toggle stays hidden. Theme changes use the standard 700 ms shared palette blend described above. `theme.js` resolves source and destination values from the generated semantic CSS roles, then interpolates those roles together. Completed blends release temporary inline values back to CSS. Component colour transitions must not add a second delay during palette settling; use `--theme-colour-response` with the ordinary interaction duration as fallback.

The owner requested dark mode and a toggle on 7 November 2026. These exact dark neutrals and compositions remain a proposal awaiting visual feedback.

Smooth theme settling is an owner-established smoothness requirement, superseding the earlier immediate theme-switch behaviour. The Gym Circuit Logger reference is `src/client/brand.js`, `createPaletteTransition`: 700 ms, smoothstep progress and sRGB channel interpolation. Its branding is not inherited.
