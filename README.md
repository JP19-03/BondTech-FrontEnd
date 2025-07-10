
# BondTech FrontEnd

BondTech FrontEnd is a web application built with Vue 3, Vite, PrimeVue, and TailwindCSS, designed for the management, valuation, and analysis of corporate bonds. It allows users to create, edit, and analyze bonds, visualize cash flows, calculate key financial indicators (TCEA, TREA, duration, convexity, etc.), and manage their investment portfolio in a simple and intuitive way.

## Main Features
- **Corporate bond management**: Register, edit, and consult bonds.
- **Calculation and visualization of results**: Obtain relevant financial indicators and visualize cash flows.
- **User authentication**: Secure sign up and sign in.
- **Internationalization (i18n)**: Multilanguage support (Spanish and English).
- **Modern interface**: Responsive and attractive UI with PrimeVue and TailwindCSS.

## Project Structure
```
src/
  bondValuation/
    components/        # Bond and result components
    layouts/           # Bond-specific layouts
    models/            # Domain entities and models
    pages/             # Main views (home, results)
    services/          # API interaction services
  iam/
    components/        # Authentication components
    layouts/           # Authentication layouts
    services/          # Authentication and notification services
  locales/             # Translation files (es/en)
  public/              # Public resources and global components
  router/              # Route configuration
  shared/              # Reusable components and services
```

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd BondTech-FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set the `VITE_API_BASE_URL` variable with your backend URL.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.

## Main Technologies
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)

## Relevant Folders and Files
- `src/bondValuation/`: Main logic and views for bond management.
- `src/iam/`: User authentication and management.
- `src/shared/`: Reusable components and services.
- `src/locales/`: Translation files.
- `src/router/`: Application routes.

## Customization
You can modify styles in `src/style.css` and texts in `src/locales/es.json` and `src/locales/en.json`.

## License
This project is for academic use and free for educational purposes.
