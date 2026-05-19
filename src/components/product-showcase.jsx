import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import kikolip from '../assets/kikolip.png';
import kikogloss from '../assets/kiko gloss.webp';
import ysllip from '../assets/ysllip.png';
import sauvage from '../assets/sauvage.png';
import yslperfume from '../assets/yslperfume.png';

const SHOWCASE_PRODUCTS = [
  { id: 'kiko-lip', name: 'Kiko Lip', image: kikolip, description: 'A bold, long-lasting lip colour with a rich pigmented formula for an intense finish.', objectPosition: 'bottom' },
  { id: 'kiko-gloss', name: 'Kiko Gloss', image: kikogloss, description: 'High-shine lip gloss with a plumping effect and irresistible glossy finish.', objectPosition: 'bottom' },
  { id: 'ysl-lip', name: 'YSL Lip', image: ysllip, description: 'Iconic YSL lip colour — luxurious, velvety texture with couture-level pigmentation.', objectPosition: 'center' },
  { id: 'sauvage', name: 'Sauvage', image: sauvage, description: 'A raw, noble, and wild fragrance. Fresh and woody with a powerful trail.', objectPosition: 'center' },
  { id: 'ysl-perfume', name: 'YSL Perfume', image: yslperfume, description: 'A timeless YSL fragrance — sensual, bold, and unmistakably luxurious.', objectPosition: 'center' },
];

export default function ProductShowcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % SHOWCASE_PRODUCTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const product = SHOWCASE_PRODUCTS[current];

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length);
  };

  return (
    <section className="relative w-full flex flex-col lg:flex-row bg-white lg:h-[600px]">
      {/* Animated grey half-circle glow on the left — desktop only */}

      {/* Left — product info */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 pt-10 pb-6 lg:px-20 lg:py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + '-info'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-none uppercase">
              {product.name}
            </h2>
            <div className="w-12 h-px bg-border mt-6 mb-6" />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              {product.description}
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Discover More <ChevronRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-8 mb-8 lg:mb-0">
          <button onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5 ml-2">
            {SHOWCASE_PRODUCTS.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1 rounded-full transition-all ${i === current ? 'w-6 bg-foreground' : 'w-1.5 bg-border'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right — product image */}
      <div className="lg:w-1/2 relative flex items-center justify-center overflow-hidden" style={{ minHeight: '300px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={product.id + '-img'}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-w-[320px] max-h-[320px] lg:max-w-[480px] lg:max-h-[480px]"
              style={{ objectFit: 'contain', objectPosition: product.objectPosition, mixBlendMode: 'multiply' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
