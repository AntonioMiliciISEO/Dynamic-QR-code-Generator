
import React from 'react';
import { Generator } from './components/Generator';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-qrcode text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              QR Gen Pro
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-widest hidden sm:block">
            Dynamic Key Card Utility
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <Generator />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} QR Gen Pro. Built for Dynamic Key Card Systems.
        </div>
      </footer>
    </div>
  );
};

export default App;
