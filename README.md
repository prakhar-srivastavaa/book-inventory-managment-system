# 📚 Book Inventory Management System

A modern, feature-rich book inventory management system built with React. Manage your book collection with an elegant dark mode interface, smooth animations, and intuitive controls.

## 🌐 Live Demo

🔗 **[View Live Demo on Vercel](----------)**

---

## ✨ Features

- 📖 **Complete CRUD Operations** - Add, edit, view, and delete books
- 🌙 **Dark Mode by Default** - Modern dark theme with smooth transitions
- 🎨 **Modern UI/UX** - Beautiful hover effects and animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Form Validation** - Comprehensive input validation for all fields
- 💾 **Local Storage** - Theme preference persists across sessions
- 🔍 **Detailed View** - Click on any book title to see full details
- ⚡ **Fast & Smooth** - Optimized performance with React hooks

## 🛠️ Tech Stack

- **React 19.2.3** - Frontend framework
- **React Router DOM** - Client-side routing
- **CSS3** - Modern styling with animations
- **Context API** - State management for theme

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd book-inventory-managment-system
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
```

## 🎯 Key Features Explained

### Dark Mode
- Default theme is dark mode
- Smooth 0.5s transition when toggling themes
- Theme preference saved in localStorage
- Toggle button in navigation bar

### Book Management
- **Add Books**: Fill out the form with title, author, publisher, pages, publication date, overview, and language
- **Edit Books**: Click edit button to modify existing entries
- **Delete Books**: Remove books with a single click
- **View Details**: Click on book titles to see comprehensive information

### Modern Effects
- Ripple effect on buttons
- Hover scale transform on table rows
- Smooth color transitions
- Shadow elevation on hover
- Animated underlines on links

## 📱 Responsive Design

- **Desktop** (1024px+): Full featured layout with sidebar
- **Tablet** (768-1024px): Adjusted layout for medium screens
- **Mobile** (480-768px): Optimized for touch interactions
- **Small Phones** (<480px): Compact, efficient design

## 🎨 Color Scheme

### Light Mode
- Background: `#f5f5f5`
- Text: `#333`
- Primary: `#007bff`

### Dark Mode (Default)
- Background: `#1a1a1a`
- Text: `#e0e0e0`
- Cards: `#2a2a2a`
- Primary: `#0056b3`

## 📄 Project Structure

```
book-inventory-managment-system/
├── public/
├── src/
│   ├── components/
│   │   ├── BookForm.js
│   │   ├── BookList.js
│   │   ├── BookDetails.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── NotFound.js
│   ├── services/
│   │   └── bookService.js
│   ├── styles/
│   │   ├── BookForm.css
│   │   ├── BookList.css
│   │   ├── BookDetails.css
│   │   ├── Home.css
│   │   └── Navbar.css
│   ├── context/
│   │   └── ThemeContext.js
│   ├── utils/
│   │   └── validation.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## 👨‍💻 Author

**Prakhar**

## 📝 License

All rights reserved © 2025 Book Inventory Management System

---

Made with ❤️ using React
