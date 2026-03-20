# KaySneakers — Design Guidelines

## Brand Essence
Clean. Bold. Minimalist. Premium without being ostentatious. The visual language should feel like the shoes: refined, functional, and effortlessly confident.

---

## Color Palette

### Primary
| Name | Hex | Usage |
|------|-----|-------|
| **Jet Black** | `#0A0A0A` | Headers, primary text, footer background |
| **True Black** | `#000000` | CTAs, accents, borders |
| **Soft White** | `#FAFAF9` | Backgrounds, cards |
| **Off White** | `#F5F5F4` | Alternate backgrounds, subtle contrast |

### Accent
| Name | Hex | Usage |
|------|-----|-------|
| **Charcoal** | `#262626` | Secondary text, icons |
| **Warm Gray** | `#737373` | Tertiary text, placeholders |
| **Light Gray** | `#A3A3A3` | Disabled states, dividers |

### CTA & Interactive
| Name | Hex | Usage |
|------|-----|-------|
| **Primary CTA** | `#0A0A0A` | Add to Cart, Shop the Collection (high contrast) |
| **Primary CTA Text** | `#FFFFFF` | Button text |
| **Secondary CTA** | `#FFFFFF` | Outline buttons, ghost CTAs |
| **Hover State** | `#262626` | CTA hover |

### Accessibility
- Minimum contrast ratio: **4.5:1** for body text, **3:1** for large text
- Focus states: 2px outline in `#0A0A0A` or `#FFFFFF` depending on background

---

## Typography

### Font Stack

**Primary — Headlines & Display**
- Font: **Satoshi** or **Clash Display** (geometric, modern)
- Fallback: `"DM Sans", "Inter", system-ui, sans-serif`

**Secondary — Body & UI**
- Font: **Inter** or **DM Sans** (clean, readable)
- Fallback: `system-ui, -apple-system, sans-serif`

**Optional — Distinctive Accent**
- Font: **Instrument Sans** or **General Sans** for brand voice moments

### Type Scale (mobile-first, scale 1.25)

| Token | Size (Desktop) | Size (Mobile) | Weight | Usage |
|-------|----------------|---------------|--------|-------|
| `h1` | 48px / 3rem | 32px / 2rem | 600–700 | Hero headline |
| `h2` | 36px / 2.25rem | 28px / 1.75rem | 600 | Section titles |
| `h3` | 24px / 1.5rem | 20px / 1.25rem | 600 | Card titles |
| `h4` | 18px / 1.125rem | 16px / 1rem | 600 | Subsections |
| `body` | 16px / 1rem | 16px / 1rem | 400 | Body copy |
| `small` | 14px / 0.875rem | 14px / 0.875rem | 400 | Captions, labels |
| `tiny` | 12px / 0.75rem | 12px / 0.75rem | 400 | Legal, footnotes |

### Line Heights
- Headlines: `1.1`–`1.2`
- Body: `1.5`–`1.6`
- Small: `1.4`

---

## Spacing & Layout

### Grid
- 12-column grid (desktop), 4-column (tablet), 1-column (mobile)
- Gutter: 24px (desktop), 16px (mobile)
- Max content width: **1280px**

### Spacing Scale (8px base)
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- `4xl`: 96px

### Section Padding
- Vertical: 64px (desktop), 48px (mobile)

---

## Components

### CTA Buttons
- **Primary:** Black bg, white text, min height 48px, border-radius 4px
- **Secondary:** White bg, black border, black text
- Thumb-friendly: min touch target **44×44px**
- High contrast at all times

### Cards (Product)
- White/off-white background
- Subtle border or shadow: `0 1px 3px rgba(0,0,0,0.06)`
- Hover: slight lift `translateY(-2px)`, shadow `0 4px 12px rgba(0,0,0,0.08)`

### Images
- Product: 1:1 aspect ratio, high-res (min 1200px wide for zoom)
- Hero: 16:9 or full bleed

---

## Motion & Micro-interactions
- Page transitions: subtle fade (200–300ms)
- Button hover: 150ms ease
- Add to cart: brief scale + checkmark confirmation
- Skeleton loaders for images and product grids

---

## Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| `xs` | 0–479px | Small phones |
| `sm` | 480–767px | Large phones |
| `md` | 768–1023px | Tablets |
| `lg` | 1024–1279px | Laptops |
| `xl` | 1280px+ | Desktops |

---

## Iconography
- Style: Outlined, 24px default, stroke 1.5px
- Library: Lucide, Phosphor, or custom SVG set
- Consistent weight and size across UI
