# Zyber Frontend

A modern, responsive ride-sharing application built with React, Vite, and Tailwind CSS. This frontend application provides an intuitive interface for both users (riders) and captains (drivers) to interact with the Zyber ride-sharing service.

## 🚀 Features

- **Dual User Interface**: Separate interfaces for riders and drivers
- **Real-time Ride Management**: Book rides, track drivers, and manage ride status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Protected Routes**: Authentication-based route protection
- **Context Management**: React Context for state management

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── Components/          # Reusable UI components
│   ├── Pages/              # Route components
│   ├── context/            # React Context providers
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Uber/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Architecture

### Context Management

The application uses React Context for state management across components:

#### UserContext
Manages user authentication state and profile information.

```jsx
// Example usage in a component
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const MyComponent = () => {
  const { user, setuser } = useContext(UserContext);
  
  return (
    <div>
      <h1>Welcome, {user.fullname.firstname}!</h1>
    </div>
  );
};
```

#### CaptainContext
Manages driver/captain state, loading states, and error handling.

```jsx
// Example usage in a component
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const DriverComponent = () => {
  const { captain, loading, error, updateCaptain } = useContext(CaptainDataContext);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {captain && <h2>Driver: {captain.fullname.firstname}</h2>}
    </div>
  );
};
```

### Routing Structure

The application uses React Router for navigation with protected routes:

```jsx
// App.jsx - Main routing configuration
<Routes>
  {/* Public routes */}
  <Route path='/' element={<Home />} />
  <Route path='/user-login' element={<UserLogin />} />
  <Route path='/user-signup' element={<UserSignup />} />
  <Route path='/rider-login' element={<CaptainLogin />} />
  <Route path='/rider-signup' element={<CaptainSignup />} />
  
  {/* Protected user routes */}
  <Route path='/user-Home' element={
    <UserProtectedWrapper>
      <UserHome />
    </UserProtectedWrapper>
  } />
  
  {/* Protected captain routes */}
  <Route path='/captain-home' element={
    <CaptainProtectedWrapper>
      <CaptainHome/>
    </CaptainProtectedWrapper>
  } />
</Routes>
```

## 🧩 Components

### Core Components

#### RideUI.jsx
Main ride interface component for users to book and manage rides.

**Features:**
- Location input with autocomplete
- Vehicle type selection
- Fare calculation
- Driver matching

**Example Usage:**
```jsx
import RideUI from '../Components/RideUI';

const UserHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RideUI />
    </div>
  );
};
```

#### ConfirmRide.jsx
Confirmation dialog for ride details before booking.

**Features:**
- Ride summary display
- Fare breakdown
- Confirmation actions

#### DriverInfoPanel.jsx
Displays driver information and ride status.

**Features:**
- Driver profile
- Vehicle details
- Contact information
- Ride progress

### Utility Components

#### LocationPanel.jsx
Handles location input and autocomplete functionality.

#### SearchingDriver.jsx
Loading state while searching for available drivers.

## 📱 Pages

### Public Pages

#### Home.jsx
Landing page with animated hero section and call-to-action.

**Features:**
- Gradient background
- Animated text with Framer Motion
- Responsive design
- Navigation to login/signup

**Example:**
```jsx
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-end bg-gradient-to-br from-gray-900 to-black text-white relative px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-4 leading-tight"
      >
        Get started<br />with <span className="text-emerald-400">Zyber</span>
      </motion.h1>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl"
        onClick={() => navigate('/user-login')}
      >
        Continue
      </motion.button>
    </div>
  );
};
```

### Authentication Pages

#### UserLogin.jsx & UserSignup.jsx
User authentication forms with validation and error handling.

#### CaptainLogin.jsx & CaptainSignup.jsx
Driver authentication forms with vehicle information.

### Protected Pages

#### UserHome.jsx
Main dashboard for authenticated users to book rides.

#### CaptainHome.jsx
Driver dashboard for managing rides and availability.

## 🎨 Styling & UI

### Tailwind CSS Configuration

Custom animations and theme extensions:

```js
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slowest': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    }
  }
});
```

### Design System

- **Colors**: Emerald accent colors with gray scale
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent spacing using Tailwind's scale
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Authentication & Security

### Protected Routes

Routes are wrapped with authentication middleware:

```jsx
// UserProtectedWrapper.jsx
const UserProtectedWrapper = ({ children }) => {
  const { user } = useContext(UserContext);
  
  if (!user.email) {
    return <Navigate to="/user-login" replace />;
  }
  
  return children;
};
```

### Context Security

User and captain data is managed securely through React Context with proper state isolation.

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Optimized for small screens with touch-friendly interactions
- **Tablet**: Responsive layouts that adapt to medium screens
- **Desktop**: Enhanced layouts for larger screens

## 🚀 Performance Features

- **Code Splitting**: Route-based code splitting with React Router
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Vite for fast development and optimized production builds
- **Efficient Rendering**: React 19 optimizations

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- **ESLint**: Code linting and formatting
- **React Hooks**: Proper hooks usage enforced
- **Component Structure**: Consistent component organization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Vite Configuration

The Vite configuration includes:
- React plugin for JSX support
- Tailwind CSS integration
- Custom animation configurations
- Development server settings

## 📚 API Integration

The frontend communicates with the backend through:

- **Axios**: HTTP client for API requests
- **Authentication**: JWT tokens for secure communication
- **Error Handling**: Comprehensive error handling and user feedback

## 🎯 Future Enhancements

- **Real-time Updates**: WebSocket integration for live ride updates
- **Push Notifications**: Mobile push notifications
- **Offline Support**: Service worker for offline functionality
- **Internationalization**: Multi-language support
- **Dark Mode**: Theme switching capability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Zyber ride-sharing application.

---

For more information about the backend API, see the [Backend README](../Backend/README.md).
