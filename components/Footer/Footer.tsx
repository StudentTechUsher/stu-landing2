const footerLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Model', href: '#model' },
  { label: 'Differentiation', href: '#difference' },
  { label: 'Pilot', href: '#pilot' },
  { label: 'Contact', href: '/contact' }
];

export const Footer = () => {
  return (
    <footer className="border-t border-[#c9d7d2] bg-white/70 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#4b675f] dark:text-slate-400">© {new Date().getFullYear()} Stu. All rights reserved.</p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#28463d] underline-offset-2 transition hover:underline dark:text-slate-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
