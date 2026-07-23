const SectionHeader = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-secondary">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
