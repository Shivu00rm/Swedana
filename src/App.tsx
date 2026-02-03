import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import layout components
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';

// Import pages
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import BenefitsPage from './pages/BenefitsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import InstallationPage from './pages/InstallationPage';
import MaintenancePage from './pages/MaintenancePage';
import SafetyPage from './pages/SafetyPage';
import ComparePage from './pages/ComparePage';
import FAQPage from './pages/FAQPage';
import TestimonialsPage from './pages/TestimonialsPage';

// Lazy load admin dashboard
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

// Layout wrapper for all pages
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-zenith-black">
    <div className="noise-overlay" />
    <Navigation />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/how-it-works" element={<PageLayout><HowItWorksPage /></PageLayout>} />
        <Route path="/benefits" element={<PageLayout><BenefitsPage /></PageLayout>} />
        <Route path="/products" element={<PageLayout><ProductsPage /></PageLayout>} />
        <Route path="/products/:slug" element={<PageLayout><ProductDetailPage /></PageLayout>} />
        <Route path="/installation" element={<PageLayout><InstallationPage /></PageLayout>} />
        <Route path="/maintenance" element={<PageLayout><MaintenancePage /></PageLayout>} />
        <Route path="/safety" element={<PageLayout><SafetyPage /></PageLayout>} />
        <Route path="/compare" element={<PageLayout><ComparePage /></PageLayout>} />
        <Route path="/faq" element={<PageLayout><FAQPage /></PageLayout>} />
        <Route path="/testimonials" element={<PageLayout><TestimonialsPage /></PageLayout>} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={
              <div className="min-h-screen bg-zenith-black flex items-center justify-center">
                <div className="text-zenith-gold">Loading Admin...</div>
              </div>
            }>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
