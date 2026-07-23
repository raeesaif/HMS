const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="">
      <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
