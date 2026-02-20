
# LUXURY HOTEL WEBSITE – MASTER DESIGN DOCUMENT

Project Vision
A modern luxury hotel website that feels cinematic and aspirational, but converts like a booking engine. The experience should feel calm, premium, and immersive — not template-like.

Tone
Refined. Spacious. Warm. Confident. Minimal.

---

# 1. Core Design Philosophy

Image 1 Strengths:
• Warm beige luxury palette
• Layered image cards
• Emotional lifestyle positioning
• Inline booking widget

Image 2 Strengths:
• Strong hero contrast
• Clear price visibility
• Trust stats section
• Structured room grid
• Better hierarchy

Final Direction:
Combine the emotional warmth + structured clarity + add modern glass + subtle motion.

---

# 2. Visual System

Color Palette

Primary Background: Soft Ivory (#F5F1EA)
Accent Gold: #C8A45D
Dark Charcoal: #1B1B1B
Muted Brown: #3A342E
Glass Tint: rgba(255,255,255,0.15)

Typography

Headings: Playfair Display (serif luxury tone)
Body: Inter or Poppins

Spacing System

8px grid
Section padding: 100–120px
Wide content container: 1280px

---

# 3. Navigation Bar – Glassmorphism Implementation

Position
Sticky, top fixed

Style

Background:
rgba(255, 255, 255, 0.15)

Backdrop:
backdrop-filter: blur(14px)
saturate(120%)

Border:
1px solid rgba(255,255,255,0.25)

Shadow:
Soft subtle elevation

Behavior

On page load:
Transparent glass

On scroll:
Glass becomes slightly more opaque:
rgba(255,255,255,0.25)

Logo left
Menu center
Reservation CTA right (gold filled)

Hover effect:
Text color transitions to gold
Smooth 300ms easing

Mobile:
Glass slide-in drawer

This keeps luxury feel but modernizes the UI.

---

# 4. Hero Section – Cinematic + Fluid Simulation

Height:
100vh

Background:
High-end interior or slow luxury lifestyle video

Overlay:
Dark gradient 40% to improve contrast

Fluid Simulation Layer (Subtle)

Behind text, but above background image.

Implementation concept:

• Use Three.js or WebGL
• Transparent canvas overlay
• Low-opacity fluid distortion
• Warm gold-tinted fluid highlights
• Slow movement (barely noticeable)
• Responsive to mouse movement

Effect style:
Soft flowing light waves
Not chaotic
No bright colors
Opacity 0.1–0.2

The fluid should feel like:
Luxury silk fabric moving in slow air.

Performance:
Cap FPS at 30
Pause on mobile if low-end device

---

# 5. Hero Content Structure

Large Heading (Serif)
Find Your Perfect Stay

Subtext
Experience modern luxury and timeless comfort.

Primary CTA:
Book Now (Gold button)

Secondary CTA:
Explore Rooms (Outline)

Below Hero (Floating Glass Card Booking Bar)

Glass booking widget:
rgba(255,255,255,0.2)
Blur 18px
Rounded 16px

Fields:
Room type
Check-in
Check-out
Guests
Promo code (optional)

CTA:
Check Availability

Shadow:
Soft floating elevation

This merges Image 1's inline booking with modern glass styling.

---

# 6. About Section

Two column layout.

Left:
Short brand story.
Luxury tone.
Minimal text.

Right:
Stacked overlapping image cards (from Image 1 inspiration)

Micro animation:
Images slightly parallax on scroll.

CTA:
Learn More

---

# 7. Trust & Metrics Section (From Image 2)

Minimal white background.

4 large stat cards:

98% Guest Satisfaction
15+ Years Experience
25K+ Happy Clients
5.0 Star Rating

Design:
Minimal.
Thin separators.
Gold accent for numbers.

This builds authority immediately.

---

# 8. Rooms & Suites Section

Title:
Explore Rooms & Suites

Grid:
3–4 cards per row (desktop)

Each card:

Large image
Room name
Price per night (top-right badge)
Size, beds, sleeps
View Details CTA

Hover:
Image zoom
Dark gradient overlay
Button fades in

Pricing must be visible — this was missing in Image 1.

---

# 9. Wedding & Events Section

Full-width banner with overlay text.

Cinematic image.

Text:
Create Unforgettable Moments

CTA:
Explore Events

Add soft gradient overlay for readability.

---

# 10. Experience / Amenities Section

Icon grid.

Minimal line icons.
Soft beige background.

Hover:
Icons turn gold.

---

# 11. Testimonial Carousel

Centered layout.
Minimal design.

Include:
Guest photo
Short review
5-star rating

Auto-slide 6 seconds.

---

# 12. Gallery Section

Masonry layout.

Hover:
Image scale
Subtle shadow

Click:
Lightbox modal.

---

# 13. Footer

Dark charcoal background.

Columns:
Brand
Quick links
Contact
Newsletter

Gold accent lines.

---

# 14. Micro Interactions

Buttons:
Soft scale 1.03 on hover
Gold glow shadow

Links:
Underline animation on hover

Cards:
Lift 6px on hover

Page transitions:
Fade + slight upward motion

---

# 15. Mobile Experience

Glass navbar collapses to hamburger.

Booking widget:
Stacked vertical.
Full-width button.

Sticky bottom:
Book Now CTA persistent.

Fluid simulation:
Reduced intensity or disabled on low performance.

---

# 16. Performance & Tech

Frontend:
Next.js
Tailwind
Framer Motion
Three.js for fluid

Optimization:
WebP images
Lazy load
Dynamic import fluid effect
Disable heavy effects on low-end devices

Target:
Under 2.5s LCP

---

# 17. Advanced Differentiation

Optional upgrades:

Interactive 360° room view
Dynamic pricing calendar
Live concierge chat
Seasonal promotional banner
Smart availability indicator

---

# 18. Final Experience Summary

User lands →
Sees cinematic hero + subtle fluid elegance →
Glass navbar feels modern →
Booking form visible instantly →
Trust stats reinforce credibility →
Rooms clearly priced →
Luxury maintained without sacrificing clarity →
Conversion optimized at every scroll depth.

This becomes:

Luxury + Modern + Conversion-driven.

# 19. Effects

Implement fluid simulation in hero section

---

