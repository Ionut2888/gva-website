# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-04-14

## User Preferences

- User prioritizes professional, clean design over trendy aesthetics
- Prefers comprehensive design system over scattered component styles (CSS custom properties, 8px grid)
- Values spacing consistency — identified spacing issues as key design problem
- Accepts font substitutions if they improve design (Poppins + Sora chosen over Inter, user approved)

## Key Learnings

- **Project:** gva-website (Angular 20.3.5, GVA Verkaufer car transport company)
- **Description:** Professional car transport platform with hero slideshow, services, fleet, and contact sections
- **Design System:** Implemented comprehensive CSS custom properties (color, spacing 8px grid, typography, shadows, radius) in src/styles.scss
- **Component Architecture:** Standalone components with scoped SCSS; app-design.scss holds unified component styling
- **Typography:** Poppins (700,800) for display headers, Sora (400,600,700) for body text — loaded via Google Fonts in index.html
- **Color Palette:** Dark charcoal #1a1f2e (bg-dark) + teal accent #00d4ff for modern corporate aesthetic
- **Responsive:** Mobile-first with hamburger menu at <768px, full nav on desktop; slideshow and stats grid adapt properly
- **Key Components:** HomeComponent has signal-based image carousel with autoplay/manual controls; HeaderComponent uses signal for menu toggle
- **Content:** Footer services list corrected to actual transport services (not generic logistics); email unified as auto@gvaverkaufer.ro

## Key Learnings (continued)

- **SSR Setup:** `ng add @angular/ssr` fails due to peer dep conflict (@angular/core@20.3.4 vs required 20.3.19). Fix: `npm install @angular/ssr@20.3.4 @angular/platform-server@20.3.4 --legacy-peer-deps` then `npx ng generate @angular/ssr:ng-add`. The schematic creates server.ts, main.server.ts, app.config.server.ts, app.routes.server.ts automatically.
- **SSR Browser API Guard:** Any component that uses `interval`, `setTimeout`, `document`, or `window` must check `isPlatformBrowser(PLATFORM_ID)` or inject `DOCUMENT` token before accessing browser APIs.
- **SSR Prerendering:** app.routes.server.ts with `RenderMode.Prerender` and `path: '**'` prerendered all 6 routes at build time. Google sees fully rendered HTML including all h1/p content.
- **SeoService pattern:** Per-page meta tags managed via Angular's `Title` + `Meta` services in a singleton `SeoService`, initialized in app root `ngOnInit()`, subscribes to `NavigationEnd` events to update on each route change.
- **Budget warnings:** Angular component SCSS budget defaults at 6kB warning. home.component.scss (6.37kB) and contact.component.scss (6.64kB) exceed it. Fixed by bumping to 10kB warning / 20kB error in angular.json.

## Do-Not-Repeat

- [2026-04-14] app-design.scss imported by app.scss is NOT applied to child component elements — Angular ViewEncapsulation scopes those styles to app-root only. Always put section styles in the component's own .scss file.
- [2026-04-14] Hero `min-height: 100vh` with `padding-top: 80px` on `.main-content` causes the hero to overflow below the fold (user must scroll). Fix: use `height: calc(100vh - var(--hh))` on hero, not min-height.
- [2026-04-14] `mat-icon` requires font-size, width, height, AND line-height all set explicitly to render consistently. Setting only font-size causes clipping/alignment issues.
- [2026-04-14] Services component had featured card label as Ukrainian 'Популярний' in CSS ::before content — must use Romanian ('Recomandat').
- [2026-04-19] `ng add @angular/ssr --skip-confirmation` fails with npm peer dep conflict because project is on @angular/core@20.3.4 while ssr@latest requires 20.3.19. Always use `npm install @angular/ssr@20.3.4 --legacy-peer-deps` then run schematic separately.
- [2026-04-19] SSR prerendering fails with `[object Object]` error if any component calls `interval()` (RxJS) or `setTimeout` in `ngOnInit` without an `isPlatformBrowser()` guard. The SSR environment tries to prerender but hangs/crashes on browser APIs.
- [2026-05-10] `<textarea>` must have NO whitespace between opening and closing tags in Angular SSR templates. Whitespace creates a text node during SSR prerender; when Angular hydrates on client it doesn't find that text node → NG0500 hydration mismatch. This also causes mat-icon ligatures to fail rendering (cascade from hydration re-render). Fix: `<textarea ...></textarea>` (no newline, no spaces inside).
- [2026-05-10] Design system fully migrated to Stitch "Industrial Modern Fleet" tokens: --navy #101c2e, --blue #0051d5, --bg #f7f9fb, --r-sm 2px, Sora + Plus Jakarta Sans fonts. Keep content (Romanian text) exactly as-is — user confirmed content is correct.

- [2026-05-14] CSS Grid children ALWAYS need `min-width: 0` when they contain flex/grid descendants or `width:100%` inputs. Without it, grid children can exceed their cell width and overflow the container, breaking padding symmetry on mobile. Apply to every direct child of a grid container that has complex content.
- [2026-05-14] Responsive 2-col→1-col grid breakpoints: use `768px` not `560px`. At 560px the layout is already cramped on common mobile sizes (375px–768px). Standard mobile breakpoint is 768px.

## Decision Log

- [2026-05-10] Redesigned from dark-body theme to light-body (--bg: #f7f9fb) Stitch design: dark navy banners + footer, white cards with 1px border (no shadows), blue accent #0051d5, very sharp 2px border-radius for industrial look. User provided reference design from `stitch_elite_car_carriers` folder.

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
