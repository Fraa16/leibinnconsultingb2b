export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const links = [
    { label: 'Startseite', id: 'hero' },
    { label: 'Ansatz', id: 'ansatz' },
    { label: 'Branchen', id: 'branchen' },
    { label: 'Über uns', id: 'ueber-uns' },
    { label: 'Kontakt', id: 'kontakt' },
  ];

  return (
    <footer id="footer" className="bg-bright-snow">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Leibinn Consulting
            </h3>
            <p className="text-black/60 text-sm">
              Benefit-Systeme für kleine und mittelständische Unternehmen.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-black/80 mb-3">Navigation</h4>
            <div className="flex flex-wrap gap-4">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-black/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-icy-blue/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/50">
            © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <button className="text-sm text-black/50 hover:text-primary transition-colors">
              Impressum
            </button>
            <button className="text-sm text-black/50 hover:text-primary transition-colors">
              Datenschutz
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
