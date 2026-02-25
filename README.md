# Exclusive E-Commerce Application

A modern, full-featured e-commerce platform built with **Angular** and **TailwindCSS**, featuring a robust order system, admin dashboard, user authentication, and secure payment processing.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Key Pages & Components](#key-pages--components)
- [Admin Dashboard](#admin-dashboard)
- [Services & APIs](#services--apis)
- [Authentication & Security](#authentication--security)
- [Development Commands](#development-commands)

---

## 🎯 Overview

**Exclusive** is a full-stack e-commerce application that enables users to browse products, manage wishlists, add items to cart, checkout securely, and track orders. The platform includes a comprehensive admin panel for managing products, orders, customers, and system notifications.

---

## ✨ Features

### Customer Features

- **Product Browsing**: Browse featured products, categories, flash sales, and best sellers
- **Search & Filter**: Search products and filter by category
- **Shopping Cart**: Add/remove items, view order summary
- **Wishlist**: Save favorite products for later
- **Checkout**: Secure checkout with multiple payment methods
- **Order Tracking**: Track orders in real-time with status updates
- **Account Management**: Create accounts, manage profile, view order history
- **Reviews & Ratings**: Leave product reviews with star ratings
- **Flash Sales**: Time-limited promotional offers

### Admin Features

- **Dashboard**: Real-time analytics and order overview
- **Product Management**: Add, edit, delete products with categories and pricing
- **Order Management**: View and manage customer orders
- **Customer Management**: View customer profiles and transaction history
- **Notification System**: Send and manage customer notifications
- **Reports**: Generate sales and performance reports
- **Settings**: Configure system preferences and store information

### General Features

- **Responsive Design**: Mobile-first design with TailwindCSS
- **User Authentication**: Secure login/signup with password protection
- **Order System**: Complete checkout and order fulfillment workflow
- **Firebase Integration**: Cloud database
- **Appwrite Integration**: Cloud database and storage
- **Notifications**: In-app notifications
- **FAQ & Legal Pages**: Comprehensive help, privacy policy, and terms of use

---

## 🛠️ Tech Stack

- **Framework**: Angular 21
- **Styling**: TailwindCSS 3
- **Backend/Database**: Firebase / Appwrite
- **Authentication**: Appwrite Auth
- **Icons & Images**: SVG & PNG assets
- **Build Tool**: Angular CLI
- **Testing**: Vitest / Jasmine
- **PostCSS**: For CSS processing

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                    # Admin module
│   │   ├── admin.routes.ts
│   │   ├── components/
│   │   │   ├── admin-header/
│   │   │   ├── admin-layout/
│   │   │   └── admin-sidebar/
│   │   ├── models/               # Admin data models
│   │   ├── pages/
│   │   │   ├── admin-dashboard/  # Analytics & overview
│   │   │   ├── admin-notification/
│   │   │   ├── admin-reports/
│   │   │   ├── admin-settings/
│   │   │   ├── customers-management/
│   │   │   ├── feedback/
│   │   │   ├── orders-management/
│   │   │   └── products-management/
│   │   └── services/             # Admin API services
│   │
│   ├── components/               # Shared components
│   │   ├── banner/               # Reusable page header banner
│   │   ├── best-selling/
│   │   ├── button/
│   │   ├── confirm-logout-popup/
│   │   ├── flash-sale-hero/
│   │   ├── flash-sales/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── home-advantage/
│   │   ├── home-category/
│   │   ├── home-featured/
│   │   ├── home-products/
│   │   ├── home-single-category/
│   │   ├── layout/
│   │   ├── loader/               # Reusable spinner loader
│   │   ├── navbar/
│   │   ├── notification-card/
│   │   ├── product-card/
│   │   ├── review-card/
│   │   ├── review-product/
│   │   ├── title/
│   │   └── top-nav/
│   │
│   ├── core/                     # Configuration files
│   │   ├── appwrite.config.ts
│   │   ├── firebase.config.ts
│   │
│   ├── guards/                   # Route guards
│   │   └── exclusive-guard.ts
│   │
│   ├── models/                   # Data models & interfaces
│   │   └── index.ts
│   │
│   ├── pages/                    # Page components
│   │   ├── about/
│   │   ├── account/              # User profile & settings
│   │   ├── cart/                 # Shopping cart
│   │   ├── category/             # Category listing
│   │   ├── checkout/             # Checkout flow
│   │   ├── complete-profile/     # Profile completion
│   │   ├── contact/
│   │   ├── faq/                  # Frequently Asked Questions
│   │   ├── home/                 # Landing page
│   │   ├── login/
│   │   ├── not-found-page/
│   │   ├── notification/         # Notifications page
│   │   ├── privacy-policy/       # Privacy policy
│   │   ├── product-details/      # Product detail page
│   │   ├── products/             # Product listing
│   │   ├── signup/
│   │   ├── terms-of-use/         # Terms & conditions
│   │   └── wishlist/             # Saved items
│   │
│   ├── services/                 # Core services
│   │   ├── auth.ts               # Authentication service
│   │   ├── master.ts             # Master data service
│   │   └── order.ts              # Order management service
│   │
│   ├── app.config.ts             # Angular config
│   ├── app.routes.ts             # Main routing
│   ├── app.ts                    # Root component
│   └── app.html                  # Root template
│
├── environments/                 # Environment configs
│   ├── environment.ts
│   └── environment.development.ts
│
├── styles.css                    # Global styles
├── main.ts                       # Entry point
└── index.html                    # HTML template
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Angular CLI** (v21)

### Steps

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repo-url>
   cd exclusive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update `src/environments/environment.ts` with your Firebase/Appwrite config
   - Update `src/core/firebase.config.ts` or `src/core/appwrite.config.ts`

4. **Build and serve**
   ```bash
   npm start
   ```

---

## 🎮 Running the Application

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically when you modify source files.

### Production Build

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory.

### Run Tests

```bash
npm test
```

---

## 📄 Key Pages & Components

### Public Pages

| Page                | Route             | Description                                                  |
| ------------------- | ----------------- | ------------------------------------------------------------ |
| **Home**            | `/home`           | Landing page with featured products, flash sales, categories |
| **Products**        | `/products`       | Browse all products with search and filter                   |
| **Product Details** | `/product/:id`    | Detailed product view with reviews and ratings               |
| **Category**        | `/category/:name` | Products filtered by category                                |
| **Cart**            | `/cart`           | Shopping cart management                                     |
| **Checkout**        | `/checkout`       | Order submission and payment                                 |
| **Wishlist**        | `/wishlist`       | Saved favorite products                                      |
| **Account**         | `/account`        | User profile and order history                               |
| **Login**           | `/login`          | User authentication                                          |
| **Signup**          | `/signup`         | New user registration                                        |
| **FAQ**             | `/faq`            | Common questions and answers                                 |
| **Privacy Policy**  | `/privacy-policy` | Data privacy information                                     |
| **Terms of Use**    | `/terms-of-use`   | User agreement terms                                         |
| **About**           | `/about`          | About the company                                            |
| **Contact**         | `/contact`        | Contact information                                          |

### Shared Components

- **Banner**: Reusable header banner for pages (FAQ, Terms, Privacy Policy)
- **Loader**: Spinning loader used across pages for loading states
- **Product Card**: Displays product with image, price, rating
- **Review Card**: Shows customer reviews and ratings
- **Navbar**: Top navigation with search and user menu
- **Footer**: Site footer with links and info
- **Hero**: Hero sections with call-to-action

---

## 🔐 Admin Dashboard

Access at `/admin` (requires admin role)

### Key Admin Pages

| Page              | Route                  | Description                              |
| ----------------- | ---------------------- | ---------------------------------------- |
| **Dashboard**     | `/admin/dashboard`     | Sales metrics, order overview, analytics |
| **Products**      | `/admin/products`      | Add, edit, delete products               |
| **Orders**        | `/admin/orders`        | View and manage customer orders          |
| **Customers**     | `/admin/customers`     | View customer profiles and activity      |
| **Notifications** | `/admin/notifications` | Send notifications to users              |
| **Reports**       | `/admin/reports`       | Generate sales and performance reports   |
| **Feedback**      | `/admin/feedback`      | View customer feedback and reviews       |
| **Settings**      | `/admin/settings`      | Configure store settings                 |

---

## 🔧 Services & APIs

### Authentication Service (`auth.ts`)

- Login / Signup / Logout
- Password reset

### Master Service (`master.ts`)

- Fetch products and categories
- Get promotions and flash sales
- Browse featured items

### Order Service (`order.ts`)

- Create orders
- Track order status
- Retrieve order history
- Calculate totals and taxes

### Admin Services

- **admin-product.service.ts**: Manage products (CRUD operations)
- **admin-order.service.ts**: Manage orders and fulfillment
- **admin-customer.service.ts**: Manage customer data
- **admin-dashboard.service.ts**: Fetch analytics and metrics
- **notification.service.ts**: Send notifications
- **admin-setting.service.ts**: Manage store settings

---

## 🔒 Authentication & Security

- **Guard**: `exclusive-guard.ts` protects admin and user routes
- **Appwrite Auth**: Secure user authentication with email/password
- **Data Privacy**: Compliant with privacy policy and GDPR
- **Payment Security**: Secure payment processing through third-party providers

---

## 💻 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name

# Lint code
ng lint

# Format code
npm run format
```

---

## 🌐 Environment Configuration

### Development

- File: `src/environments/environment.development.ts`
- Use for local development with debug enabled

### Production

- File: `src/environments/environment.ts`
- Optimized configuration for deployment

---

## 📞 Support & Contact

For questions or issues:

- **Email**: oladimejiagbaje144@gmail.com
- **Contact Page**: `/contact`
- **FAQ**: `/faq`

---

## 📄 License

This project is proprietary and confidential.

---

## 🎉 Getting Started Tips

1. **Start with the home page**: Explore the landing page and product catalog
2. **Test authentication**: Create a user account and login
3. **Try the admin panel**: Use admin credentials to access `/admin`
4. **Review the order flow**: Add products to cart → checkout → view order history
5. **Check the FAQ**: Navigate to `/faq` for common questions

---

**Happy coding! 🚀**
