## Design System: Company Party Lottery

### Pattern
- **Name:** Event/Conference Landing
- **Conversion Focus:** Early bird pricing with deadline. Social proof (past attendees). Speaker credibility. Multi-ticket discounts.
- **CTA Placement:** Register CTA sticky + After speakers + Bottom
- **Color Strategy:** Urgency colors (countdown). Event branding. Speaker cards professional. Sponsor logos neutral.
- **Sections:** 1. Hero (date/location/countdown), 2. Speakers grid, 3. Agenda/schedule, 4. Sponsors, 5. Register CTA

### Style
- **Name:** Vibrant & Block-based
- **Keywords:** Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern, energetic
- **Best For:** Startups, creative agencies, gaming, social media, youth-focused, entertainment, consumer
- **Performance:** ??Good | **Accessibility:** ??Ensure WCAG

### Colors
| Role | Hex |
|------|-----|
| Primary | #4F46E5 |
| Secondary | #818CF8 |
| CTA | #F97316 |
| Background | #EEF2FF |
| Text | #1E1B4B |

*Notes: Playful indigo + energetic orange*

### Typography
- **Heading:** Fredoka
- **Body:** Nunito
- **Mood:** playful, friendly, fun, creative, warm, approachable
- **Best For:** Children's apps, educational, gaming, creative tools, entertainment
- **Google Fonts:** https://fonts.google.com/share?selection.family=Fredoka:wght@400;500;600;700|Nunito:wght@300;400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
```

### Key Effects
Large sections (48px+ gaps), animated patterns, bold hover (color shift), scroll-snap, large type (32px+), 200-300ms

### Avoid (Anti-patterns)
- Confusing registration
- No countdown

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

