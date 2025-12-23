const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Kamyker. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Game Programmer • UEFN Developer • Verse Pioneer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
