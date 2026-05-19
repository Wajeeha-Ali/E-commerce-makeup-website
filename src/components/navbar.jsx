import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";

function Navbar({ cartCount = 0, dark = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerClass = dark
    ? "sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-lg"
    : "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg";

  const textClass = dark ? "text-white" : "text-foreground";
  const mutedClass = dark ? "text-white/50" : "text-muted-foreground";
  const mobileMenuClass = dark
    ? "border-t border-white/10 bg-black/40 backdrop-blur-lg md:hidden"
    : "border-t border-border/40 bg-background/95 backdrop-blur-lg md:hidden";

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-serif text-2xl font-semibold tracking-tight ${textClass}`}>
            Lumière
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/faq', 'FAQ']].map(([path, label]) => (
            <Link key={path} to={path} className={`relative text-sm font-medium ${textClass} transition-colors group pb-1`}>
              {label}
              <span
                className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"
                style={{
                  background: dark
                    ? 'linear-gradient(to right, transparent 0%, white 50%, transparent 100%)'
                    : 'linear-gradient(to right, transparent 0%, #000 50%, transparent 100%)',
                  filter: dark ? 'blur(0.5px)' : 'none',
                }}
              />
            </Link>
          ))}
        </div>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingBag className={`h-5 w-5 ${textClass}`} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className={`md:hidden p-2 rounded ${dark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className={`h-5 w-5 ${textClass}`} /> : <Menu className={`h-5 w-5 ${textClass}`} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={mobileMenuClass}>
          <div className="space-y-1 px-4 py-4">
            {['/', '/products', '/about', '/faq'].map((path, i) => (
              <Link key={path} to={path} className={`block py-2 text-base font-medium ${textClass} transition-colors`} onClick={() => setIsMenuOpen(false)}>
                {['Home', 'Products', 'About', 'FAQ'][i]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;