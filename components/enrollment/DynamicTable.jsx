import { Plus, X } from 'lucide-react';

export default function DynamicTable({ columns, rows, onChange, addLabel = 'Add Row' }) {
  const addRow = () => {
    const newRow = columns.reduce((acc, col) => { acc[col.key] = ''; return acc; }, {});
    onChange([...rows, newRow]);
  };

  const removeRow = (index) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index, key, value) => {
    onChange(rows.map((row, i) => i === index ? { ...row, [key]: value } : row));
  };

  return (
    <div>
      {/* Header row */}
      <div className="hidden sm:flex items-center gap-3 pb-2 border-b border-gold/10">
        <span className="w-6 text-theme-muted text-xs">#</span>
        {columns.map(col => (
          <span key={col.key} className="flex-1 text-theme-body text-xs font-medium uppercase tracking-wide">{col.label}</span>
        ))}
        <span className="w-8" />
      </div>

      {/* Data rows */}
      <div className="space-y-1">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-3 py-2 border-b border-theme-input/40">
            <span className="w-6 text-gold/60 text-sm">{index + 1}</span>
            {columns.map(col => (
              <input
                key={col.key}
                type="text"
                placeholder={col.placeholder}
                value={row[col.key] || ''}
                onChange={(e) => updateRow(index, col.key, e.target.value)}
                className="flex-1 px-2 py-1.5 bg-transparent text-theme-heading text-sm border-b border-transparent focus:border-gold/50 outline-none transition-colors placeholder:text-theme-muted"
              />
            ))}
            <button type="button" onClick={() => removeRow(index)} className="w-8 h-8 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button type="button" onClick={addRow} className="mt-3 inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all">
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
    </div>
  );
}