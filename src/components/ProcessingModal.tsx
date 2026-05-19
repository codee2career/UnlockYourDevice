import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Cable, RotateCw, Timer, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (actualDevice: string) => void;
  deviceName: string;
}

type Step = 'details' | 'connect' | 'reboot' | 'waiting' | 'finalizing' | 'success';

export default function ProcessingModal({ isOpen, onClose, onComplete, deviceName: initialDeviceType }: ProcessingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [progress, setProgress] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({
    brand: '',
    model: '',
    lockType: 'Network Lock'
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('details');
      setProgress(0);
      return;
    }

    let interval: any;

    if (currentStep === 'waiting') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCurrentStep('finalizing');
            return 100;
          }
          return prev + 2; 
        });
      }, 1000);
    }

    if (currentStep === 'finalizing') {
      setTimeout(() => setCurrentStep('success'), 3000);
    }

    return () => clearInterval(interval);
  }, [currentStep, isOpen]);

  const handleNext = () => {
    if (currentStep === 'details') {
      if (!deviceInfo.brand || !deviceInfo.model) {
        alert('Please fill in device details');
        return;
      }
      setCurrentStep('connect');
    }
    else if (currentStep === 'connect') setCurrentStep('reboot');
    else if (currentStep === 'reboot') setCurrentStep('waiting');
  };

  const stepsInfo = {
    details: {
      title: 'Device Details',
      desc: 'Specify the device you want to unlock using this token.',
      icon: Smartphone,
      color: 'text-blue-500',
      action: 'Next: Connection'
    },
    connect: {
      title: 'Connect Device',
      desc: 'Please connect your device to your PC using a high-quality USB cable.',
      icon: Cable,
      color: 'text-blue-400',
      action: 'I have connected the cable'
    },
    reboot: {
      title: 'Reboot Device',
      desc: 'Enter Download/Fastboot mode by rebooting your device now.',
      icon: RotateCw,
      color: 'text-cyan-500',
      action: 'Device is rebooting'
    },
    waiting: {
      title: 'Unlocking in Progress',
      desc: 'Waiting time: 1-2 mins. DO NOT REMOVE the cable during this process.',
      icon: Timer,
      color: 'text-yellow-500',
      action: null
    },
    finalizing: {
      title: 'Finalizing',
      desc: 'Almost there! Patching security layers and verifying signature...',
      icon: Smartphone,
      color: 'text-blue-300',
      action: null
    },
    success: {
      title: 'Device Unlocked!',
      desc: 'Congratulations! Your device has been successfully unlocked permanently.',
      icon: CheckCircle2,
      color: 'text-green-500',
      action: 'Go to Dashboard'
    }
  };

  const Info = stepsInfo[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[210] px-4"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
               
               {currentStep === 'success' && (
                 <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
                    <X size={24} />
                 </button>
               )}

               <div className="mb-8">
                  <div className={`w-24 h-24 bg-white/5 ${Info.color} rounded-3xl flex items-center justify-center mx-auto mb-6 relative`}>
                     <Info.icon size={48} className={currentStep === 'waiting' || currentStep === 'reboot' ? 'animate-pulse' : ''} />
                     {(currentStep === 'waiting' || currentStep === 'finalizing') && (
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-3xl border-t-blue-500 animate-spin" />
                     )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{Info.title}</h2>
                  <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed mb-8">{Info.desc}</p>

                  {currentStep === 'details' && (
                    <div className="space-y-4 max-w-xs mx-auto text-left">
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block ml-1">Brand</label>
                          <input 
                            value={deviceInfo.brand}
                            onChange={(e) => setDeviceInfo({...deviceInfo, brand: e.target.value})}
                            placeholder="e.g. Samsung, Xiaomi"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block ml-1">Model</label>
                          <input 
                            value={deviceInfo.model}
                            onChange={(e) => setDeviceInfo({...deviceInfo, model: e.target.value})}
                            placeholder="e.g. Galaxy S24, Note 13"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block ml-1">Lock Type</label>
                          <select 
                            value={deviceInfo.lockType}
                            onChange={(e) => setDeviceInfo({...deviceInfo, lockType: e.target.value})}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option>Network Lock</option>
                            <option>iCloud/Account Lock</option>
                            <option>Pattern/PIN/Password</option>
                            <option>Carrier Unlock</option>
                          </select>
                       </div>
                    </div>
                  )}
               </div>

               {(currentStep === 'waiting' || currentStep === 'finalizing') && (
                 <div className="mb-10 space-y-2">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
                       />
                    </div>
                    <div className="text-sm font-mono text-blue-400">{Math.floor(progress)}% Complete</div>
                 </div>
               )}

               {currentStep === 'waiting' && (
                 <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex items-start gap-4 text-left mb-10">
                    <AlertCircle className="text-yellow-500 shrink-0 mt-1" size={20} />
                    <p className="text-sm text-yellow-500/80 font-medium">
                       CRITICAL: Do not disconnect your device. This might result in permanent bricking if interrupted.
                    </p>
                 </div>
               )}

               {Info.action && (
                 <button
                   onClick={currentStep === 'success' ? () => onComplete(`${deviceInfo.brand} ${deviceInfo.model}`) : handleNext}
                   className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20"
                 >
                   {Info.action}
                 </button>
               )}

               {currentStep !== 'success' && currentStep !== 'details' && (
                 <div className="mt-8 text-slate-500 text-sm flex items-center justify-center gap-2">
                    <Smartphone size={16} />
                    Target: {deviceInfo.brand} {deviceInfo.model}
                 </div>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
