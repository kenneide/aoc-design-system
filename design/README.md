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

Use a quiet reading surface with one dominant accent in most compositions. All eight original colours can appear together in the bands. The palette may inform UI and page structure even when the bands are absent. Do not force every colour into every artifact.

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
- The band demonstration runs for 1800 ms on request, then stops. No perpetual motion, scroll hijacking or text animation.
- Respect `prefers-reduced-motion` in CSS and JavaScript. Disable smooth scrolling and decorative transitions under that preference.
- Keep keyboard focus visible. Use descriptive control labels and live status for clipboard feedback. Clipboard failure must reveal the value for manual copying.

## Applications

**Website (06.1):** wordmark, generous heading, brief supporting copy, single action and dedicated graphic panel. This is an illustrative company homepage, not verified marketing copy.

**Slides (06.2):** lime title field, compact identity and cropped bands; content slide with a strong heading, white reading field and a few aligned points. These are HTML specimens, not PowerPoint files.

**Business card (06.3):** new square card concept based on the known 65 × 65 mm, double-sided, 300 g/m² kraft format. The screen mockup represents colour relationships, not substrate behaviour. The historic kraft specification does not establish a white underprint. Confirm paper, colour process, bleed and safe area with the printer; white portions may be unprinted stock. A physical proof is necessary before approving production.

## Feedback and decision process

Link to the section or specimen when opening a design feedback issue. Describe what feels right, what should change and the intended result. Preserve established references, and update tokens, examples and written rules together when a proposed choice changes. Record the accepted decision and its source in `PROVENANCE.md`. Do not describe this version as approved until the owner has explicitly reviewed it.

## Live control patterns / v0.2

The `#controls` playground demonstrates native range, switch, radio group, checkbox, text and select inputs, primary/secondary/disabled buttons, in-place action feedback and a modal panel. Controls immediately update a local composition; no data is sent or stored. Arrow keys operate the slider and radio group; Space toggles switches and checkboxes. The dialog traps focus natively, closes with Escape, and returns focus to its opener.

Interaction references: Gym Circuit Logger (native effort slider, 700 ms palette settling, 420/320 ms panel opening/closing, interruption cancellation) and Mise en Place (quick control feedback). These are behavioural references, not inherited branding. The sliding selection marker uses the 400 ms settling token. Range input follows the pointer immediately, with a short visual settling response. No simulated network request or artificial loading delay. Reduced motion removes transitions and modal animation while preserving all state changes.

## Inspiration and waveform assets / v0.3

The owner clarified the tone as gold: `#96845C` remains the sampled sRGB value, now named `gold`. This is a flat digital representation; metallic gold is a separate print finish, not simulated with gradients. The previous `olive` token is renamed to `gold` in this pre-release system; consumers should update `colour.olive` and `--colour-olive` to `colour.gold` and `--colour-gold`.

The flowing graphics express the owner’s audio roots through organic sinusoids. `npm run generate` creates three flat-colour SVG variants: `bands.svg` (organic wave), `bands-calm.svg` (long wave), `bands-resonance.svg` (stronger harmonic character), plus `signal.svg` (line-wave illustration). Curves combine a fundamental sine and a second harmonic, represented by cubic Hermite segments using analytic derivatives. Parallel offsets preserve band order and prevent crossings. Geometry is a new proposal; the original raster stays unchanged.

The `#inspiration` section links to Moscow 1980 poster collections, Munich 1972 design references, and external SVG emblem records. Historical emblems are reference links, not company assets; poster scans are not relabelled as SVG masters. The owner’s intended optimism is clean construction, bright contrasts, reaching forward and shared societal progress, not gritty science fiction.
