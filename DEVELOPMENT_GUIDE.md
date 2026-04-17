# DTV HUB Development Guide

## Project Overview

DTV HUB is a comprehensive portal for Thailand DTV visa information with modular, distributed development.

### ✅ Completed Setup
- Next.js 15 with TypeScript
- Vercel hosting (dtvclub.com)
- Multi-language support (5 languages)
- Modular folder structure for three features:
  1. Blog CMS
  2. Embassy Map
  3. Massage & Wellness DTV

### 🎯 Next Steps
1. Implement Blog CMS feature
2. Implement Embassy Map feature
3. Implement Massage DTV feature
4. Integrate all features
5. Deploy to production

### 📁 Key Directories
- src/app/[lang]/blog/ - Blog feature
- src/app/[lang]/embassy-map/ - Embassy Map feature
- src/app/[lang]/massage-dtv/ - Massage DTV feature
- src/components/blog/ - Blog components
- src/lib/blog-service/ - Blog service layer

### 📋 Development Workflow
1. Read FEATURE_STRUCTURE.md for specific feature details
2. Implement components and service functions
3. Test on mobile and all 5 languages
4. Commit with clear messages
5. Push to GitHub
6. Update memory.md with progress

### 🛠️ Available Tools
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for components
- getDictionary() for multi-language support
- Vercel CI/CD for auto-deployment

For detailed information, see FEATURE_STRUCTURE.md

Last Updated: 2026-04-17
