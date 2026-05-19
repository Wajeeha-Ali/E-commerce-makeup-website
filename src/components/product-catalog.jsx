import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Card({ product, index, imgHeight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-16"
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-muted" style={{ height: imgHeight }}>
          {product.image?.url ? (
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground">
          {product.name}
        </p>
      </Link>
    </motion.div>
  );
}

// [colIndex, initialTopOffset, imgHeight]
const LAYOUT = [
  [0, 80,  380],  // col 1 — starts lower
  [1,  0,  320],  // col 2 — starts at top (centered feel)
  [2, 140, 300],  // col 3 — starts lowest
  [0,  0,  260],
  [1,  0,  420],
  [2,  0,  240],
  [0,  0,  320],
  [1,  0,  260],
  [2,  0,  360],
];

function ProductCatalog({ products = [] }) {
  if (!products.length) return null;

  const cols = [[], [], []];
  products.slice(0, 9).forEach((product, i) => {
    const [col, , height] = LAYOUT[i] || [i % 3, 0, 300];
    cols[col].push({ product, index: i, height });
  });

  const topOffsets = [80, 0, 140]; // col 0 down, col 1 centered, col 2 most down

  return (
    <div className="grid grid-cols-3 gap-x-10 items-start">
      {cols.map((col, ci) => (
        <div key={ci} style={{ paddingTop: topOffsets[ci] }} className="flex flex-col">
          {col.map(({ product, index, height }) => (
            <Card key={product.id} product={product} index={index} imgHeight={height} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProductCatalog;
