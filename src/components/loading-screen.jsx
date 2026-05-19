import { motion } from 'framer-motion';

const letters = ['L', 'u', 'm', 'i', 'è', 'r', 'e'];

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Letter-by-letter rise animation */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'inline-block',
              fontFamily: 'Georgia, serif',
              fontSize: '3rem',
              fontWeight: 600,
              color: '#111',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Sliding progress bar */}
      <div style={{ width: '120px', height: '1px', background: '#e0e0e0', overflow: 'hidden', marginTop: '2rem' }}>
        <motion.div
          style={{ height: '100%', background: '#111' }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>

      {/* Tagline rising up */}
      <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
        <motion.p
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', margin: 0 }}
        >
          Beauty &amp; Fragrance
        </motion.p>
      </div>
    </div>
  );
}

export default LoadingScreen;
