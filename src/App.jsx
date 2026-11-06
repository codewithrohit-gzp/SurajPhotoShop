import React from "react";
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Heart,
  Star,
  Plus,
  Minus,
  Camera,
  Image as ImageIcon,
  Gift,
  Truck,
  ShieldCheck,
  Clock,
  Instagram,
  Facebook,
  ChevronRight,
  Check,
  Trash2,
  MessageCircle,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Wooden Frame",
    category: "Photo Frames",
    price: 499,
    oldPrice: 649,
    rating: 4.9,
    tag: "Bestseller",
    size: "8 × 10 inch",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85",
    description:
      "A timeless wood finish that makes your favourite memories feel at home.",
  },
  {
    id: 2,
    name: "Gallery Photo Prints",
    category: "Photo Prints",
    price: 199,
    oldPrice: 249,
    rating: 4.8,
    tag: "Popular",
    size: "Set of 5",
    image:
      "https://images.unsplash.com/photo-1495366811353-4f8d62b7f6b3?auto=format&fit=crop&w=900&q=85",
    description: "Rich colours and crisp detail on premium photo paper.",
  },
  {
    id: 3,
    name: "Minimal Black Frame",
    category: "Photo Frames",
    price: 699,
    oldPrice: 849,
    rating: 4.7,
    tag: "New",
    size: "12 × 16 inch",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
    description:
      "A clean, modern frame for portraits, art and statement walls.",
  },
  {
    id: 4,
    name: "Memory Scrapbook",
    category: "Albums",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    tag: "Gift pick",
    size: "40 pages",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
    description:
      "Keep your milestones together in a beautiful handcrafted album.",
  },
  {
    id: 5,
    name: "Personalised Photo Mug",
    category: "Personalised Gifts",
    price: 349,
    oldPrice: 449,
    rating: 4.6,
    tag: "Customise",
    size: "330 ml",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    description:
      "Your favourite photo, printed on a mug made for everyday smiles.",
  },
  {
    id: 6,
    name: "Canvas Wall Art",
    category: "Wall Art",
    price: 1299,
    oldPrice: 1599,
    rating: 4.8,
    tag: "Premium",
    size: "16 × 20 inch",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
    description:
      "Turn a favourite photograph into a statement piece for your wall.",
  },
  {
    id: 7,
    name: "Instant Mini Prints",
    category: "Photo Prints",
    price: 299,
    oldPrice: 399,
    rating: 4.7,
    tag: "Trending",
    size: "Set of 10",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    description: "Small-format prints for journals, desks and gifting.",
  },
  {
    id: 8,
    name: "Premium Wedding Album",
    category: "Albums",
    price: 2499,
    oldPrice: 2999,
    rating: 5.0,
    tag: "Premium",
    size: "30 sheets",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
    description:
      "A keepsake album to preserve the moments you never want to forget.",
  },
];

const categories = [
  { name: "All Products", icon: ImageIcon, count: "08 items" },
  { name: "Photo Frames", icon: ImageIcon, count: "02 styles" },
  { name: "Photo Prints", icon: Camera, count: "02 styles" },
  { name: "Albums", icon: ImageIcon, count: "02 styles" },
  { name: "Personalised Gifts", icon: Gift, count: "01 style" },
  { name: "Wall Art", icon: ImageIcon, count: "01 style" },
];

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function App() {
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [liked, setLiked] = useState([]);
  const [notice, setNotice] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All Products" || p.category === category) &&
        `${p.name} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
    if (sort === "price-low")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...current, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to bag`);
    setTimeout(() => setNotice(""), 2200);
  }
  function changeQty(id, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }
  function toggleLike(id) {
    setLiked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }
  function jumpToShop() {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }
  function placeOrder(e) {
    e.preventDefault();
    const lines = cart
      .map(
        (item) =>
          `${item.name} x ${item.qty} — ${money(item.price * item.qty)}`,
      )
      .join("%0A");
    const message = `Hello, I want to place an order:%0A${lines}%0A%0ATotal: ${money(total)}%0AName: ${encodeURIComponent(customer.name)}%0APhone: ${encodeURIComponent(customer.phone)}%0AAddress: ${encodeURIComponent(customer.address)}`;
    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>MADE FOR YOUR MEMORIES</span>
        <span className="announcement-dot">✦</span>
        <span>Premium prints • Thoughtful gifts • Local care</span>
      </div>
      <header className="header">
        <button
          className="icon-btn mobile-toggle"
          aria-label="Open menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <a className="brand" href="#home" aria-label="Frame and Focus home">
          <span className="brand-mark">
            <Camera size={23} />
          </span>
          <span className="brand-words">
            Suraj<span>&</span>
            <small>PHOTO STUDIO & GIFTS</small>
          </span>
        </a>
        <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>
            Home
          </a>
          <a href="#shop" onClick={() => setMobileMenu(false)}>
            Shop
          </a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>
            Categories
          </a>
          <a href="#about" onClick={() => setMobileMenu(false)}>
            Our Story
          </a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>
            Contact
          </a>
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <Search size={18} />
            <input
              aria-label="Search products"
              placeholder="Search memories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </label>
          <button
            className="bag-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            <span>Bag</span>
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line"></span> THE ART OF KEEPING MOMENTS
            </div>
            <h1>
              Some moments
              <br />
              deserve to be <em>framed.</em>
            </h1>
            <p>
              Turn your favourite photographs into beautiful prints, thoughtful
              gifts and memories you can hold on to.
            </p>
            <div className="hero-actions">
              <button className="btn btn-dark" onClick={jumpToShop}>
                Explore collection <ArrowRight size={17} />
              </button>
              <a href="#categories" className="text-link">
                Find your perfect print <ChevronRight size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>☺</span>
                <span>✿</span>
                <span>♡</span>
              </div>
              <div>
                <strong>Loved by memory keepers</strong>
                <small>Made with care, one print at a time</small>
              </div>
              <div className="proof-stars">
                ★★★★★ <small>4.9/5</small>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-main">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1100&q=90"
                alt="Framed art displayed on a warm, styled wall"
              />
            </div>
            <div className="hero-image-small">
              <img
                src="https://images.unsplash.com/photo-1495366811353-4f8d62b7f6b3?auto=format&fit=crop&w=500&q=85"
                alt="Printed photographs arranged as keepsakes"
              />
            </div>
            <div className="floating-note">
              <span className="note-icon">
                <Heart size={17} />
              </span>
              <span>
                <strong>A little piece of forever</strong>
                <small>Your memories, beautifully made.</small>
              </span>
            </div>
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </section>

        <section className="benefits" aria-label="Shop benefits">
          <div>
            <span className="benefit-icon">
              <Truck />
            </span>
            <span>
              <strong>Careful delivery</strong>
              <small>Packed with love</small>
            </span>
          </div>
          <div>
            <span className="benefit-icon">
              <ShieldCheck />
            </span>
            <span>
              <strong>Quality you can feel</strong>
              <small>Premium print finish</small>
            </span>
          </div>
          <div>
            <span className="benefit-icon">
              <Clock />
            </span>
            <span>
              <strong>Made for you</strong>
              <small>Personalised with care</small>
            </span>
          </div>
          <div>
            <span className="benefit-icon">
              <Heart />
            </span>
            <span>
              <strong>Gift-ready moments</strong>
              <small>Perfect for every occasion</small>
            </span>
          </div>
        </section>

        <section className="category-section section-wrap" id="categories">
          <div className="section-heading">
            <div>
              <div className="eyebrow">A LITTLE SOMETHING FOR EVERY MEMORY</div>
              <h2>
                Shop by <em>category</em>
              </h2>
            </div>
            <button className="text-link" onClick={jumpToShop}>
              View all products <ArrowRight size={16} />
            </button>
          </div>
          <div className="category-grid">
            {categories.slice(1).map((item, i) => {
              const pics = [
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1495366811353-4f8d62b7f6b3?auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
                "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80",
              ];
              return (
                <button
                  className="category-card"
                  key={item.name}
                  onClick={() => {
                    setCategory(item.name);
                    jumpToShop();
                  }}
                >
                  <img src={pics[i]} alt={item.name} loading="lazy" />
                  <span className="category-shade"></span>
                  <span className="category-card-copy">
                    <small>{item.count}</small>
                    <strong>{item.name}</strong>
                    <span className="category-arrow">
                      <ArrowRight size={17} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-wrap">
            <div className="section-heading shop-heading">
              <div>
                <div className="eyebrow">THE LITTLE THINGS THAT MEAN A LOT</div>
                <h2>
                  Made to make you <em>smile.</em>
                </h2>
                <p className="section-subtitle">
                  Find your next favourite keepsake.
                </p>
              </div>
              <div className="sort-wrap">
                <label htmlFor="sort">Sort by</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>
            </div>
            <div className="shop-layout">
              <aside className="filters">
                <h3>Categories</h3>
                {categories.map((item) => (
                  <button
                    key={item.name}
                    className={`filter-link ${category === item.name ? "active" : ""}`}
                    onClick={() => setCategory(item.name)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={15} />
                  </button>
                ))}
                <div className="filter-note">
                  <Heart size={18} />
                  <strong>Made with meaning</strong>
                  <p>
                    Every print is prepared with care, so your memories look
                    their best.
                  </p>
                </div>
              </aside>
              <div className="products-area">
                <div className="results-row">
                  <span>
                    {filtered.length} products{" "}
                    <span className="muted">in {category}</span>
                  </span>
                  <button
                    className="clear-filter"
                    onClick={() => {
                      setCategory("All Products");
                      setSearch("");
                      setSort("featured");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
                {filtered.length ? (
                  <div className="product-grid">
                    {filtered.map((product) => (
                      <article className="product-card" key={product.id}>
                        <div className="product-image">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                          />
                          <span className="product-tag">{product.tag}</span>
                          <button
                            className={`heart-btn ${liked.includes(product.id) ? "is-liked" : ""}`}
                            onClick={() => toggleLike(product.id)}
                            aria-label={
                              liked.includes(product.id)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <Heart
                              size={17}
                              fill={
                                liked.includes(product.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            className="quick-add"
                            onClick={() => addToCart(product)}
                          >
                            <Plus size={16} /> Add to bag
                          </button>
                        </div>
                        <div className="product-info">
                          <div className="product-category">
                            {product.category}{" "}
                            <span>
                              <Star size={12} fill="currentColor" />{" "}
                              {product.rating}
                            </span>
                          </div>
                          <h3>{product.name}</h3>
                          <div className="product-size">{product.size}</div>
                          <div className="product-price">
                            <strong>{money(product.price)}</strong>
                            <del>{money(product.oldPrice)}</del>
                            <span>
                              {Math.round(
                                (1 - product.price / product.oldPrice) * 100,
                              )}
                              % off
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-results">
                    <Search size={28} />
                    <h3>No products found</h3>
                    <p>Try a different search or choose another category.</p>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        setSearch("");
                        setCategory("All Products");
                      }}
                    >
                      Show all products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="story-section section-wrap" id="about">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1000&q=85"
              alt="Friends making happy memories together"
              loading="lazy"
            />
            <span className="story-stamp">
              KEEP
              <br />
              THE
              <br />
              GOOD
              <br />
              TIMES
            </span>
          </div>
          <div className="story-copy">
            <div className="eyebrow">A SMALL SHOP WITH A BIG HEART</div>
            <h2>
              Because the best things in life are <em>memories.</em>
            </h2>
            <p>
              We believe your photos belong somewhere special — on your walls,
              in your hands, and in the gifts you give. We bring your moments to
              life with thoughtful products and personal attention.
            </p>
            <div className="story-points">
              <span>
                <Check size={17} /> Carefully selected materials
              </span>
              <span>
                <Check size={17} /> Personalised for your story
              </span>
              <span>
                <Check size={17} /> Made to be kept for years
              </span>
            </div>
            <button className="btn btn-outline" onClick={jumpToShop}>
              Find your keepsake <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <p>Some things are too precious to leave in your camera roll.</p>
          <span className="quote-sub">PRINT THE MOMENT. KEEP THE FEELING.</span>
        </section>

        <section className="newsletter section-wrap" id="contact">
          <div className="newsletter-icon">
            <MessageCircle size={25} />
          </div>
          <div className="newsletter-copy">
            <h2>
              Let's make something <em>personal.</em>
            </h2>
            <p>Have a custom frame or bulk print request? We'd love to help.</p>
          </div>
          <a
            className="btn btn-dark"
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
          >
            Talk to our team <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-mark">
                <Camera size={23} />
              </span>
              <span className="brand-words">
                frame<span>&</span>focus<small>PHOTO STUDIO & GIFTS</small>
              </span>
            </a>
            <p>
              Turning little moments into keepsakes you'll treasure for a long,
              long time.
            </p>
            <div className="socials">
              <a href="#contact" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="#contact" aria-label="Facebook">
                <Facebook size={17} />
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#shop">All products</a>
            <a href="#categories">Shop categories</a>
            <a href="#about">Our story</a>
            <a href="#contact">Custom orders</a>
          </div>
          <div>
            <h4>Popular categories</h4>
            {categories.slice(1, 5).map((c) => (
              <a href="#shop" key={c.name} onClick={() => setCategory(c.name)}>
                {c.name}
              </a>
            ))}
          </div>
          <div>
            <h4>Visit or connect</h4>
            <p className="footer-contact">
              Your local photo studio
              <br />
              Add your shop address here
            </p>
            <p className="footer-contact">
              Phone: +91 XXXXX XXXXX
              <br />
              Email: hello@yourshop.com
            </p>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              WhatsApp us <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Frame & Focus. All rights reserved.
          </span>
          <span>
            Made for memories <Heart size={13} fill="currentColor" />
          </span>
        </div>
      </footer>

      {notice && (
        <div className="toast">
          <Check size={17} />
          {notice}
        </div>
      )}
      {cartOpen && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="cart-drawer">
            <div className="drawer-header">
              <div>
                <span className="eyebrow">YOUR LITTLE TREASURES</span>
                <h2>
                  Shopping bag <span>({cartCount})</span>
                </h2>
              </div>
              <button
                className="icon-btn"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>
            {cart.length ? (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <small>{item.size}</small>
                        <strong>{money(item.price)}</strong>
                        <div className="qty-control">
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => changeQty(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() =>
                          setCart((c) => c.filter((x) => x.id !== item.id))
                        }
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <strong>{money(total)}</strong>
                  </div>
                  <p>
                    Delivery charges, if any, can be confirmed when placing your
                    order.
                  </p>
                  <button
                    className="btn btn-dark checkout-btn"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    Continue to order <ArrowRight size={17} />
                  </button>
                  <button
                    className="continue-shopping"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>
                  <ShoppingBag size={30} />
                </span>
                <h3>Your bag is waiting</h3>
                <p>Add a little something that makes you smile.</p>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setCartOpen(false);
                    jumpToShop();
                  }}
                >
                  Explore products
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
      {checkoutOpen && (
        <div
          className="overlay checkout-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCheckoutOpen(false);
          }}
        >
          <div className="checkout-modal">
            <div className="drawer-header">
              <div>
                <span className="eyebrow">ONE LAST THING</span>
                <h2>Order details</h2>
              </div>
              <button
                className="icon-btn"
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close order form"
              >
                <X />
              </button>
            </div>
            <p className="checkout-help">
              Fill in your details and we'll open WhatsApp with your order
              summary, ready to send.
            </p>
            <form onSubmit={placeOrder} className="checkout-form">
              <label>
                Your name
                <input
                  required
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="Full name"
                />
              </label>
              <label>
                Mobile number
                <input
                  required
                  type="tel"
                  pattern="[0-9+\-\s]{10,15}"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                />
              </label>
              <label>
                Delivery address
                <textarea
                  required
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  placeholder="House number, street, city"
                  rows="3"
                />
              </label>
              <div className="subtotal">
                <span>Order total</span>
                <strong>{money(total)}</strong>
              </div>
              <button type="submit" className="btn btn-dark checkout-btn">
                Send order on WhatsApp <MessageCircle size={17} />
              </button>
              <small className="checkout-disclaimer">
                This demo sends the order summary to WhatsApp. Online payment is
                not configured.
              </small>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
