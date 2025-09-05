Here's a comprehensive `claude.md` file for your Vista Peptides project:

```markdown
# Claude AI Assistant Instructions - Vista Peptides Project

## Project Overview
Building a physician-verified e-commerce platform for Vista Peptides to sell peptides and GLP-1 medications. Target: $60-80k daily revenue.

## Tech Stack
- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with refresh tokens
- **Payment**: Stripe (with restrictions for pharma)
- **Email**: SendGrid
- **Hosting**: Vercel (frontend) / Railway (backend)

## Coding Standards

### React Components
- Use functional components with hooks only
- Props destructuring in parameters
- Custom hooks for reusable logic
- Memoization for expensive operations
- Error boundaries for critical sections

```jsx
// Component template
const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks at top
  // Event handlers
  // Effects
  // Return JSX
};
```

### File Structure
```
src/
  components/
    ui/          # Reusable UI components
    layout/      # Layout components
    features/    # Feature-specific components
  pages/         # Route pages
  hooks/         # Custom hooks
  services/      # API services
  store/         # Redux store
  utils/         # Utility functions
  styles/        # Global styles
```

### API Structure
- RESTful endpoints
- Consistent error responses
- Request validation middleware
- Rate limiting on all routes
- CORS properly configured

```javascript
// API route template
router.post('/endpoint', 
  authenticate,
  validate(schema),
  rateLimit,
  async (req, res) => {
    try {
      // Logic
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
);
```

## Brand Guidelines

### Colors
```css
--primary-blue: #4FB7F4;
--text-dark: #1A1A1A;
--white: #FFFFFF;
--gray-100: #F3F4F6;
--success: #10B981;
--error: #EF4444;
```

### Typography
- Font: Poppins
- Weights: 300, 400, 500, 600, 700, 800, 900
- Scale: 12px, 14px, 16px, 18px, 21px, 28px, 38px, 50px, 90px

### Spacing
- Base unit: 8px
- Card padding: 24px
- Section spacing: 48px
- Container margins: Mobile 16px, Desktop 32px

### Components
- White cards on dark textured sections
- Blue CTAs with hover effects
- Clean shadows for elevation
- Rounded corners (12px for cards)

## Security Requirements

### Authentication
- Physician verification required before ordering
- NPI number validation
- State medical board API integration
- Session timeout after 30 minutes
- Refresh token rotation

### Data Protection
- All PII encrypted at rest
- HTTPS only
- Input sanitization
- SQL injection prevention
- XSS protection headers
- CSRF tokens for forms

### Compliance
- HIPAA considerations for physician data
- State-specific pharmaceutical regulations
- Age verification (21+)
- Audit logging for all transactions

## Key Features

### MVP (Month 1-3)
1. User registration/login
2. Physician verification (NPI)
3. Product catalog
4. Shopping cart
5. Stripe checkout
6. Order management
7. Basic admin panel

### Phase 2 (Month 4-6)
1. State compliance engine
2. Bulk ordering
3. Subscription/auto-reorder
4. Advanced analytics
5. Email automation
6. Inventory management
7. Multi-user practice accounts

### Phase 3 (Ongoing)
1. AI-powered recommendations
2. Mobile app
3. International expansion
4. Advanced reporting
5. API for third-party integrations

## Database Schema

### User Model
```javascript
{
  email: String,
  password: String (hashed),
  role: ['physician', 'admin', 'staff'],
  verification: {
    npi: String,
    dea: String,
    licenseNumber: String,
    state: String,
    verified: Boolean,
    verifiedAt: Date
  },
  practice: {
    name: String,
    address: Object,
    phone: String
  }
}
```

### Product Model
```javascript
{
  name: String,
  category: String,
  price: {
    regular: Number,
    bulk: [{ quantity: Number, price: Number }]
  },
  requiresLicense: Boolean,
  restrictedStates: [String],
  inventory: Number,
  description: String,
  dosages: [String]
}
```

### Order Model
```javascript
{
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  status: String,
  compliance: {
    physicianVerified: Boolean,
    stateApproved: Boolean,
    prescriptionId: String
  },
  payment: {
    stripeId: String,
    amount: Number,
    status: String
  }
}
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout
- POST /api/auth/verify-physician

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

### Orders
- GET /api/orders (user's orders)
- GET /api/orders/:id
- POST /api/orders
- PUT /api/orders/:id/status (admin)

### Cart
- GET /api/cart
- POST /api/cart/add
- PUT /api/cart/update
- DELETE /api/cart/item/:id
- POST /api/cart/clear

## Performance Requirements
- Page load: <2 seconds
- Time to Interactive: <3 seconds
- API response: <200ms
- 99.9% uptime
- Support 1000 concurrent users
- Handle $80k daily transactions

## Testing Requirements
- Unit tests for utilities
- Integration tests for APIs
- Component testing with React Testing Library
- E2E tests for critical paths
- Load testing before launch
- Security penetration testing

## Deployment
- CI/CD with GitHub Actions
- Staging environment for testing
- Blue-green deployment strategy
- Automated backups
- Error monitoring with Sentry
- Analytics with GA4 and Mixpanel

## Third-Party Services
- **Stripe**: Payment processing (check pharma restrictions)
- **SendGrid**: Transactional emails
- **Cloudflare**: CDN and DDoS protection
- **MongoDB Atlas**: Database hosting
- **Vercel**: Frontend hosting
- **Railway/Render**: Backend hosting
- **Sentry**: Error monitoring
- **LogRocket**: Session replay

## Environment Variables
```env
# Backend
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SENDGRID_API_KEY=
NPI_API_KEY=
PORT=5000

# Frontend
VITE_API_URL=
VITE_STRIPE_PUBLIC_KEY=
VITE_GA_ID=
```

## Common Issues & Solutions

### Stripe Pharmacy Restrictions
- Use for medical supplies initially
- Consider alternative processors for peptides
- Implement physician verification before payment
- Clear terms stating physician-only sales

### State Compliance
- Build database of state regulations
- Block orders to restricted states
- Require additional documentation where needed
- Regular legal review of new regulations

### Performance
- Implement Redis caching
- Use CDN for all assets
- Lazy load images
- Code split by route
- Optimize MongoDB queries with indexes

## Development Workflow
1. Feature branch from main
2. Write tests first (TDD)
3. Implement feature
4. Code review via PR
5. Test in staging
6. Deploy to production
7. Monitor for 24 hours

## Support & Maintenance
- 24-hour response for critical issues
- Weekly security updates
- Monthly performance review
- Quarterly feature planning
- Annual security audit

## Contact Points
- Technical Lead: James McEwen
- Stripe Support: stripe.com/support
- MongoDB Support: support.mongodb.com
- Vercel Support: vercel.com/support

## Important Notes
1. Always verify physician licenses before allowing orders
2. Never store credit card details directly
3. Log all prescription-related transactions
4. Maintain HIPAA compliance for physician data
5. Follow state board regulations for pharmaceutical sales
6. Implement rate limiting on all API endpoints
7. Use environment variables for all secrets
8. Never commit .env files to git
9. Always use HTTPS in production
10. Backup database daily

## Quick Commands
```bash
# Development
npm run dev          # Start dev servers
npm run test         # Run tests
npm run build        # Build for production

# Database
npm run seed         # Seed database
npm run migrate      # Run migrations

# Deployment
npm run deploy:staging    # Deploy to staging
npm run deploy:production # Deploy to production
```

---
Last Updated: September 2024
Project Status: In Development
```

This `claude.md` file provides comprehensive instructions for Claude to understand:
- Project context and goals
- Technical requirements and stack
- Brand guidelines and styling
- Security and compliance needs
- Database structure
- API design
- Development workflow
- Common issues and solutions

