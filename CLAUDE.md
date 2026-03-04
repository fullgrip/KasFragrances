# KAS Fragrances - Project Guidelines

## Frontend Architecture

### Mobile-First Design
The frontend follows **mobile-first responsive design** using Tailwind CSS:
- Base styles target mobile devices
- Breakpoints use `min-width` (sm:, md:, lg:, xl:) to progressively enhance for larger screens
- Never use max-width media queries or desktop-first patterns
- Example pattern: `text-base md:text-lg lg:text-xl` (not the reverse)
