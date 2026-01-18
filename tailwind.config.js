/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
      },
      boxShadow: {
        'smooth': '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
        'smooth-lg': '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'line': '0 1px 0 0 rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '350': '350ms',
      },
      borderColor: {
        'subtle': 'rgba(0, 0, 0, 0.08)',
        'line': 'rgba(0, 0, 0, 0.12)',
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}

