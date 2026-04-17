# DTV Club Feature Structure

## 📋 Overview

This document outlines the modular feature structure for the DTV Club project. Each feature can be developed independently and then integrated into the main application.

---

## 📚 Feature: Blog CMS (`/blog`)

**Location:** `src/app/[lang]/blog/`

### Components to Build
- Blog listing page with filters
- Category navigation
- Search functionality
- Pagination
- Related articles sidebar
- Reading time estimator
- Share buttons
- Comment system (Discord integration)

### Files Structure
```
src/app/[lang]/blog/
├── page.tsx                    # Blog listing page
├── [slug]/
│   └── page.tsx               # Individual article page
├── category/[category]/
│   └── page.tsx               # Category filtered view
└── search/
    └── page.tsx               # Search results page

src/components/blog/
├── ArticleCard.tsx
├── ArticleGrid.tsx
├── BlogFilters.tsx
├── SearchBox.tsx
├── CategoryNav.tsx
└── RelatedArticles.tsx

src/lib/blog-service/
├── index.ts                   # Main service functions
├── db.ts                      # Database queries
└── content-parser.ts          # Markdown/HTML parsing

src/content/blog/
└── [articles stored here]
```

### Service Functions (in `src/lib/blog-service/index.ts`)
- `getArticles(language, category?, featured?)` - Fetch articles
- `getArticleBySlug(language, slug)` - Fetch single article
- `getCategories(language)` - Get all categories
- `searchArticles(language, query)` - Search functionality

### Session: Blog CMS Implementation
**Responsible for:**
1. Creating all component files
2. Implementing database schema
3. Building article listing and detail pages
4. Search and filter functionality
5. Testing and validation

---

## 🗺️ Feature: Embassy Map (`/embassy-map`)

**Location:** `src/app/[lang]/embassy-map/`

### Components to Build
- Interactive world map (Mapbox/Leaflet)
- Embassy location markers with popups
- Filter by region/country
- Contact information cards
- Visa appointment booking info
- Real-time availability status
- Route directions

### Files Structure
```
src/app/[lang]/embassy-map/
├── page.tsx                   # Main map page
├── embassy/[id]/
│   └── page.tsx               # Embassy detail page
└── [country]/
    └── page.tsx               # Country embassy list

src/components/embassy/
├── Map.tsx                    # Main map component
├── EmbassyMarker.tsx
├── EmbassyCard.tsx
├── FilterPanel.tsx
├── AppointmentInfo.tsx
└── ContactDetails.tsx

src/lib/embassy-service/
├── index.ts                   # Embassy data service
├── locations.ts               # Embassy location data
└── api-integration.ts         # External API integration

src/data/embassies/
└── [embassy data files]
```

### Service Functions
- `getEmbassies(language)` - All embassy locations
- `getEmbassyById(id)` - Single embassy details
- `getEmbassiesByCountry(country)` - Country filter
- `getAppointmentAvailability(embassyId)` - Real-time availability
- `searchEmbassies(query)` - Location search

### Session: Embassy Map Implementation
**Responsible for:**
1. Setting up map library and styling
2. Creating embassy data structure
3. Implementing markers and popups
4. Filter and search features
5. Mobile-responsive design
6. API integration for real-time data

---

## 💆 Feature: Massage & Wellness DTV (`/massage-dtv`)

**Location:** `src/app/[lang]/massage-dtv/`

### Components to Build
- School directory listing
- School detail pages with curriculum
- Trainer/instructor profiles
- Certification pathways
- DTV success stories
- Course schedules and pricing
- Booking integration
- Reviews and ratings

### Files Structure
```
src/app/[lang]/massage-dtv/
├── page.tsx                   # Main page
├── schools/
│   ├── page.tsx               # School directory
│   └── [id]/
│       └── page.tsx           # School detail
├── trainers/
│   ├── page.tsx               # Trainer directory
│   └── [id]/
│       └── page.tsx           # Trainer profile
└── success-stories/
    ├── page.tsx               # Stories listing
    └── [id]/
        └── page.tsx           # Single story

src/components/massage/
├── SchoolCard.tsx
├── SchoolGrid.tsx
├── SchoolDetail.tsx
├── TrainerProfile.tsx
├── CurriculumOverview.tsx
├── ReviewSection.tsx
└── BookingWidget.tsx

src/lib/massage-service/
├── index.ts                   # Service functions
├── schools.ts                 # School data
├── trainers.ts                # Trainer data
└── curriculum.ts              # Course information

src/data/wellness/
└── [school and course data]
```

### Service Functions
- `getSchools(language, filter?)` - List all schools
- `getSchoolById(id)` - School details
- `getTrainers(schoolId)` - School's instructors
- `getCourses(schoolId)` - Available courses
- `getSuccessStories(language)` - DTV success stories
- `searchSchools(query, location?)` - Advanced search

### Session: Massage DTV Implementation
**Responsible for:**
1. Creating school and trainer data structure
2. Building directory and detail pages
3. Curriculum/course information display
4. Success stories section
5. Review and rating system
6. Booking/contact integration
7. SEO optimization

---

## 🔄 Integration Checklist

Each feature session should:
- ✅ Create all required component files
- ✅ Implement service layer functions
- ✅ Add TypeScript interfaces
- ✅ Build pages with proper routing
- ✅ Implement multi-language support
- ✅ Add metadata for SEO
- ✅ Test on mobile and desktop
- ✅ Create sample/mock data for testing
- ✅ Document any API integrations needed
- ✅ Push to GitHub with clear commit messages

---

## 📅 Development Timeline

**Phase 1: Structure Setup** (Current)
- Create folder structure
- Create template files
- Push to GitHub

**Phase 2: Individual Feature Sessions**
1. Blog CMS Session
2. Embassy Map Session  
3. Massage DTV Session

**Phase 3: Integration** (Main Session)
- Merge all features
- Testing and QA
- Performance optimization
- Deploy to production

---

## 📝 Notes for Session Management

- Each session gets its own dedicated folder and branch
- Use clear commit messages: `feat: [feature-name] - [description]`
- Update memory.md with progress
- Create summary before session ends
- Push to main after feature is complete and tested

---

**Last Updated:** 2026-04-17
**Maintainer:** Claude Code
