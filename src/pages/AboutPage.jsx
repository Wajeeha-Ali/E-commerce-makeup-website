import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import SiteFooter from "../components/site-footer";

import heroImg from "../assets/pexels-alexis-b-1699196-31305108.jpg";
import img1 from "../assets/pexels-vitalyagorbachev-26927322.jpg";
import img2 from "../assets/pexels-laurachouette-29899586.jpg";
import img3 from "../assets/pexels-noyami-170979394-14936188.jpg";

const values = [
  { title: "Artistry", description: "Every product is a canvas. We partner with the world's finest beauty houses to bring you formulas that perform as beautifully as they look." },
  { title: "Sustainability", description: "We source responsibly and champion cruelty-free beauty — because looking good should never come at the planet's expense." },
  { title: "Confidence", description: "Beauty is personal. We curate products that celebrate individuality and empower you to express yourself without limits." },
];

const editorials = [
  { img: img1, title: "Kiko Milano", desc: "Vibrant, long-lasting lip colours with rich pigmentation for an intense finish." },
  { img: img2, title: "Scent Stories", desc: "Discover the fragrances that define modern luxury." },
  { img: img3, title: "Skin & Glow", desc: "Luminous looks crafted for every skin tone." },
];

const reviews = [
  { name: "Sophia R.", rating: 5, text: "Absolutely obsessed with the YSL perfume I got from Lumiere. The packaging was stunning and it arrived so fast. Will definitely be ordering again!" },
  { name: "Amara K.", rating: 5, text: "The Kiko lip colour is everything. Rich pigment, lasts all day. Lumiere is my go-to for beauty now — the curation is just perfect." },
  { name: "Isabelle M.", rating: 5, text: "Sauvage is my husband's new signature scent. He gets compliments everywhere. Lumiere made gifting so easy and luxurious." },
  { name: "Priya T.", rating: 5, text: "I love how every product feels premium. The site is beautiful, checkout was smooth, and my order came beautifully wrapped." },
];

function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d) => {
    setDir(d);
    setCurrent((c) => (c + d + reviews.length) % reviews.length);
  };

  return (
    <div
      className="relative max-w-2xl mx-auto text-center px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: reviews[current].rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
            ))}
          </div>
          <p className="font-serif text-xl sm:text-2xl text-foreground leading-relaxed italic">
            "{reviews[current].text}"
          </p>
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            — {reviews[current].name}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-6 mt-10">
        <button onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors" aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-1 rounded-full transition-all ${i === current ? 'w-6 bg-foreground' : 'w-1.5 bg-border'}`} />
          ))}
        </div>
        <button onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors" aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function AboutPage() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((s, i) => s + i.quantity, 0)
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${heroImg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.span className="text-xs font-medium uppercase tracking-[0.3em] text-white/60 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Our Story
          </motion.span>
          <motion.h1 className="font-serif text-5xl sm:text-7xl font-semibold text-white tracking-tight leading-none" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Beauty Born<br />From Passion
          </motion.h1>
          <motion.div className="w-12 h-px bg-white/40 mt-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">About Lumiere</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mt-3 leading-snug">Curated for those who<br />love beauty</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Lumiere was founded on a single obsession — that beauty should feel effortless, luxurious, and entirely your own. We curate the finest makeup and fragrances from the world's most iconic houses, so every product you discover is worthy of your ritual.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">From bold lip colours to signature scents, every piece in our collection is chosen with intention. We believe beauty is not a standard — it's a story. And we're here to help you tell yours.</p>
            <Link to="/products" className="mt-8 inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
              Shop the Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div className="grid grid-cols-1 gap-4" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            {[{ label: 'Products', value: '200+' }, { label: 'Luxury Brands', value: '40+' }, { label: 'Happy Customers', value: '50K+' }].map((stat) => (
              <div key={stat.label} className="border-b border-border pb-4 flex justify-between items-end">
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                <span className="font-serif text-4xl font-semibold text-foreground">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">What we stand for</span>
            <h2 className="font-serif text-3xl font-semibold text-foreground mt-3">Our Values</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v, i) => (
              <motion.div key={v.title} className="p-8 border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">From the edit</span>
          <h2 className="font-serif text-3xl font-semibold text-foreground mt-2">Latest Stories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {editorials.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="overflow-hidden bg-[#f5f5f5] mb-4" style={{ aspectRatio: '3/4' }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">What our customers say</span>
            <h2 className="font-serif text-3xl font-semibold text-foreground mt-3">Reviews</h2>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">Ready to explore?</h2>
          <p className="mt-4 text-white/60 max-w-md text-sm">Browse our curated edit of luxury makeup and iconic fragrances.</p>
          <Link to="/products" className="mt-8 flex items-center gap-2 bg-white text-black px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}

export default AboutPage;
