import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Header from '../components/header';
import bgImage from '../assets/pexels-laurachouette-21575069.jpg';

const FAQS = [
  { q: 'How do I place an order?', a: 'Browse our makeup and fragrance collections, add items to your cart, and proceed to checkout. You can review your order before confirming.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 24 hours of placement. Contact our support team as soon as possible.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express shipping (2–3 business days) is available at checkout.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. International shipping times vary between 7–14 business days.' },
  { q: 'What is your return policy?', a: 'For hygiene reasons, opened makeup and fragrance products cannot be returned unless faulty. Unopened items may be returned within 30 days in original packaging.' },
  { q: 'Are your products authentic?', a: 'Yes, every product is 100% authentic and sourced directly from authorised brand distributors. We never stock imitations.' },
  { q: 'Are your products cruelty-free?', a: 'We prioritise cruelty-free brands and clearly label each product. Check the product page for individual brand certifications.' },
  { q: 'How do I find the right fragrance?', a: 'Use our scent guide on each product page — we categorise fragrances by family (floral, woody, fresh, oriental) to help you find your perfect match.' },
  { q: 'How should I store my perfume?', a: 'Store fragrances away from direct sunlight and heat, ideally in a cool, dry place. Avoid keeping them in the bathroom where humidity can degrade the scent.' },
  { q: 'Are products restocked if sold out?', a: 'Popular items are restocked regularly. You can sign up for restock notifications on the product page.' },
];

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-white/20"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        {open ? (
          <Minus className="h-4 w-4 shrink-0 text-white/60" />
        ) : (
          <Plus className="h-4 w-4 shrink-0 text-white/60" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/70">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen">
        {/* Blurred background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            filter: 'blur(6px)',
            transform: 'scale(1.05)',
          }}
        />
        <div className="fixed inset-0 -z-10 bg-black/30" />

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Header */}
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">
              Help Center
            </span>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-white mt-3">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-white/60 max-w-md mx-auto text-sm">
              Can't find what you're looking for? Reach out to our support team.
            </p>
          </motion.div>

          {/* FAQ items */}
          <div>
            {FAQS.map((item, index) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-14 relative overflow-hidden bg-black rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated grey diagonal glow — matches footer */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(to top right, rgba(200,200,200,0.7) 0%, rgba(160,160,160,0.35) 40%, transparent 65%)',
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10">
              <h3 className="font-serif text-xl font-semibold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-sm text-white/60 mb-6">
                Our support team is available Monday–Friday, 9am–6pm.
              </p>
              <a
                href="mailto:support@lumiere.com"
                className="inline-block bg-white text-black text-xs font-semibold uppercase tracking-widest px-6 py-3 hover:bg-black hover:text-white hover:border hover:border-white transition-colors"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
