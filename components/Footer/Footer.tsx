const footerLinks = ['Product', 'For Employers', 'Resources', 'Contact', 'Privacy'];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Stu. All rights reserved.</p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <a key={link} href="#" className="text-slate-700 underline-offset-2 hover:underline">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
