import React, { useState, useMemo, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const DEFAULT_BASE_URL = "https://dynamic-key-card-page.vercel.app/";
const DEFAULT_CODE = "12345678";
const DEFAULT_ID = "2";

export const Generator: React.FC = () => {
  // Input values
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [id, setId] = useState(DEFAULT_ID);

  // Modification tracking for styling
  const [isBaseUrlModified, setIsBaseUrlModified] = useState(false);
  const [isCodeModified, setIsCodeModified] = useState(false);
  const [isIdModified, setIsIdModified] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Computed full URL using standard query parameters '?'
  const fullUrl = useMemo(() => {
    try {
      const url = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
      url.searchParams.set('code', code);
      url.searchParams.set('id', id);
      return url.toString();
    } catch (e) {
      // Fallback in case of invalid URL base
      const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      return `${base}?code=${encodeURIComponent(code)}&id=${encodeURIComponent(id)}`;
    }
  }, [baseUrl, code, id]);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-code-${code}-${id}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    alert('URL copied to clipboard!');
  };

  // Base class for inputs: white background to make dark text visible
  const inputBaseClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium placeholder:text-slate-300 shadow-sm";

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all">
      {/* Input Section */}
      <div className="p-6 sm:p-10 border-b border-slate-50">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-gear text-indigo-500"></i>
          Configurazione Parametri
        </h2>
        
        <div className="space-y-6">
          {/* Base URL Input */}
          <div className="group">
            <label className="block text-sm font-bold text-slate-600 mb-2 transition-colors group-focus-within:text-indigo-600">
              Base URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                  setIsBaseUrlModified(true);
                }}
                className={`${inputBaseClass} ${
                  isBaseUrlModified ? 'text-slate-800' : 'text-slate-400'
                }`}
                placeholder="Inserisci URL base..."
              />
              <div className="absolute right-4 top-3.5 text-slate-300 group-focus-within:text-indigo-400 transition-colors">
                <i className="fa-solid fa-link"></i>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Code Input */}
            <div className="group">
              <label className="block text-sm font-bold text-slate-600 mb-2 transition-colors group-focus-within:text-indigo-600">
                Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setIsCodeModified(true);
                }}
                className={`${inputBaseClass} ${
                  isCodeModified ? 'text-slate-800' : 'text-slate-400'
                }`}
                placeholder="Inserisci code..."
              />
            </div>

            {/* ID Input */}
            <div className="group">
              <label className="block text-sm font-bold text-slate-600 mb-2 transition-colors group-focus-within:text-indigo-600">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setIsIdModified(true);
                }}
                className={`${inputBaseClass} ${
                  isIdModified ? 'text-slate-800' : 'text-slate-400'
                }`}
                placeholder="Inserisci ID..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Output Section */}
      <div className="p-6 sm:p-10 bg-slate-50/50 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 self-start flex items-center gap-2">
          <i className="fa-solid fa-qrcode text-indigo-500"></i>
          QR Code Generator
        </h2>

        <div 
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8 group cursor-pointer relative hover:scale-105 transition-transform" 
          onClick={handleDownload}
          title="Clicca per scaricare"
        >
          <div ref={canvasRef} className="relative z-10">
            <QRCodeCanvas 
              value={fullUrl} 
              size={240}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white px-4 py-2 rounded-full shadow-xl text-xs font-bold text-indigo-600 flex items-center gap-2">
              <i className="fa-solid fa-download"></i>
              SCARICA PNG
            </div>
          </div>
        </div>

        {/* URL Preview Card */}
        <div className="w-full bg-white p-5 rounded-xl border border-slate-200 flex flex-col items-center gap-4">
          <div className="w-full text-center overflow-hidden">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">URL COMPLETO</span>
            <span className="text-sm font-mono text-indigo-600 break-all bg-slate-50 p-2 rounded block">
              {fullUrl}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={handleCopy}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-copy"></i>
              Copia Link
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-file-arrow-down"></i>
              Salva Immagine
            </button>
          </div>
        </div>
        
        <p className="mt-6 text-xs text-slate-400 font-medium">
            <i className="fa-solid fa-circle-info mr-1"></i>
            Il QR code si aggiorna istantaneamente ad ogni modifica.
        </p>
      </div>
    </div>
  );
};