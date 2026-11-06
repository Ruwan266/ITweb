import { Outlet } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingCTA from '@/components/feature/FloatingCTA';
import CookieConsent from '@/components/feature/CookieConsent';
import ScrollToTop from '@/components/feature/ScrollToTop';
import useSmoothScroll from '@/hooks/useSmoothScroll';

export default function Layout() {
  useSmoothScroll();

  return (
    <div className="min-h-dvh flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
