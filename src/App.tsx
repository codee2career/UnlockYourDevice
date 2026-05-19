/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Pricing from './components/Pricing';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import UnlockForm from './components/UnlockForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import UserDashboard from './components/UserDashboard';
import PaymentModal from './components/PaymentModal';
import ProcessingModal from './components/ProcessingModal';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: '' });
  const [isProcessingOpen, setIsProcessingOpen] = useState(false);
  const [unlockDevice, setUnlockDevice] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('unlock_user');
    if (savedUser) setUser(savedUser);

    const savedTokens = localStorage.getItem('unlock_tokens');
    if (savedTokens) {
      try {
        setTokens(JSON.parse(savedTokens));
      } catch (e) {
        setTokens([]);
      }
    }

    const savedHistory = localStorage.getItem('unlock_history');
    let historyData = [];
    if (savedHistory) {
      try {
        historyData = JSON.parse(savedHistory);
      } catch (e) {
        historyData = [];
      }
    }

    // Ensure the required pre-loaded entry exists
    const hasPreloaded = historyData.some((h: any) => h.device === 'Lenovo M10 Tab' && h.date === '19/05/2026');
    if (!hasPreloaded) {
      const preloadedEntry = {
        device: 'Lenovo M10 Tab',
        price: '399',
        time: '09:11 AM',
        date: '19/05/2026',
        status: 'Successful'
      };
      historyData = [preloadedEntry, ...historyData];
      localStorage.setItem('unlock_history', JSON.stringify(historyData));
    }
    setHistory(historyData);
  }, []);

  const handleLoginSuccess = (username: string) => {
    setUser(username);
    localStorage.setItem('unlock_user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('unlock_user');
    localStorage.removeItem('unlock_tokens');
    localStorage.removeItem('unlock_history');
    setTokens([]);
    setHistory([]);
  };

  const handlePurchase = (plan: string, price: string) => {
    if (!user) {
      alert('Please login first to purchase a token.');
      // In a real app we'd open the login modal here
      return;
    }
    setSelectedPlan({ name: plan, price });
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (plan: string) => {
    const newTokens = [...tokens, plan];
    setTokens(newTokens);
    localStorage.setItem('unlock_tokens', JSON.stringify(newTokens));
    setIsPaymentOpen(false);
  };

  const handleUseToken = (token: string) => {
    setUnlockDevice(token === 'Diamond' ? 'Tablet' : 'Mobile');
    setIsProcessingOpen(true);
  };

  const handleProcessComplete = (actualDeviceName: string) => {
    // Remove one token (1 purchase = 1 use)
    const newTokens = [...tokens];
    // Find the first occurrence of the specific token type used
    const tokenToFind = unlockDevice === 'Tablet' ? 'Tablet Unlock' : 'Mobile Unlock';
    const index = newTokens.indexOf(tokenToFind);
    
    if (index > -1) {
      newTokens.splice(index, 1);
      setTokens(newTokens);
      localStorage.setItem('unlock_tokens', JSON.stringify(newTokens));

      // Add to history
      const now = new Date();
      const newHistory = [{
        device: actualDeviceName,
        price: unlockDevice === 'Tablet' ? '399' : '350',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('en-GB'),
        status: 'Successful'
      }, ...history];
      setHistory(newHistory);
      localStorage.setItem('unlock_history', JSON.stringify(newHistory));
    }
    setIsProcessingOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar user={user} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      <main>
        <Hero />
        
        {user && (
          <UserDashboard 
            username={user} 
            tokens={tokens} 
            history={history}
            onUseToken={handleUseToken} 
          />
        )}

        <Features />
        <HowItWorks />
        <Brands />
        <Pricing onSelectPlan={handlePurchase} />
        <UnlockForm />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        planName={selectedPlan.name}
        price={selectedPlan.price}
      />

      <ProcessingModal 
        isOpen={isProcessingOpen}
        onClose={() => setIsProcessingOpen(false)}
        onComplete={handleProcessComplete}
        deviceName={unlockDevice}
      />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 z-[60] w-0 transition-all duration-300" id="scroll-progress" />
    </div>
  );
}

