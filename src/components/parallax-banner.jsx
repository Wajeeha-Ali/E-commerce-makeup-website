import { Link } from 'react-router-dom';

export default function ParallaxBanner({
  image,
  title = 'Effortlessly Stylish',
  subtitle = 'Discover our curated collection of premium essentials.',
  cta = 'Shop Now',
  href = '/products',
}) {
  return (
    <section
      className="relative flex items-center justify-center text-center min-h-screen"
      style={{
        backgroundImage: `url(${image})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-2xl mx-auto">
        <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-4">
          {title}
        </h2>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          {subtitle}
        </p>
        <Link
          to={href}
          className="inline-block bg-white text-black text-xs font-semibold uppercase tracking-widest px-8 py-3 hover:bg-black hover:text-white transition-colors"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
