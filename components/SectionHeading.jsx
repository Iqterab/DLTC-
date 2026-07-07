export default function SectionHeading({ eyebrow, title, subtitle, center }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold/50" />
          <p className="text-gold text-xs font-medium tracking-[0.2em] uppercase">{eyebrow}</p>
          {center && <span className="h-px w-8 bg-gold/50" />}
        </div>
      )}
      <h2 className="font-serif-display text-4xl md:text-5xl text-theme-heading leading-[1.1]">{title}</h2>
      {subtitle && <p className="text-theme-body text-lg mt-4 leading-relaxed">{subtitle}</p>}
    </div>
  );
}