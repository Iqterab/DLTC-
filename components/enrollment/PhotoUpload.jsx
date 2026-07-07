const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

export default function PhotoUpload({ photo, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await db.integrations.Core.UploadFile({ file });
      onUpload(file_url);
    } catch (e) {
      console.error('Upload failed:', e);
    }
    setUploading(false);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => document.getElementById('photo-input').click()}
      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer min-h-[200px] flex flex-col items-center justify-center ${
        dragging ? 'border-gold bg-gold/5' : 'border-theme-input hover:border-gold/50'
      }`}
    >
      <input id="photo-input" type="file" accept="image/*" className="hidden"
        onChange={(e) => handleFile(e.target.files[0])} />
      {uploading ? (
        <div className="py-4">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
          <p className="text-theme-body text-sm mt-2">Uploading...</p>
        </div>
      ) : photo ? (
        <div className="py-2 flex flex-col items-center">
          <img src={photo} alt="Passport" className="w-24 h-28 object-cover rounded-lg border border-gold/20" />
          <div className="flex items-center gap-1.5 mt-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-green-400 text-xs font-medium">Photo uploaded</p>
          </div>
          <p className="text-theme-muted text-xs mt-1">Click to change</p>
        </div>
      ) : (
        <div className="py-4 flex flex-col items-center">
          <Upload className="w-8 h-8 text-theme-muted mb-2" />
          <p className="text-theme-body text-sm font-medium">Drag & Drop Photo</p>
          <p className="text-theme-muted text-xs mt-1">or click to upload</p>
          <p className="text-gold/60 text-xs mt-2">Passport size photo</p>
        </div>
      )}
    </div>
  );
}