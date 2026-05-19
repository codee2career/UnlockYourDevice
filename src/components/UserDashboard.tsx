import { motion } from 'motion/react';
import { Smartphone, Zap, ShieldCheck, ArrowRight, Timer } from 'lucide-react';

interface UserDashboardProps {
  tokens: string[];
  history: any[];
  onUseToken: (token: string) => void;
  username: string;
}

export default function UserDashboard({ tokens, history, onUseToken, username }: UserDashboardProps) {
  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome, {username}!</h2>
                <p className="text-slate-400">Manage your active tokens and start device unlocking.</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl">
                 <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Zap size={20} className="text-blue-500" />
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Tokens</div>
                    <div className="text-2xl font-bold text-white">{tokens.length}</div>
                 </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-6">Your Tokens</h3>
                
                {tokens.length === 0 ? (
                  <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-12 text-center">
                    <p className="text-slate-500 mb-6">You don't have any active tokens yet.</p>
                    <a href="#pricing" className="text-blue-400 font-bold hover:underline">Browse Plans & Purchase Token</a>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {tokens.map((token, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-6">
                           <div className={`p-3 rounded-2xl ${token === 'Diamond' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-blue-500/10 text-blue-500'}`}>
                              <Smartphone size={24} />
                           </div>
                           <div className="text-xs font-mono text-slate-600">ID: #{Math.random().toString(36).substr(2, 5).toUpperCase()}</div>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">{token} Token</h4>
                        <p className="text-sm text-slate-500 mb-6">Valid for any {token.includes('Tablet') ? 'Tablet' : 'Mobile'} device.</p>
                        
                        <button
                          onClick={() => onUseToken(token)}
                          className="w-full bg-slate-800 hover:bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          Use Now <ArrowRight size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Unlock History</h3>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                   <div className="p-6 space-y-6">
                      {history.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-4">No history found.</p>
                      ) : (
                        history.map((record, i) => (
                          <div key={i} className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800 last:border-0 last:pb-0">
                            <div className="flex items-start gap-3">
                              <div className="bg-green-500/10 p-2 rounded-lg mt-1 shrink-0">
                                <ShieldCheck size={18} className="text-green-500" />
                              </div>
                              <div>
                                <h4 className="text-white font-bold text-sm">{record.device}</h4>
                                <p className="text-xs text-slate-500">{record.date} • {record.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold text-sm">₹{record.price}</div>
                              <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{record.status}</div>
                            </div>
                          </div>
                        ))
                      )}
                   </div>
                   {history.length > 0 && (
                     <div className="bg-slate-800/50 p-4 text-center">
                        <button className="text-xs text-blue-400 font-bold hover:underline py-1">Download All Invoices</button>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
