import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl font-semibold text-foreground">
                Atelier
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curated essentials designed for the modern lifestyle. Premium quality meets timeless design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/bestsellers"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;