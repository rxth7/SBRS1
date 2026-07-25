import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from './lib/supabase';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Academics from './sections/Academics';
import CampusGallery from './sections/CampusGallery';
import Vision from './sections/Vision';
import PrincipalMessage from './sections/PrincipalMessage';
import Admissions from './sections/Admissions';
import Events from './sections/Events';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FacultyGallery from './pages/FacultyGallery';
import CampusGalleryPage from './pages/CampusGalleryPage';
import Facilities from './pages/Facilities';
import EducationalPrograms from './pages/EducationalPrograms';
import Achievements from './pages/Achievements';
import Feedback from './pages/Feedback';
import UpcomingEvents from './pages/UpcomingEvents';
import FeeStructure from './pages/FeeStructure';
import AboutSchool from './pages/AboutSchool';
import LatestNews from './pages/LatestNews';
import LatestUpdates from './pages/LatestUpdates';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import Curriculum from './pages/Curriculum';
import Alumni from './pages/Alumni';
import AlumniAssociation from './pages/AlumniAssociation';
import AlumniMeet from './pages/AlumniMeet';
import SuccessStoryDetail from './pages/SuccessStoryDetail';
import SuccessStories from './pages/SuccessStories';

gsap.registerPlugin(ScrollTrigger);

function SectionPage({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ivory">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#gallery') {
      setTimeout(() => {
        const el = document.getElementById('gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Academics />
        <CampusGallery />
        <Vision />
        <PrincipalMessage />
        <Events />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function AdminRoute() {
  const [mode, setMode] = useState<'loading' | 'login' | 'dashboard' | 'recovery'>('loading');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setMode(s ? 'dashboard' : 'login');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('recovery');
      } else if (s) {
        setMode('dashboard');
      } else {
        setMode('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMode('login');
  };

  if (mode === 'recovery') {
    return <ResetPassword onComplete={() => setMode('login')} />;
  }

  if (mode === 'loading') {
    return (
      <div className="h-screen bg-slate flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-saffron border-t-transparent rounded-full" />
      </div>
    );
  }

  if (mode === 'login') {
    return <AdminLogin onLogin={() => setMode('dashboard')} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<SectionPage><About /></SectionPage>} />
      <Route path="/academics" element={<SectionPage><Academics /></SectionPage>} />
      <Route path="/gallery" element={<CampusGalleryPage />} />
      <Route path="/admissions" element={<SectionPage><Admissions /></SectionPage>} />
      <Route path="/events" element={<SectionPage><Events /></SectionPage>} />
      <Route path="/contact" element={<SectionPage><Contact /></SectionPage>} />
      <Route path="/faculty" element={<FacultyGallery />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/educational-programs" element={<EducationalPrograms />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/upcoming-events" element={<UpcomingEvents />} />
      <Route path="/fee-structure" element={<FeeStructure />} />
      <Route path="/about-school" element={<AboutSchool />} />
      <Route path="/latest-news" element={<LatestNews />} />
      <Route path="/latest-updates" element={<LatestUpdates />} />
      <Route path="/mandatory-public-disclosure" element={<MandatoryDisclosure />} />
      <Route path="/alumni" element={<Alumni />} />
      <Route path="/alumni-association" element={<AlumniAssociation />} />
      <Route path="/alumni-meet" element={<AlumniMeet />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;
