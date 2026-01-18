# 📊 Test Data Engine

Advanced Excel Dashboard - A powerful data visualization and analysis platform for CSV/XLSX file processing with interactive charts, AG Grid tables, and comprehensive filtering.

**Version:** v1.0.1  
**Company:** Citrus Play  
**Last Updated:** January 2026

---

## 🎯 Project Overview

Test Data Engine is a modern web-based analytics dashboard designed for playtesting data analysis and performance metrics visualization. It enables users to upload CSV/XLSX files, create dynamic visualizations, and explore data through interactive tables with advanced filtering and sorting capabilities.

---

## ✨ Key Features

### **File Upload & Data Import**
- Support for CSV and XLSX file formats
- Automatic data parsing and sanitization
- Real-time data validation

### **Interactive Visualizations**
- **Bar Charts** - Compare metrics across categories
- **Line Charts** - Track trends over time
- **Pie Charts** - Analyze proportional distributions
- Dynamic color schemes with fallback to random colors
- Responsive container with smooth animations

### **Advanced Data Table**
- **AG Grid Integration** - Professional-grade data grid
- **Pagination** - 10, 20, 50, or 100 rows per page
- **Sorting** - Click headers to sort ascending/descending
- **Filtering** - Column-level filters with multiple options
- **Resizable Columns** - Adjust column widths on the fly
- **Dark Theme** - Seamless integration with UI design

### **Smart Filtering System**
- **Chart Type Selection** - Switch between Bar, Line, and Pie charts
- **X-Axis Selection** - Choose label column from dataset
- **Data Filter** - All, Min, or Max value filtering
- **Y-Axis Toggles** - Select multiple metrics as compact filter pills
- **Live Record Counter** - Real-time record count display

### **Professional UI/UX**
- Dark theme with grey/black aesthetic
- HeroUI component library
- Tailwind CSS for responsive design
- Smooth transitions and hover effects
- Mobile-responsive layout

---

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### **UI & Data Visualization**
- **HeroUI** - Modern React components
- **Recharts** - Interactive charts library
- **AG Grid Community** - Professional data grid
- **ModuleRegistry** - AG Grid module management

### **Data Processing**
- **XLSX** - Excel file parsing
- **PapaParse** - CSV parsing

### **Development**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📦 Project Structure

```
dashboard/
├── src/
│   ├── App.tsx                          # Main application component
│   ├── main.tsx                         # Application entry point
│   ├── index.css                        # Global styles
│   ├── App.css                          # App-specific styles
│   └── assets/
│       └── components/
│           ├── XLSXUploader.tsx         # File upload component
│           ├── DataTable.tsx            # AG Grid table component
│           └── DataTable.module.css     # AG Grid styling
├── public/
│   └── playtest_data.csv                # Sample playtesting dataset (60 players)
├── package.json                         # Dependencies and scripts
├── tsconfig.json                        # TypeScript configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── vite.config.ts                       # Vite build configuration
└── README.md                            # This file
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- npm 8+ or yarn

### **Installation**

```bash
# Clone repository
git clone <repository-url>
cd dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on `http://localhost:5173`

### **Building for Production**

```bash
# Compile TypeScript and build with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📊 Sample Data

A comprehensive playtesting dataset (`playtest_data.csv`) is included with:
- **60 Player Records** - Diverse playtester profiles
- **10+ Metrics** - Performance, network, and quality data
- **Edge Cases** - Ranges from excellent to poor performance
- Ready for testing sorting, filtering, and pagination

---

## 🎮 Usage Guide

### **Importing Data**
1. Click the "📁 Import Data" section
2. Select a CSV or XLSX file
3. Data loads and auto-detects columns

### **Creating Visualizations**
1. Select chart type (Bar, Line, Pie)
2. Choose X-Axis (label column)
3. Toggle Y-Axis metrics (use filter pills)
4. Apply filter (All, Min, Max)
5. Chart renders dynamically

### **Exploring Data**
1. Use AG Grid table for detailed view
2. Click column headers to sort
3. Use filter buttons in column headers
4. Drag column borders to resize
5. Switch between page sizes

---

## 🎨 Design System

### **Color Palette**
- **Primary Dark:** `#1a1a1a` (table background)
- **Secondary Dark:** `#242424` (headers)
- **Accent:** `#4f46e5` (Indigo - interactive elements)
- **Text Light:** `#e5e5e5` (primary text)
- **Text Muted:** `#999999` (secondary text)

### **Typography**
- Headers: Bold Tailwind sizing
- Body: 13-16px for readability
- Monospace: For data display

---

## 📈 Performance Specifications

- **Chart Rendering:** Handles 500+ data points smoothly
- **Table Pagination:** 10-100 rows per page configurable
- **Data Processing:** Real-time parsing for files up to 50MB
- **Responsive:** Optimized for desktop, tablet, and mobile

---

## 🐛 Testing & Edge Cases

The included sample dataset covers:
- ✅ Large datasets (60+ records)
- ✅ Multiple data types (numeric, text, categorical)
- ✅ Performance edge cases (high/low values)
- ✅ Missing/null data handling
- ✅ Multiple concurrent metrics

---

## 📝 Version History

**v1.0.1** (January 2026)
- Initial release
- AG Grid integration
- Full chart support (Bar, Line, Pie)
- Advanced filtering system
- Professional UI with dark theme

---

## 📄 License

© 2026 Citrus Play. All rights reserved.

---

## 🤝 Support

For issues, feature requests, or questions:
- Check the sample dataset for reference
- Review component documentation in code
- Test with provided playtesting data

---

**Built with ❤️ for data excellence**

