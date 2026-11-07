# References and decision status

## Established by the owner

- Name: Alan O Cinneide Software BV.
- Use across websites, presentations, business cards and future artifacts; make decisions discoverable for AI models.
- Public GitHub repository, GitHub Pages reference site and GitHub issue feedback.
- The colours of the surviving card artwork are particularly important. Use the bands as a selective signature motif alongside calm, readable layouts.
- Retro-futuristic direction inspired by Munich 1972 and **Moscow** 1980.
- Smoothness and animation from previous websites may inform interaction. Maestro's visual branding is explicitly excluded.
- The original business-card design is lost. Continue from the surviving background, proposing typography.

## Surviving asset

`assets/reference/BusinessCardBackground.png`: owner-supplied artwork, 1179 × 286 px, Display P3. Copied from the owner's business documents without modifying image bytes. This is a background reference, not a complete card, vector master or print-ready file.

The historical card format was established from private records: 65 × 65 mm, double-sided full colour, 300 g/m² kraft. No receipts, addresses, customer/order numbers or administrative records are included here.

The original eight flat-region colours are converted from Display P3 to sRGB for tokens. Exact integer conversion values are recorded in `tokens.json`; anti-aliased edge pixels are excluded by selecting the dominant exact RGB regions. The result is not a CMYK or spot-colour match.

## Proposed in v0.1 / awaiting owner review

- Space Grotesk as the family, neutral colours, semantic roles, spacing and motion tokens.
- The SVG band geometry, wordmark typography and favicon.
- All specimen compositions and marketing copy, including “Clear thinking. Colourful possibilities.” and “Good ideas. Built to work.”
- Presentation and business-card layouts are new interpretations. They do not reconstruct the lost design or establish production-ready dimensions beyond the known square card size.

## Historical research

- [The Rainbow Games — Otl Aicher 100 / IDZ](https://www.otlaicher.de/en/articles/the-rainbow-games/): Munich's coordinated colour identity.
- [Going for Gold — Cooper Hewitt, Smithsonian Design Museum](https://www.cooperhewitt.org/2019/04/05/going-for-gold/): Aicher's Munich identity and its cross-media applications.
- Moscow 1980 is an owner-named visual influence; no historical palette or typography is claimed to be reproduced here.

These references describe influences, not affiliation or endorsement. No Olympic marks are used.

## Font provenance

Space Grotesk variable TTF and OFL.txt obtained from the Google Fonts `ofl/spacegrotesk` directory, 7 November 2026. Copyright 2020 The Space Grotesk Project Authors. [Upstream project](https://github.com/floriankarsten/space-grotesk). Distributed under SIL Open Font License 1.1; see the bundled licence.

## Review log

2026-11-07 — v0.1 proposed. Awaiting visual review; no subsequent choices are marked approved.

2026-11-07 — v0.2: owner requested less prose and hands-on input/motion examples from recent repos. Added control patterns informed by Gym Circuit Logger and Mise en Place; visuals remain this house style. These new specimens are proposed interpretations.

2026-11-07 — v0.3: owner corrected the grounded tone to **gold** and established organic sinusoids as the motif’s link to personal audio roots. Clarified optimistic retrofuturism as bold contrasts, clean lines and shared progress. Preserved the sampled gold value; renamed the token. Added three generated sinusoidal band variants and a signal illustration, with new geometry still proposed for visual review.

### Added visual references

- [Moscow 1980 rocket/flame poster — Olympic Museum](https://olympic-museum-artefacts.zetcom.net/en/collection/item/109162/): collection record credits Martin Krastev and describes a rocket-stylised flame, with blue, multicolour and gold.
- [Moscow poster — People’s Graphic Design Archive](https://peoplesgdarchive.org/item/1728/moscow-olympics-poster) and [cultural programme poster](https://peoplesgdarchive.org/item/2884/cultural-program-of-the-moscow-olympic-games): linked historical graphics.
- [Moscow emblem SVG redraw — Openclipart, rones](https://openclipart.org/detail/98035/olympiad1980-emblem) and [Munich emblem SVG — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Logo_M%C3%BCnchen_1972.svg): external vector reference records, not original poster files.

Historical references are linked, not bundled or used as company identity assets. The signal and band SVGs are original generated illustrations.

2026-11-07 — owner explicitly standardised the company name as **Alan O Cinneide Software BV**, superseding the earlier shortened display-name convention. Added the inquiry address used in the owner's existing invoicing configuration and KVK 84179686 confirmed in registry correspondence to the public identity record. The owner requested publication of inquiry and KVK links; no administrative source files are published.

2026-11-07 — owner requested offset sinusoids and every brand colour, explicitly including red. Replaced the three crossing signals with eight evenly spaced, non-crossing waveforms. Rebalanced all band variants to keep red and yellow visible within the exported canvas.

2026-11-07 — owner explicitly required the whole colour spectrum in company-facing website headers and footers after reviewing the Gym Circuit Logger pitch. A lime highlight alone is insufficient. Established this framing rule for desktop/mobile and light/dark layouts, with separate quiet text surfaces. Added a token-generated compact spectrum ribbon and applied it to the reference website; other proposed design values retain their existing status.

Validation for the website framing update: `npm run build` passed all 8 checks. Generated spectrum colours come directly from the shared tokens. Reference-site header/footer layouts were visually inspected at 320px and 1280px and measured at 320/390/1280px with no horizontal overflow. Ribbons remain 32px on phones and 48px on desktop. No push or publication was performed.

2026-11-07 — owner requested less lumpy waves: clean, mostly smooth broadband shapes with identical offsets and amplitudes. First revision lengthens the waves and reduces higher-harmonic amplitudes, using an identical shared signal for every boundary. Geometry is now token-defined. This implementation is a proposal awaiting screenshot feedback, not an approved final shape.

2026-11-07 — owner approved the smoother wave direction (“Yes! Much better.”) and requested related footers, eyebrows and accents. Added a working `#wave-details` section: three eyebrow treatments, two accents and two footer concepts. Added a token-generated shallow wave trim using the same harmonic profile and parallel offsets. The smoother direction is accepted; these new applications and their illustrative copy await visual review. Desktop (1440px) and phone (390px) screenshots inspected; no phone horizontal overflow. `npm run build` passes all 8 checks.

2026-11-07 — owner responded “Excellent” to the wave footer, eyebrow and accent specimens and requested more slide templates using these and other design-system elements. Added twelve 16:9 layouts with editable Space Grotesk text, a native chart with clearly illustrative data, shared palette surfaces, grid/rule compositions and selective existing wave artwork. Exported an editable PPTX and full-size previews, replacing the two early HTML thumbnails in the site gallery. The new slide layouts await owner visual review. No customer claims, testimonials or company metrics are asserted.

Slide validation: inspected all twelve rendered slides and the reference gallery at desktop (1440px) and mobile (390px), with no horizontal overflow. PPTX package, geometry, font-family use, native chart/workbook consistency and first-party reimport checks passed. `npm run build` passes all 8 checks. The deck was not opened in native PowerPoint; its font must be installed on the presenting machine.

2026-11-07 — owner requested a dark version of the style and a reference-site toggle. Added proposed night/charcoal reading surfaces, paper/mist text, lime actions and yellow focus, expressed through generated semantic dark roles. The eight sampled artwork colours remain unchanged. A native pressed-state button follows the system preference initially and remembers explicit choices with guarded local storage; CSS also supports system dark mode without JavaScript. Light/ink footer concepts and physical card/slide artwork retain their specimen palettes. Dark-mode direction is requested; exact new neutrals await visual review.

Dark-mode validation: `npm run build` passes all 11 checks, including semantic contrast and theme preference/storage handling. Inspected dark desktop and phone layouts, mobile controls and the footer; light desktop and phone views also checked. Measured no horizontal overflow at 320px and 390px. Verified Space/Enter activation and persistence after reload. Theme switching introduces no animation; existing reduced-motion control tests pass. No publication performed.

2026-11-07 — owner clarified that presentations will be online HTML and requested their inclusion on the site. Superseded the PPTX-first approach with twelve native HTML/CSS templates in `presentations/`, linked from live site previews. Reused shared SVG artwork and locally hosted typography. Added presentation/overview modes, direct slide links, keyboard and touch controls, optional browser fullscreen, and all-slide printing. JavaScript-disabled reading remains available. Earlier exported PPTX/PNG assets remain secondary historical artifacts. New layout implementations await visual feedback.

HTML presentation validation: build passes all 12 checks. Browser checks under a repository URL prefix passed for deep links, arrow/Space/Home/End navigation, endpoint button states, Escape/focus return, reduced motion, all-slide printing, live preview selection and JavaScript-disabled reading. Gallery and presentation layouts inspected at 1440px and 390px, with no horizontal overflow. This update changes repository source and build output; it has not been published remotely.

2026-11-07 — owner requested gradual dark-mode transitions like Gym Circuit Logger and explicitly established this as a smoothness standard. Read its `src/client/brand.js` palette transition: 700 ms smoothstep interpolation of sRGB channels, interruption cancellation and immediate reduced-motion application. Added shared `motion.theme` and equivalent `motion.themeEase` tokens, and implemented the same behaviour for this site’s semantic CSS roles. Both manual and system changes blend, initial theme selection stays immediate, reversals use current displayed values, and mid-transition reduced motion settles immediately. Brand artwork and slide compositions remain fixed. Supersedes the earlier no-animation theme-switch decision; the existing colour proposals retain their status.

Theme-settling validation: `npm run build` passes all 15 checks. Deterministic tests cover intermediate sRGB values, cancellation/reversal, system changes, inline-value cleanup and reduced-motion changes during a blend. Browser checks verified visible intermediate colours, exact final endpoints, keyboard activation, rapid reversal, immediate saved-theme reload and reduced-motion cancellation. Desktop (1440px) and phone (390px) layouts inspected; phone width has no overflow.
