import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/pexels-2mephoto-36716424.jpg';
import img2 from '../assets/pexels-pedro-paixao-2152282436-32251870.jpg';

const marqueeText = [
  'DESIGNED FOR MODERN BRANDS',
  'REMARKABLE SELECTION OF ELEMENTS',
  'MENSWEAR & FASHION STORE',
  'PREMIUM QUALITY ESSENTIALS',
];

const clipReveal = {
  hidden: { clipPath: 'inset(100% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
};

function HeroSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          width: '100%',
          height: isMobile ? 'auto' : '92vh',
        }}
      >
        {[img1, img2].map((img, index) => (
          <motion.div
            key={index}
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: isMobile ? '50vh' : '100%',
            }}
            variants={clipReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={img}
              alt={`Hero ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
          </motion.div>
        ))}
      </div>

      <div className="bg-background border-t border-border py-3 overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {[...marqueeText, ...marqueeText].map((text, i) => (
            <span
              key={i}
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              {text}
              <span className="mx-8 text-foreground/30">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
