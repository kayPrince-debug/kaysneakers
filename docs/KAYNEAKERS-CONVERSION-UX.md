# KaySneakers — Conversion Elements & UX Patterns

## Conversion Philosophy
Every interaction should reduce friction, build trust, and guide the user toward a purchase or signup. Mobile-first, thumb-friendly, and guest-inclusive.

---

## High-Impact CTAs

### Primary CTAs
| Location | Label | Behavior |
|----------|-------|----------|
| Hero | "Shop the Collection" | Scroll to collections or `/collections/sneakers` |
| Product Page | "Add to Cart" | Add item, show cart confirmation |
| Collection | "Quick Add" / "Add to Cart" | Add from grid (modal confirmation) |
| Cart | "Proceed to Checkout" | Navigate to checkout |
| Checkout | "Complete Purchase" | Submit order |

### Secondary CTAs
| Location | Label | Behavior |
|----------|-------|----------|
| Product Page | "Shop the Collection" | Link to category |
| Cart | "Continue Shopping" | Back to last collection |
| Checkout | "Return to Cart" | Edit cart |

### Design Specs
- **Contrast:** Black button on light bg, or white button on dark bg
- **Size:** Min 48px height, min 44px touch target
- **Placement:** Above the fold, bottom-right on mobile (thumb zone)
- **Copy:** Action-oriented, present tense ("Add to Cart" not "Submit")

---

## Product Page Conversion Stack

### 1. Image Gallery
- 5–7 high-res images per product
- Zoom on hover (desktop) / pinch-zoom (mobile)
- 360° or 3D view if feasible (e.g., Model Viewer, Threekit)
- Sticky gallery on scroll (desktop)

### 2. Size Guide (Interactive)
- Modal or inline expandable section
- Fields:
  - **Length:** US/EU/UK conversion
  - **Width:** Narrow / Regular / Wide
  - **Arch height:** Low / Medium / High
- Link to full size guide page
- "Still unsure?" → triggers AI chat for sizing help

### 3. Add to Cart Block
- Size selector (required)
- Width selector (if applicable)
- Quantity (default 1)
- Add to Cart button (sticky on mobile)
- Fit Guarantee badge beneath CTA

### 4. Trust Signals
- Secure checkout icons (Visa, MC, Amex, PayPal, etc.)
- "Free shipping over $X"
- "30-day Fit Guarantee"
- "Sustainable materials"

---

## Checkout Flow (Streamlined)

### Steps
1. **Cart** → Review items, promo code, shipping estimate
2. **Checkout** → Single page or 2 steps max
   - Contact (email)
   - Shipping address
   - Payment
   - Order review

### Guest-Friendly
- No forced account creation
- "Create account" checkbox at end
- Save cart for later (email capture)
- One-page checkout option

### Security
- SSL (HTTPS) badge visible
- Payment icons: Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay
- "Secure checkout" copy
- No sensitive data in URL or logs

---

## Trust & Support Sections

### Fit Guarantee
- Dedicated page: `/fit-guarantee`
- Summary on PDP and footer
- Copy: "30-day free exchange if the fit isn't perfect"

### Live AI Chat (Sizing Support)
- Floating widget (bottom-right)
- Triggers: "Need sizing help?" link, first-time visitor (optional)
- AI trained on: size chart, width, arch, common FAQs
- Fallback to human agent during business hours

### Footer
- **Customer Service:** Contact, FAQ, Size Guide, Fit Guarantee
- **Policies:** Returns, Shipping, Privacy
- **Company:** About, Sustainability
- **Social:** Instagram, LinkedIn, etc.

---

## Social Proof

### As Seen In
- Logos: GQ, Forbes, Hypebeast, etc.
- Grayscale or low-opacity treatment
- Links to mentions (if available)

### Reviews
- Star rating (1–5) + count
- Short excerpts (2–3 lines)
- "Verified Purchase" badge
- Link to full reviews

### Urgency (Use Sparingly)
- "X pairs left" only when true
- "Free shipping over $150" (value, not fear)

---

## Performance Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Full page load:** < 3s on 3G (mobile)
