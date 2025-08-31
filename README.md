# 🚗 Zyber - Ride-Sharing Application

A full-stack ride-sharing application built with modern web technologies, providing a seamless experience for both riders and drivers. Zyber offers real-time ride booking, driver tracking, and secure payment processing.

![Zyber Logo](https://img.shields.io/badge/Zyber-Ride%20Sharing-blue?style=for-the-badge&logo=car)

## 🌟 Features

### 🚀 Core Functionality
- **Dual User Interface**: Separate interfaces for riders and drivers
- **Real-time Ride Management**: Book rides, track drivers, and manage ride status
- **Smart Fare Calculation**: Dynamic pricing based on distance and vehicle type
- **Location Services**: Google Maps integration for geocoding and routing
- **Secure Authentication**: JWT-based authentication with protected routes
- **Responsive Design**: Mobile-first design optimized for all devices

### 🎯 User Experience
- **Intuitive Interface**: Clean, modern UI with smooth animations
- **Real-time Updates**: Live tracking and status updates
- **Multiple Vehicle Types**: Support for cars, bikes, and auto-rickshaws
- **Payment Integration**: Secure payment processing
- **Push Notifications**: Real-time alerts and updates

## 🏗️ Project Architecture

```
Uber/
├── Backend/                 # Node.js + Express API
│   ├── controllers/        # Request handlers
│   ├── services/          # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication & validation
│   └── Db/               # Database configuration
├── Frontend/              # React + Vite application
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── Pages/         # Route components
│   │   └── context/       # State management
│   └── public/            # Static assets
└── README.md              # This file
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Token authentication
- **Google Maps API** - Location and routing services
- **Axios** - HTTP client for external APIs

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Headless UI** - Accessible UI components

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Google Maps API Key**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Uber
```

### 2. Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### 4. Environment Configuration

#### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/zyber
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📱 How to Use Zyber

### 🚶‍♂️ For Riders (Users)

#### 1. Getting Started
- Visit the application homepage
- Click "Continue" to proceed to login/signup
- Create an account or log in with existing credentials

#### 2. Booking a Ride
- **Set Pickup Location**: Enter your current location or use GPS
- **Set Destination**: Enter your desired destination
- **Choose Vehicle**: Select from car, bike, or auto-rickshaw
- **View Fare**: See estimated fare and travel time
- **Confirm Ride**: Review details and confirm booking

#### 3. During the Ride
- **Track Driver**: Real-time location updates
- **Driver Info**: View driver details and vehicle information
- **Ride Status**: Monitor pickup, in-progress, and completion
- **Contact Driver**: Built-in communication features

#### 4. Ride Completion
- **Payment**: Secure payment processing
- **Rating**: Rate your driver and ride experience
- **History**: View ride history and receipts

### 🚗 For Drivers (Captains)

#### 1. Driver Registration
- Sign up with personal and vehicle information
- Provide vehicle details (color, plate, capacity, type)
- Set your current location
- Complete verification process

#### 2. Accepting Rides
- **Ride Requests**: View incoming ride requests
- **Ride Details**: See pickup, destination, and fare
- **Accept/Decline**: Choose to accept or decline rides
- **Navigation**: Get directions to pickup location

#### 3. Ride Management
- **Pickup**: Mark passenger pickup
- **Navigation**: Route to destination
- **Ride Status**: Update ride progress
- **Completion**: Mark ride as completed

#### 4. Earnings & History
- **Earnings**: Track daily and weekly earnings
- **Ride History**: View completed rides
- **Performance**: Monitor ratings and feedback

## 🔌 API Endpoints

### Authentication
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile
- `GET /user/logout` - User logout

### Ride Management
- `POST /rides/create` - Create new ride
- `GET /rides/get-fare` - Calculate fare estimate

### Maps & Location
- `GET /maps/get-coordinates` - Address to coordinates
- `GET /maps/get-distance-time` - Calculate distance and time
- `GET /maps/get-suggestions` - Address autocomplete

For complete API documentation, see [Backend README](Backend/README.md).

## 🎨 User Interface

### Landing Page
- **Hero Section**: Animated welcome message
- **Call-to-Action**: Direct navigation to user login
- **Modern Design**: Gradient backgrounds and smooth animations

### User Dashboard
- **Location Input**: Smart address autocomplete
- **Fare Calculator**: Real-time fare estimation
- **Ride Tracking**: Live driver location updates
- **Payment Interface**: Secure payment processing

### Driver Dashboard
- **Ride Queue**: Incoming ride requests
- **Navigation**: Integrated maps and directions
- **Earnings Display**: Real-time earnings tracking
- **Status Management**: Online/offline toggle

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Authentication-required endpoints
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging
- **CORS Protection**: Cross-origin resource sharing security

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and gestures
- **Adaptive Layout**: Responsive design for all screen sizes
- **Progressive Web App**: PWA capabilities for mobile users

## 🚀 Performance Features

- **Fast Loading**: Vite build optimization
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Efficient data caching strategies
- **CDN Ready**: Optimized for content delivery networks

## 🧪 Development

### Available Scripts

#### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit code quality checks
- **Testing**: Unit and integration tests

## 🔧 Configuration

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create database named `zyber`
3. Configure connection string in backend `.env`

### Google Maps API
1. Create Google Cloud Project
2. Enable Maps JavaScript API
3. Enable Directions API
4. Enable Geocoding API
5. Generate API key and add to environment files

### Environment Variables
- **Development**: Use `.env` files for local development
- **Production**: Set environment variables on hosting platform
- **Security**: Never commit sensitive information to version control

## 📚 Documentation

- **[Backend API Documentation](Backend/README.md)** - Complete API reference
- **[Frontend Documentation](Frontend/README.md)** - Component and architecture details
- **[Database Schema](Backend/models/)** - Data model definitions
- **[Component Library](Frontend/src/Components/)** - UI component documentation

## 🚀 Deployment

### Backend Deployment
1. **Build**: `npm run build`
2. **Environment**: Set production environment variables
3. **Database**: Configure production MongoDB connection
4. **Hosting**: Deploy to Heroku, AWS, or similar platform

### Frontend Deployment
1. **Build**: `npm run build`
2. **Environment**: Update API base URL for production
3. **Hosting**: Deploy to Vercel, Netlify, or similar platform
4. **CDN**: Configure content delivery network

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
- Check MongoDB connection
- Verify environment variables
- Check port availability
- Review error logs

#### Frontend Build Errors
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify environment variables
- Review build logs

#### API Connection Issues
- Verify backend server is running
- Check CORS configuration
- Verify API base URL
- Check network connectivity

### Getting Help
1. Check existing documentation
2. Review error logs and console output
3. Search existing issues
4. Create new issue with detailed information

## 🤝 Contributing

We welcome contributions to Zyber! Here's how you can help:

### Development Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass

### Code Standards
- **JavaScript**: Use ES6+ features
- **React**: Follow React best practices
- **CSS**: Use Tailwind CSS utilities
- **Testing**: Maintain good test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Maps API** for location services
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing frontend library
- **Node.js Community** for the robust backend runtime

## 📞 Support

- **Documentation**: [Project Wiki](../../wiki)
- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: support@zyber.com

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ User authentication and registration
- ✅ Basic ride booking system
- ✅ Driver management
- ✅ Location services

### Phase 2 (Next)
- 🔄 Real-time ride tracking
- 🔄 Payment integration
- 🔄 Push notifications
- 🔄 Driver earnings dashboard

### Phase 3 (Future)
- 📋 Advanced analytics
- 📋 Multi-language support
- 📋 Offline functionality
- 📋 AI-powered route optimization

---

**Built with ❤️ by me**

*Transform your ride-sharing experience with Zyber - Where every journey is a breeze!*
