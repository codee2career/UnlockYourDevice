import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, CreditCard, CheckCircle2, Zap } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (plan: string) => void;
  planName: string;
  price: string;
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess, planName, price }: PaymentModalProps) {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onPaymentSuccess(planName);
        setStep('details');
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[160] px-4"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                disabled={step === 'processing'}
              >
                <X size={24} />
              </button>

              {step === 'details' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-blue-500" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
                  <p className="text-slate-400 mb-8 font-medium">Purchasing {planName} Access</p>
                  
                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 mb-8 text-left">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
                      <span className="text-slate-400">Plan Type</span>
                      <span className="text-white font-bold">{planName}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-400">₹{price}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          disabled
                          value="4242 4242 4242 4242"
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-slate-300 focus:outline-none"
                        />
                     </div>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Demo Payment Gateway Active</p>
                  </div>

                  <button
                    onClick={handlePay}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
                  >
                    Confirm & Pay Now
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-xs text-center">
                    <Shield size={14} className="text-green-500" />
                    <span>SSL Encrypted Payment System</span>
                  </div>
                </motion.div>
              )}

              {step === 'processing' && (
                <div className="py-12">
                   <div className="w-20 h-20 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-8" />
                   <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment</h2>
                   <p className="text-slate-400">Please do not refresh the page...</p>
                </div>
              )}

              {step === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                   <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} className="text-green-500" />
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                   <p className="text-slate-400 mb-8">Your {planName} token has been credit to your account.</p>
                   <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 font-bold mb-4">
                      Transaction ID: #TXN-{Math.floor(Math.random() * 1000000)}
                   </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
