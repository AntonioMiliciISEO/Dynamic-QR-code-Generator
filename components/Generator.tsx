
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
  // Default: Light Gray text (text-slate-400)
  // Modified: White text (text-white)
  const [isBaseUrlModified, setIsBaseUrlModified] = useState(false);
  const [isCodeModified, setIsCodeModified] = useState(false);
  const [isIdModified, setIsIdModified] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Computed full URL using '#' for parameters
  const fullUrl = useMemo(() => {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    // Constructing the URL with the hash fragment as requested
    return `${base}#code=${encodeURIComponent(code)}&id=${encodeURIComponent(id)}`;
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

  const inputBaseClass = "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all font-medium placeholder:text-slate-600";

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-100/50">
      {/* Input Section */}
      <div className="p-6 sm:p-10 border-b border-slate-50">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-sliders text-indigo-500"></i>
          Configuration
        </h2>
        
        <div className="space-y-6">
          {/* Base URL Input */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-500 mb-2 transition-colors group-focus-within:text-indigo-600">
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
                  isBaseUrlModified ? 'text-white' : 'text-slate-400'
                }`}
                placeholder="Enter base URL..."
              />
              <div className="absolute right-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400">
                <i className="fa-solid fa-link"></i>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Code Input */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-500 mb-2 transition-colors group-focus-within:text-indigo-600">
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
                  isCodeModified ? 'text-white' : 'text-slate-400'
                }`}
                placeholder="Enter code..."
              />
            </div>

            {/* ID Input */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-500 mb-2 transition-colors group-focus-within:text-indigo-600">
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
                  isIdModified ? 'text-white' : 'text-slate-400'
                }`}
                placeholder="Enter ID..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Output Section */}
      <div className="p-6 sm:p-10 bg-slate-50/50 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 self-start flex items-center gap-2">
          <i className="fa-solid fa-eye text-indigo-500"></i>
          Generated Output
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 group cursor-pointer relative" onClick={handleDownload}>
          <div ref={canvasRef} className="relative z-10">
            <QRCodeCanvas 
              value={fullUrl} 
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "https://picsum.photos/40/40",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold text-indigo-600 flex items-center gap-2">
              <i className="fa-solid fa-download"></i>
              Download PNG
            </div>
          </div>
        </div>

        {/* URL Preview Card */}
        <div className="w-full bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter block">Encoded URL (with Fragment)</span>
            <span className="text-sm font-mono text-indigo-600 truncate block">
              {fullUrl}
            </span>
          </div>
          <button 
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-copy"></i>
            Copy URL
          </button>
        </div>

        <button 
          onClick={handleDownload}
          className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-download"></i>
          Export QR Code
        </button>
        
        <p className="mt-4 text-xs text-slate-400 text-center">
            The QR code updates in real-time. Parameters are passed via URL fragment (#).
        </p>
      </div>
    </div>
  );
};
