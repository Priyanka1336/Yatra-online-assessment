# Hotel Booking App

A modern hotel search and booking application built with React, Next.js, and TypeScript. Inspired by Yatra's hotel booking flow, this app provides a clean and intuitive interface for finding and booking hotels across India.

## 📋 Table of Contents

- [Setup Instructions](#-setup-instructions)
- [Features Implemented](#-features-implemented)
- [Assumptions Made](#-assumptions-made)
- [Testing Strategy](#-testing-strategy)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)

## 🚀 Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hotel-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## ✨ Features Implemented

### 🔍 Hotel Search Page (/)
- **City Autocomplete**: Smart search with city suggestions and keyboard navigation
- **Date Selection**: Check-in and check-out date pickers with validation
- **Guest Selection**: Dropdown for 1-5 guests
- **Form Validation**: Real-time validation with error messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🏨 Hotel Results Page (/hotels)
- **Query Parameter Reading**: Reads search criteria from URL parameters
- **Hotel Filtering**: Filters hotels by selected city
- **Hotel Cards**: Beautiful cards displaying hotel information with star ratings
- **Loading States**: Smooth loading animations with LoadingSpinner component
- **Empty States**: User-friendly no-results messages

### 🛏 Hotel Detail Page (/hotels/[id])
- **Detailed Information**: Complete hotel details and description
- **Facilities List**: Comprehensive list of hotel amenities
- **Booking Functionality**: "Book Now" button with alert confirmation
- **Responsive Layout**: Optimized for all screen sizes

### 🎨 UI/UX Features
- **Clean Design**: Modern, minimalist design inspired by Yatra
- **Mobile Responsive**: Optimized for all device sizes
- **Loading States**: Consistent loading animations across the app
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Keyboard navigation and screen reader support

## 🤔 Assumptions Made

### Data & Functionality
- **Mock Data**: Using static JSON files for cities and hotels data
- **No Backend**: All data is client-side for demonstration purposes
- **Limited Cities**: Only 20 major Indian cities available for search
- **Limited Hotels**: Only 8 sample hotels across different cities

### Technical Assumptions
- **Modern Browser**: Assumes users have modern browsers with ES6+ support
- **JavaScript Enabled**: Requires JavaScript to be enabled
- **Network Connectivity**: Assumes stable internet connection for development
- **Node.js Environment**: Assumes Node.js 18+ for development

### User Experience Assumptions
- **Desktop/Mobile**: Optimized for both desktop and mobile users
- **English Language**: Interface is in English only

## 🧪 Testing Strategy

### Testing Framework
- **Jest**: Primary test runner
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for testing

### Test Coverage

#### Unit Tests
- **Component Testing**: Individual component behavior testing
- **Props Validation**: Testing component props and state
- **User Interactions**: Testing user interactions like clicks, typing, etc.
- **Event Handling**: Testing component event handlers

#### Test Files
- `CityAutocomplete.test.tsx` - Tests for city search functionality
- `HotelCard.test.tsx` - Tests for hotel card display
- `LoadingSpinner.test.tsx` - Tests for loading component

### Testing Approach
- **Component Isolation**: Each component tested in isolation
- **User-Centric**: Tests focus on user behavior and interactions
- **Accessibility**: Testing keyboard navigation and screen reader support
- **Responsive Design**: Testing component behavior across different screen sizes

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 🛠️ Tech Stack

- **React 19**: Latest React with hooks
- **Next.js 15**: App router with TypeScript
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Testing Library**: Unit testing
- **Jest**: Test runner
- **date-fns**: Date manipulation utilities

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   └── hotels/        # Hotel API endpoints
│   ├── hotels/            # Hotel-related pages
│   │   ├── [id]/         # Dynamic hotel detail pages
│   │   └── page.tsx      # Hotel listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home/search page
├── components/            # Reusable React components
│   ├── __tests__/        # Component tests
│   ├── CityAutocomplete.tsx
│   ├── HotelCard.tsx
│   └── LoadingSpinner.tsx
├── data/                 # Mock data files
│   ├── cities.json
│   └── hotels.json
├── types/                # TypeScript type definitions
│   └── index.ts
└── utils/                # Utility functions
    ├── data.ts           # Data handling utilities
    └── validation.ts     # Form validation utilities
```

## 📸 Screenshots

### Home Page - Hotel Search
![Home Page - Hotel Search](/public/screenshots/Screenshot%202025-07-12%20at%208.37.08%20PM.png)

### Hotel Results Page
![Hotel Results Page](/public/screenshots/Screenshot%202025-07-12%20at%208.39.02%20PM.png)

### Hotel Detail Page
![Hotel Detail Page](/public/screenshots/Screenshot%202025-07-12%20at%208.39.14%20PM.png)

## 🚀 Deployment

### Vercel link : https://yatra-online-assessment.vercel.app/


### Manual Deployment
```bash
npm run build
npm start
```

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real hotel data integration with APIs
- [ ] Payment processing integration
- [ ] Booking management system
- [ ] Reviews and ratings system
- [ ] Advanced filtering and sorting
- [ ] Map integration for hotel locations
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Real-time availability updates



Built with ❤️ using Next.js and TypeScript
