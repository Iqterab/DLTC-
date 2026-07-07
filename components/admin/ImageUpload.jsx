const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await db.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } catch (e) { console.error(e); }
    setUploading(false);
  };

  return (
    <div>
      {label && <label className="block text-theme-body text-sm font-medium mb-1.5">{label}</label>}
      {value && <img src={value} alt="" className="w-full h-32 object-cover rounded-lg mb-2 border border-gold/20" />}
      <label className="flex items-center justify-center gap-2 px-4 py-2 border border-theme-input rounded-lg text-theme-body text-sm cursor-pointer hover:border-gold/30 hover:text-gold transition-all">
        {uploading ? 'Uploading...' : <><Upload className="w-4 h-4" /> Upload Image</>}
        <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
      </label>
    </div>
  );
}