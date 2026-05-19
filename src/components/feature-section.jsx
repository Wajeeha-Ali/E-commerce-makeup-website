import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

function AutoCarousel({ images = [], interval = 3000 }) {
  const [current, setCurrent] = useState(0);
  const valid = images.filter(Boolean);

  useEffect(() => {
    if (valid.length < 2) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % valid.length), interval);
    return () => clearInterval(t);
  }, [valid.length, interval]);

  if (!valid.length) return <div className="w-full h-full bg-muted" />;

  return (
    <div className="relative overflow-hidden bg-[#f0f0f0]" style={{ width: 220, height: 280 }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={valid[current]}
          alt={`slide ${current}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {valid.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all ${i === current ? 'w-5 bg-black' : 'w-1.5 bg-black/25'}`}
          />
        ))}
      </div>
    </div>
  );
}

function SideImage({ src, title, href = '/products', cta = 'View More', isMobile }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex items-end"
      style={{
        backgroundColor: '#111',
        width: isMobile ? '100%' : '50%',
        height: isMobile ? 300 : '100%',
      }}
    >
      {src && (
        <motion.div
          style={{
            y,
            position: 'absolute',
            inset: '-15% 0',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 p-8 pb-10">
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase leading-snug mb-5 whitespace-pre-line">
          {title}
        </h2>
        <Link
          to={href}
          className="inline-block bg-white text-black text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 hover:bg-black hover:text-white transition-colors"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function FeatureSection({ topLeftImage = null, bottomRightImage = null, products = [] }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const productImages = products.map(p => p.image?.url).filter(Boolean);
  const half = Math.ceil(productImages.length / 2);
  const groupA = productImages.slice(0, half);
  const groupB = productImages.slice(half);

  const rowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    height: isMobile ? 'auto' : 420,
  };

  const carouselPanelStyle = {
    width: isMobile ? '100%' : '50%',
    height: isMobile ? 320 : '100%',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  };

  return (
    <div className="w-full">
      {/* Row 1 */}
      <div style={rowStyle}>
        <SideImage src={topLeftImage} title={'Iconic\nLip Colours &\nGlosses'} href="/products" isMobile={isMobile} />
        <div style={carouselPanelStyle}>
          <AutoCarousel images={groupA} interval={3000} />
          <AutoCarousel images={groupB} interval={3800} />
        </div>
      </div>

      {/* Row 2 */}
      <div style={rowStyle}>
        <div style={carouselPanelStyle}>
          <AutoCarousel images={groupB} interval={4200} />
          <AutoCarousel images={groupA} interval={3500} />
        </div>
        <SideImage src={bottomRightImage} title={'Signature\nScents &\nFragrances'} href="/about" cta="View More" isMobile={isMobile} />
      </div>
    </div>
  );
}
