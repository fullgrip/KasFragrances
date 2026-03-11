# KAS Fragrances - Project Guidelines

## Feature Flags

Feature flags are located in `src/config/features.ts`.

### Discovery Set (Currently Disabled)
The Discovery Set product is hidden from the site but ready to launch.

**To enable the Discovery Set:**
1. Open `src/config/features.ts`
2. Change `DISCOVERY_SET_ENABLED: false` → `DISCOVERY_SET_ENABLED: true`
3. Deploy

This single change will:
- Show "Discovery Set" in header and footer navigation
- Show Discovery Set CTA section on homepage
- Show "Try the Discovery Set" button on hero and about page
- Include Discovery Set in the collection page
- Show the Discovery Set testimonial
- Remove "Coming Soon" banner from product page

## Frontend Architecture

### Mobile-First Design
The frontend follows **mobile-first responsive design** using Tailwind CSS:
- Base styles target mobile devices
- Breakpoints use `min-width` (sm:, md:, lg:, xl:) to progressively enhance for larger screens
- Never use max-width media queries or desktop-first patterns
- Example pattern: `text-base md:text-lg lg:text-xl` (not the reverse)
