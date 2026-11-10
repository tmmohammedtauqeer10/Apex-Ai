# Halaqa — complete final product

Assumption: product name is **Halaqa** (Arabic for a learning circle). Ideology: Sunni Islam, with Tasawwuf practiced according to Islam. This ideology is shown openly in the product UI. This document is not a fatwa.

## 1. Idea

### Problem
Mainstream social feeds trade privacy for attention and push content that conflicts with Islamic limits. Families and study groups still need a calm place for useful daily-life help.

### Intended audience
Muslim users who want invite-only circles, halal content, and practical daily benefit. Primary: family, local community, trusted teachers.

### Proposed solution
Halaqa is in-app social as a closed circle, not a viral square.

Core product:
1. Private circles
2. Useful daily posts
3. Halal content rules with reporting
4. Privacy defaults that stay closed
5. Soft Tasawwuf tone: sincerity, humility, service

### Alignment
Privacy protects dignity. Halal filters protect speech and media. Useful posts serve people. Tasawwuf keeps the tone sincere, not showy.

### Assumptions to test
1. Invite-only beats a public feed for return visits.
2. Useful posts beat entertainment posts.
3. “Not a fatwa” labels reduce misuse.
4. Guardians accept the privacy model for younger users.

## 2. Plan

| Action | Depends on | Owner | Date |
| --- | --- | --- | --- |
| Ship Halaqa MVP preview (circles, composer, privacy toggles, values) | Product brief | WorkStudio | Done in repo |
| Scholar review of image/video and mixed-gender rules | MVP surfaces locked | TBD | TBD |
| Privacy legal text and delete-my-data flow | MVP privacy toggles | TBD | TBD |
| Moderator queue for reports | Report button design | TBD | TBD |
| Prayer/calendar reminders without rulings | Circle feed stable | TBD | TBD |
| Optional encrypted messaging | Privacy defaults | TBD | TBD |
| Launch decision after scholar review | All open rulings closed | TBD | TBD |

## 3. Presentation (one point per slide)

1. **Halaqa** — Private circles for useful, halal daily life.
2. People need help without a public feed.
3. Circles stay invite-only.
4. Posts must be useful for daily life.
5. Privacy is on by default.
6. Halal limits are product rules, not a feed afterthought.
7. Tasawwuf sets the tone: sincerity over display.
8. Some features wait for a scholar.
9. Some features are refused.
10. Next step: test invite-only circles with real families.

Speaker notes: say clearly that Halaqa is not a mufti. Mark finance, mixed-gender live, and media rulings as open until a scholar reviews them.

## 4. Product usage framework

### Measured adoption
None in the workspace yet. Add analytics sources only with evidence `measured` and a citation.

### Observations from interviews and notes
Owner direction: privacy,halal content, useful daily-life help, Sunni Islam, Tasawwuf.

### Values fit
- Privacy: private by default, quiet hours, guardian mode, no data sale
- Halal: refuse pornography, intoxicants, gambling, interest pitches, fortune-telling
- Useful daily life: tips, reminders, study notes, charity coordination, prayer/calendar helpers

### Assumptions
Sample posts in the MVP are fictional preview data.

## 5. What ships in the MVP

Path: `halaqa/`

- Ideology shown openly in header, hero, Ideology section, values, and footer
- Landing with brand-first hero
- Circle switcher: Family, Study group, Mosque class
- Useful post composer (local sample only)
- Privacy toggles
- Build / scholar / refuse boards
