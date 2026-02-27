import { useEffect, useState, useRef, useMemo } from 'react';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import assets
import vanille from './assets/eisfavorite-agnello-eis-vanille.png';
import erdbeer from './assets/eisfavorite-agnello-eis-erdbeer.png';
import pistazie from './assets/eisfavorite-agnello-eis-pistazie.png';
import delfino from './assets/eisfavorite-agnello-eis-delfino.png';
import heroV8 from './assets/eisfavorite-agnello-eiswagen-schloss-v8.jpg';
import heroOld from './assets/eisfavorite-agnello-catering-schiebeschloss.png';
import spaghettiVanille from './assets/eisfavorite-agnello-spaghetti-eis-vanille.png';
import spaghettiSchoko from './assets/eisfavorite-agnello-spaghetti-eis-schoko.png';
import schokolade from './assets/eisfavorite-agnello-eis-schokolade.jpg';

const TiltCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'none';
  };

  return (
    <div className="tilt-wrapper">
      <div
        ref={cardRef}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </div>
    </div>
  );
};

const MagneticWrapper = ({ children }: { children: React.ReactElement }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const child = wrapperRef.current.firstElementChild as HTMLElement;
    if (!child) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    child.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (!wrapperRef.current) return;
    const child = wrapperRef.current.firstElementChild as HTMLElement;
    if (!child) return;
    child.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div ref={wrapperRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="magnetic-wrapper" style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

const REVIEWS = [
  {
    name: "Dezpo",
    text: "Das Beste Eis in ganz Kuppenheim und Umgebung! Wirklich mit Liebe gemacht. Ist absolut zu empfehlen!!",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=Ci9DQUlRQUNvZENodHljRjlvT2tKdlpISkRiVVJNVmxsblgxbFVhakJ0UmpJNVIzYxAB"
  },
  {
    name: "K.St.G.",
    text: "Das Eismobil kam zum Schuljahresabschluss an unsere Grundschule - ein voller Erfolg!!! Sehr netter Kontakt, ganz leckeres Eis, tolle und große Auswahl. Auf jeden Fall sehr zu empfehlen und gerne wieder! Herzlichen Dank Herr Agnello!!!!",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=ChZDSUhNMG9nS0VJQ0FnSUNhODhpRVZBEAE"
  },
  {
    name: "Fabian Blatzheim",
    text: "Wir haben das Eismobil für alle Mitarbeiter in der Mittagszeit bestellt, es war ein voller Erfolg. Sehr gute und transparente Abwicklung, sehr netter Kontakt, wirklich weiterzuempfehlen. 👍",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=ChdDSUhNMG9nS0VJQ0FnSURKd3Zydm5nRRAB"
  },
  {
    name: "Dr. Katrin Wenninger",
    text: "Ein Anruf genügt und es wird uns ein mega leckeres Eis mit dem Eiswagen bis auf unser Grundstück am Goldkanal gebracht. Wir sind begeistert und das Jahr für Jahr aufs Neue. Herzlichen Dank!",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=ChdDSUhNMG9nS0VJQ0FnSUQ4bDhENG9BRRAB"
  },
  {
    name: "Lars Hartmann",
    text: "Wir hatten das Eismobil zu unserem Firmenjubiläum da und waren vollauf begeistert!",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=ChZDSUhNMG9nS0VJQ0FnSUQydzdUclNnEAE"
  },
  {
    name: "Lucas V.",
    text: "Super leckeres Eis!! 🍦🍦 Sehr höfliche Bedienung, hier geht man wirklich gerne Eis essen :)",
    link: "https://www.google.com/search?q=Eis+Agnello+Kuppenheim+Schloss+Favorite&arid=ChdDSUhNMG9nS0VJQ0FnSUQ4alpyN3RBRRAB"
  }
];

const FAQS = [
  {
    q: "Was bietet Eisfavorite Eiscatering in der Region Rastatt & Kuppenheim an?",
    a: "Wir bieten professionelles Eiscatering mit unserem mobilen Eiswagen in Rastatt, Kuppenheim und Baden-Baden an. Wir servieren hausgemachtes italienisches Gelato, das wir mit viel Liebe und nach traditionellen Familienrezepten täglich frisch herstellen."
  },
  {
    q: "Warum ist handgemachtes Gelato besser als industrielles Eis?",
    a: "Unser handgemachtes Gelato hat einen geringeren Luftanteil und wird mit echter Milch statt Milchpulver hergestellt. Das sorgt für eine cremigere Textur und einen intensiveren, natürlichen Geschmack ohne künstliche Aromen oder Farbstoffe."
  },
  {
    q: "Wie wird das Eisfavorite Eis hergestellt?",
    a: "Unser Eis wird täglich frisch in unserer Manufaktur nach original italienischen Rezepten produziert. Wir verwenden ausschließlich natürliche Zutaten und verzichten konsequent auf künstliche Zusätze, um höchste Qualität und Frische zu garantieren."
  },
  {
    q: "Welche Eissorten können für Events gemietet werden?",
    a: "Wir haben über 25 handgemachte Sorten im Repertoire. Bei Ihrem Event können wir bis zu 16 Sorten parallel im Wagen anbieten – von klassischen Milcheissorten bis zu veganen, laktosefreien Fruchtsorbets."
  },
  {
    q: "Benötigt der Eiswagen vor Ort Strom oder Wasser?",
    a: "Nein, unser Eiswagen ist komplett autark. Dank unseres innovativen Eisspeicher-Prinzips benötigen wir weder Strom noch Wasser am Stellplatz. Wir öffnen einfach die Tür und sind innerhalb einer Minute einsatzbereit."
  },
  {
    q: "Wie viele Personen können bei einem Event bedient werden?",
    a: "Wir können Events jeder Größe betreuen – von kleinen Gartenfesten bis zu Großveranstaltungen mit bis zu 2.000 Portionen. Unsere Kapazität und Effizienz erlauben einen sehr schnellen Service für alle Gäste."
  },
  {
    q: "In welchem Umkreis kann man den Eiswagen mieten?",
    a: "Wir sind primär in Kuppenheim, Rastatt, Baden-Baden und Karlsruhe unterwegs. Auf Anfrage fahren wir für größere Firmen-Events oder Hochzeiten auch gerne weitere Strecken über einen 100 km Radius hinaus."
  },
  {
    q: "Was kostet das Mieten des Eisfavorite Eiswagens?",
    a: "Ein Einsatz ist ab ca. 50 Personen oder einem Mindestumsatz von 150 € sinnvoll. Der Preis pro Kugel liegt bei ca. 1,80 € zzgl. einer individuellen Anfahrtspauschale je nach Entfernung."
  },
  {
    q: "Kann man den Eiswagen für eine Hochzeit buchen?",
    a: "Absolut! Unser mobiler Eiswagen ist ein beliebtes Highlight für Hochzeiten in der Region. Wir bieten spezielle Hochzeits-Pakete an, die perfekt als Dessert-Überraschung oder Highlight nach der Trauung passen."
  },
  {
    q: "Bietet Eisfavorite Catering für Firmen-Events an?",
    a: "Ja, wir sind spezialisiert auf Firmen-Events, Jubiläen und Sommerfeste. Unser schneller Service (1-2 Kunden pro Minute) garantiert, dass auch große Belegschaften zügig mit frischem Premium-Eis versorgt werden."
  },
  {
    q: "Gibt es auch laktosefreie oder vegane Eissorten?",
    a: "Ja, wir haben immer eine Auswahl an veganen Fruchtsorbets (z.B. Zitrone, Erdbeere, Mango) dabei. Diese sind von Natur aus laktosefrei, fettarm und bestehen aus einem sehr hohen Fruchtanteil."
  },
  {
    q: "Wie kurzfristig kann ich den Eiswagen buchen?",
    a: "In der Hauptsaison (Mai-September) empfehlen wir eine Buchung 2-3 Monate im Voraus. Kurzfristige Anfragen sind je nach Kapazität aber immer möglich – nutzen Sie einfach unser Kontaktformular!"
  },
  {
    q: "Kann der Eiswagen Musik spielen?",
    a: "Ja, auf Wunsch können wir über den Eiswagen klassische italienische Hintergrundmusik abspielen. Das sorgt sofort für Urlaubsstimmung und ein authentisches Gelateria-Feeling direkt auf Ihrem Event."
  },
  {
    q: "Wie erfolgt die Abrechnung nach dem Event?",
    a: "Die Abrechnung erfolgt flexibel: Entweder direkt vor Ort in bar oder ganz bequem per Rechnung nach der Veranstaltung, basierend auf den tatsächlich ausgegebenen Eisportionen."
  }
];

const CITIES = [
  { name: "Kuppenheim", slug: "eiswagen-kuppenheim" },
  { name: "Rastatt", slug: "eiswagen-rastatt" },
  { name: "Baden-Baden", slug: "eiswagen-baden-baden" },
  { name: "Gaggenau", slug: "eiswagen-gaggenau" },
  { name: "Malsch", slug: "eiswagen-malsch" },
  { name: "Durmersheim", slug: "eiswagen-durmersheim" },
  { name: "Muggensturm", slug: "eiswagen-muggensturm" },
  { name: "Sinzheim", slug: "eiswagen-sinzheim" },
  { name: "Iffezheim", slug: "eiswagen-iffezheim" },
  { name: "Gernsbach", slug: "eiswagen-gernsbach" },
  { name: "Karlsruhe", slug: "eiswagen-karlsruhe" },
  { name: "Ettlingen", slug: "eiswagen-ettlingen" },
  { name: "Steinmauern", slug: "eiswagen-steinmauern" },
  { name: "Ötigheim", slug: "eiswagen-oetigheim" },
  { name: "Bietigheim", slug: "eiswagen-bietigheim" }
];

// Image Search SEO renamed constants removed as they were integrated above.

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: React.ReactNode, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const IceCreamCalculator = ({ onBookingRequest }: { onBookingRequest: () => void }) => {
  const [guests, setGuests] = useState(100);

  // Logic: 2 scoops per person average, 1.80€ per scoop
  const scoopsCount = guests * 2;
  const duration = guests > 300 ? 3 : guests > 150 ? 2 : 1;
  const estimatedPrice = (scoopsCount * 1.8).toFixed(2);

  return (
    <div className="calculator-card animate-on-scroll">
      <div className="calculator-header">
        <h3 className="text-gold">Eis-Planer</h3>
        <p>Wie viel Eis benötigen Sie für Ihr Event?</p>
      </div>

      <div className="calculator-body">
        <div className="calc-input-group">
          <label htmlFor="guest-range">Gästeanzahl: <strong>{guests}</strong></label>
          <input
            id="guest-range"
            type="range"
            min="20"
            max="1000"
            step="10"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="calc-range"
          />
        </div>

        <div className="calc-results">
          <div className="calc-result-item">
            <span className="calc-label">Portionen (ca.)</span>
            <span className="calc-value">{scoopsCount}</span>
          </div>
          <div className="calc-result-item">
            <span className="calc-label">Dauer</span>
            <span className="calc-value">~ {duration} Std.</span>
          </div>
          <div className="calc-result-item featured">
            <span className="calc-label">Preis ab</span>
            <span className="calc-value">{estimatedPrice} €*</span>
            <span className="text-secondary" style={{ fontSize: '0.7rem' }}>zzgl. Anfahrt</span>
          </div>
        </div>

        <p className="calc-disclaimer">*Schätzung basierend auf 2 Kugeln à 1,80€ pro Gast. Genaue Abrechnung nach Verbrauch.</p>

        <button onClick={onBookingRequest} className="btn btn-primary w-full mt-4">
          Dieses Paket anfragen →
        </button>
      </div>
    </div>
  );
};

const DynamicSchema = ({ city }: { city: any }) => {
  const schema = useMemo(() => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": city ? `Eisfavorite Eiswagen ${city.name}` : "Eisfavorite Premium Eiscatering",
      "description": city
        ? `Premium Eiswagen mieten in ${city.name}. Hausgemachtes italienisches Gelato für Hochzeiten und Firmenevents in ${city.name} & Umgebung.`
        : "Premium Eiscatering und mobiler Eiswagen für Hochzeiten und Firmenevents in der Region Rastatt & Kuppenheim.",
      "url": city ? `https://eisfavorite.de/${city.slug}` : "https://eisfavorite.de",
      "telephone": "+4917656813172",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Favoritstraße 11",
        "addressLocality": "Kuppenheim",
        "postalCode": "76456",
        "addressCountry": "DE"
      },
      "areaServed": city ? { "@type": "City", "name": city.name } : ["Kuppenheim", "Rastatt", "Baden-Baden"],
      "priceRange": "€€"
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q.replace("[Stadt]", city?.name || "deiner Region"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a.replace("[Stadt]", city?.name || "deiner Region")
        }
      }))
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Eisfavorite",
      "legalName": "Eisfavorite - Agnello Premium Catering",
      "url": "https://eisfavorite.de",
      "logo": "https://eisfavorite.de/og-image.png",
      "sameAs": [
        "https://www.instagram.com/eisfavorite/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+4917656813172",
        "contactType": "customer service",
        "areaServed": "DE",
        "availableLanguage": ["German", "Italian"]
      }
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Premium Eiscatering Paket",
      "description": "Mobiles Eiscatering mit original italienischem Gelato. Komplett autarker Eiswagen für Events ab 50 Personen.",
      "brand": {
        "@type": "Brand",
        "name": "Eisfavorite"
      },
      "offers": {
        "@type": "Offer",
        "price": "150.00",
        "priceCurrency": "EUR",
        "description": "Mindestumsatz für Event-Buchung",
        "availability": "https://schema.org/InStock"
      }
    };

    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero-title", ".section-title", ".faq-question"]
      }
    };

    return [baseSchema, faqSchema, organizationSchema, productSchema, speakableSchema];
  }, [city]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

function MainContent() {
  const { citySlug } = useParams();
  const location = useLocation();

  const city = useMemo(() => {
    if (!citySlug) return null;
    return CITIES.find(c => c.slug === citySlug);
  }, [citySlug]);

  useEffect(() => {
    // Update Title and Meta Tags for SEO & Social Media
    const title = city
      ? `Eiswagen mieten in ${city.name} - Eisfavorite Premium Eiscatering`
      : "Eisfavorite - Premium Eiscatering & Eiswagen in Kuppenheim & Rastatt";

    const description = city
      ? `Premium Eiswagen mieten in ${city.name}. Hausgemachtes italienisches Gelato für Hochzeiten, Firmen-Events und Feste in ${city.name} & Umgebung.`
      : "Mieten Sie unseren mobilen Eiswagen für Hochzeiten, Firmen-Events und Feste. Hausgemachtes italienisches Gelato in Kuppenheim, Rastatt und Umgebung.";

    document.title = title;

    // Helper to update meta tags
    const updateMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    updateMeta('meta[name="description"]', 'content', description);

    // Open Graph Tags
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:url"]', 'content', `https://eisfavorite.de${location.pathname}`);
    updateMeta('meta[property="og:image"]', 'content', 'https://eisfavorite.de/og-image.png');
  }, [city, location.pathname]);

  useEffect(() => {
    // Analytics or scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [currentReview, setCurrentReview] = useState(0);
  const [useHeroV8, setUseHeroV8] = useState(true);
  const [isFlavorsExpanded, setIsFlavorsExpanded] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    street: '',
    houseNumber: '',
    zip: '',
    city: '',
    guests: 'unter 50',
    eventType: 'Hochzeit',
    message: ''
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
  }, []);

  useEffect(() => {
    // Apply V4 theme classes
    document.body.classList.add('theme-v4');
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    console.log("Next step clicked. Current step:", bookingStep);
    console.log("Current formData:", formData);

    if (bookingStep === 1) {
      if (!formData.name || !formData.email) {
        console.log("Step 1 validation failed");
        setFormError('Bitte füllen Sie alle Pflichtfelder (*) aus.');
        return;
      }
    } else if (bookingStep === 2) {
      if (!formData.date || !formData.time || !formData.street || !formData.houseNumber || !formData.zip || !formData.city) {
        console.log("Step 2 validation failed");
        setFormError('Bitte füllen Sie alle Pflichtfelder (*) aus.');
        return;
      }
    }
    console.log("Validation passed. Moving to step:", bookingStep + 1);
    setFormError('');
    setBookingStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormError('');
    setBookingStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // In a real app, you would send this to a backend or an email service
  };

  const nextReview = () => {
    setCurrentReview((prev) => {
      const maxIndex = Math.max(0, REVIEWS.length - cardsPerView);
      return prev >= maxIndex ? 0 : prev + 1; // Loop back to start or go next
    });
  };

  const prevReview = () => {
    setCurrentReview((prev) => {
      const maxIndex = Math.max(0, REVIEWS.length - cardsPerView);
      return prev <= 0 ? maxIndex : prev - 1; // Loop to end or go prev
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Scroll parallax logic
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app-container theme-v4 disco-layout">
      <DynamicSchema city={city} />
      {/* Ambient Background */}
      <div className="ambient-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo-container">
            <div className="logo text-gold">EISFAVORITE</div>
            <div className="logo-subtitle">agnello</div>
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#flavors" onClick={() => setIsMobileMenuOpen(false)}>Sorten</a>
            <a href="#events" onClick={() => setIsMobileMenuOpen(false)}>Catering</a>
            <a href="#calculator" onClick={() => setIsMobileMenuOpen(false)}>Planer</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)}>Ablauf</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Bewertungen</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <MagneticWrapper>
              <button
                onClick={() => { setIsBookingOpen(true); setBookingStep(1); setIsSubmitted(false); setIsMobileMenuOpen(false); }}
                className="btn btn-primary nav-btn"
              >
                Anfragen
              </button>
            </MagneticWrapper>
          </div>
          <button
            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>



      {/* Hero Image Toggle - Top Right */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10005 }}>
        <button
          onClick={() => setUseHeroV8(!useHeroV8)}
          className="btn"
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          {useHeroV8 ? '🖼️ Original Intro' : '🖼️ Neues Intro'}
        </button>
      </div>

      <header
        className="hero"
        style={{
          backgroundImage: useHeroV8
            ? `url(${heroV8})`
            : `url(${heroOld})`,
          backgroundPosition: useHeroV8 ? 'center bottom' : 'center top'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="hero-title animate-on-scroll">
            {city ? `Premium Eiswagen mieten in ${city.name}` : <>Premium Eiscatering & <span className="text-gold">mobiler Eiswagen</span></>}
          </h1>
          <p className="hero-subtitle mb-4 animate-on-scroll">
            {city
              ? `Premium Eiscatering & mobiler Eiswagen in ${city.name} mieten. Das perfekte Highlight für Ihre Hochzeit, Ihr Firmen-Event oder Ihre private Feier in ${city.name} & Umgebung.`
              : "Miete unseren Eiswagen für Hochzeiten, Firmen-Events, Schulen, KiTas, Vereine und andere Feste in Kuppenheim, Rastatt & Umgebung."
            }
          </p>
        </div>
      </header>




      {/* Flavors Section */}
      <section id="flavors" className="section bg-primary text-center animate-on-scroll">
        <div className="container">
          <div className="mb-5">
            <h3 className="section-title mb-2" style={{ fontSize: '1.8rem' }}>Die Spaghetti <span className="text-gold">Spezialitäten</span></h3>
            <div className="divider mb-4" style={{ width: '40px' }}></div>

            <div className="specialties-container">
              <TiltCard className="specialty-card">
                <div className="specialty-badge">Premium</div>
                <div className="flavor-image">
                  <img src={spaghettiVanille} alt="Spaghetti Eis Vanille mit Erdbeersauce und Kokosraspeln" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)', objectPosition: 'center 40%' }} />
                </div>
                <h3 className="mb-2">Spaghetti Eis Vanille</h3>
                <p className="text-secondary">Der Klassiker mit Erdbeersauce &amp; Kokosraspeln</p>
              </TiltCard>
              <TiltCard className="specialty-card">
                <div className="specialty-badge">Premium</div>
                <div className="flavor-image">
                  <img src={spaghettiSchoko} alt="Spaghetti Eis Schoko mit feiner Schokoladensauce" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)', objectPosition: 'center 40%' }} />
                </div>
                <h3 className="mb-2">Spaghetti Eis Schoko</h3>
                <p className="text-secondary">Für Schoko-Liebhaber mit feiner Sauce</p>
              </TiltCard>
            </div>
          </div>

          <h3 className="section-title mb-2" style={{ fontSize: '1.8rem' }}>Die <span className="text-gold">Klassiker</span></h3>
          <div className="divider mb-4" style={{ width: '40px' }}></div>

          <div className="grid-container">
            <TiltCard className="grid-item">
              <div className="flavor-image" style={{ backgroundImage: `url(${schokolade})`, backgroundSize: '190%', backgroundPosition: 'center 48%', backgroundRepeat: 'no-repeat' }} aria-label="Dunkle Schokolade Eis-Kugel"></div>
              <h3 className="mb-1">Dunkle Schokolade</h3>
              <p className="text-secondary small">Intensiver Kakao, zartschmelzend &amp; herb</p>
            </TiltCard>
            <TiltCard className="grid-item">
              <div className="flavor-image" style={{ backgroundImage: `url(${vanille})`, backgroundSize: '190%', backgroundPosition: 'center 48%', backgroundRepeat: 'no-repeat' }} aria-label="Bourbon Vanille Eis-Kugel"></div>
              <h3 className="mb-1">Bourbon Vanille</h3>
              <p className="text-secondary small">Edle Madagaskar-Vanille, cremig &amp; süß</p>
            </TiltCard>
            <TiltCard className="grid-item">
              <div className="flavor-image" style={{ backgroundImage: `url(${pistazie})`, backgroundSize: '190%', backgroundPosition: 'center 48%', backgroundRepeat: 'no-repeat' }} aria-label="Pistazie Eis-Kugel"></div>
              <h3 className="mb-1">Pistazie</h3>
              <p className="text-secondary small">Geröstete Pistazien aus Bronte</p>
            </TiltCard>
            <TiltCard className="grid-item">
              <div className="flavor-image" style={{ backgroundImage: `url(${erdbeer})`, backgroundSize: '190%', backgroundPosition: 'center 48%', backgroundRepeat: 'no-repeat' }} aria-label="Garten-Erdbeere Frucht-Sorbet"></div>
              <h3 className="mb-1">Garten-Erdbeere</h3>
              <p className="text-secondary small">Ein fruchtiges, veganes Sorbet-Erlebnis</p>
            </TiltCard>
            <TiltCard className="grid-item">
              <div className="flavor-image" style={{ backgroundImage: `url(${delfino})`, backgroundSize: '190%', backgroundPosition: 'center 48%', backgroundRepeat: 'no-repeat' }} aria-label="Delfino Eis - blaues Eis für Kinder"></div>
              <h3 className="mb-1">Delfino</h3>
              <p className="text-secondary small">Kinder lieben es, weil es die Zunge blau färbt</p>
            </TiltCard>
          </div>

          <div className="text-center mt-5">
            <button
              className={`btn btn-outline flavors-toggle ${isFlavorsExpanded ? 'expanded' : ''}`}
              onClick={() => setIsFlavorsExpanded(!isFlavorsExpanded)}
            >
              {isFlavorsExpanded ? 'Weniger anzeigen' : 'Alle Sorten entdecken'}
              <span className="chevron"></span>
            </button>
          </div>

          <div className={`extended-flavors-wrapper ${isFlavorsExpanded ? 'open' : ''}`}>
            <div className="extended-flavors-content">
              <div className="flavor-category">
                <h3 className="category-title text-gold">Milcheis Klassiker &amp; Specials</h3>
                <ul className="flavor-list">
                  <li>🥛 Milcheis Sorten</li>
                  <li>🍫 Schokolade</li>
                  <li>🍦 Vanille</li>
                  <li>🌰 Pistazie</li>
                  <li>🍪 Stracciatella</li>
                  <li>🌰 Haselnuss</li>
                  <li>🍭 Bubble Gum</li>
                  <li>🥥 Kokos</li>
                  <li>☕ Espresso</li>
                  <li>🍘 Cookie</li>
                  <li>🧀 Cheesecake</li>
                  <li>🥥 Joghurt</li>
                  <li>🍬 Trüffel</li>
                  <li>🍫 Weiße Schokolade</li>
                  <li>🍇 Malaga</li>
                  <li>🐬 Delfino</li>
                  <li>🍒 Joghurt-Kirsch</li>
                  <li>🌿 Waldmeister</li>
                </ul>
              </div>
              <div className="flavor-category">
                <h3 className="category-title text-gold">Fruchteis <span className="small-tag">(Vegan &amp; Laktosefrei)</span></h3>
                <ul className="flavor-list">
                  <li>🍓 Erdbeere</li>
                  <li>🍒 Amarena</li>
                  <li>🍌 Banane</li>
                  <li>🥭 Mango</li>
                  <li>🍋 Zitrone</li>
                  <li>🍏 Grüner Apfel</li>
                  <li>🍇 Waldfrucht</li>
                  <li>🍈 Melone</li>
                  <li>🍒 Himbeere</li>
                  <li>🍑 Aprikose</li>
                  <li>🍍 Ananas</li>
                  <li>🍇 Cassis</li>
                  <li>🍹 Exotic Cocktail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlight Section – redesigned */}
      <section id="events" className="section event-highlight-section text-center animate-on-scroll">
        <div className="event-highlight-bg-shape"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="event-eyebrow">Maßgeschneiderter Eisgenuss für jeden Anlass</p>
          <h2 className="section-title mb-2">Ihr Event <span className="text-gold">Highlight</span><br />mit unserem Eiswagen</h2>
          <p className="text-secondary mb-5" style={{ maxWidth: '560px', margin: '0 auto 3rem' }}>
            Ob romantische Hochzeit, ausgelassene Party oder Firmen-Event – wir kommen zu Ihnen nach Kuppenheim &amp; ganz Baden.
          </p>
          <div className="divider mb-5" style={{ margin: '0 auto 3.5rem' }}></div>

          <div className="event-cards-grid">
            <div className="event-highlight-card">
              <div className="event-highlight-icon">💍</div>
              <h3>Hochzeiten</h3>
              <p>Der süße Start ins Eheglück – stilvoll serviert für eure Gäste mit unserem weißen Eiswagen.</p>
            </div>
            <div className="event-highlight-card">
              <div className="event-highlight-icon">🎂</div>
              <h3>Geburtstage</h3>
              <p>Strahlende Augen bei Jung und Alt – das Eis-Highlight jeder privaten Party.</p>
            </div>
            <div className="event-highlight-card event-highlight-card--featured">
              <div className="event-featured-badge">Beliebt</div>
              <div className="event-highlight-icon">🏢</div>
              <h3>Firmen-Events</h3>
              <p>Mitarbeiter motivieren und Kunden begeistern mit kühler Erfrischung direkt vor der Tür.</p>
            </div>
            <div className="event-highlight-card">
              <div className="event-highlight-icon">🍦</div>
              <h3>Kitas &amp; Schulfeste</h3>
              <p>Ein Highlight für kleine Genießer – wir bringen Kinderaugen zum Strahlen.</p>
            </div>
          </div>

        </div>
      </section>



      {/* Calculator Section */}
      <section id="calculator" className="section bg-primary text-center animate-on-scroll">
        <div className="container">
          <h2 className="section-title mb-2">Planen Sie Ihr <span className="text-gold">Erlebnis</span></h2>
          <div className="divider mb-5"></div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <IceCreamCalculator onBookingRequest={() => { setIsBookingOpen(true); setBookingStep(1); setIsSubmitted(false); }} />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="process" className="section bg-process-refined text-center overflow-hidden">
        <div className="container relative">
          {/* Decorative Background Blobs */}
          <div className="vibrant-blob-1"></div>
          <div className="vibrant-blob-2"></div>

          <h2 className="section-title mb-2">In 4 Schritten zum <span className="text-gold">Eis-Highlight</span></h2>
          <div className="divider mb-5"></div>

          <div className="process-container">
            <svg className="process-svg" viewBox="0 0 1000 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vibrantGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="33%" stopColor="#FF6B6B" />
                  <stop offset="66%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#A29BFE" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 0,75 C 150,25 350,125 500,75 C 650,25 850,125 1000,75"
                className="process-path"
                stroke="url(#vibrantGradient)"
                filter="url(#glow)"
              />
              <circle r="7" className="process-particle">
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path="M 0,75 C 150,25 350,125 500,75 C 650,25 850,125 1000,75"
                />
              </circle>
            </svg>

            <div className="process-grid">
              <div className="process-step vibrant-step-1">
                <div className="step-number">01</div>
                <h3 className="mb-2">Unverbindliche Anfrage</h3>
                <p className="text-secondary">Senden Sie uns alle Event-Details bequem über unser Formular.</p>
              </div>
              <div className="process-step vibrant-step-2">
                <div className="step-number">02</div>
                <h3 className="mb-2">Terminbestätigung</h3>
                <p className="text-secondary">Wir prüfen Ihren Terminwunsch und geben Ihnen zeitnah Rückmeldung.</p>
              </div>
              <div className="process-step vibrant-step-3">
                <div className="step-number">03</div>
                <h3 className="mb-2">Das Event</h3>
                <p className="text-secondary">Wir kommen vor Ort, bedienen Ihre Gäste und zählen die Portionen.</p>
              </div>
              <div className="process-step vibrant-step-4">
                <div className="step-number">04</div>
                <h3 className="mb-2">Abrechnung</h3>
                <p className="text-secondary">Die Abrechnung erfolgt nach dem Event bequem per Rechnung.</p>
              </div>
            </div>
          </div>

          <div className="process-note">
            <p><strong>Hinweis:</strong> Bei weiteren Fragen oder individuellen Wünschen rund um Ihr Event nutzen Sie bitte ebenfalls das Formular, dort haben Sie Platz für alle weiteren Anmerkungen.</p>
          </div>

          <div className="mt-5 text-center">
            <MagneticWrapper>
              <button
                onClick={() => { setIsBookingOpen(true); setBookingStep(1); setIsSubmitted(false); }}
                className="btn btn-primary event-cta-btn"
              >
                Jetzt unverbindlich anfragen →
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </section>



      {/* Reviews Section */}
      <section id="reviews" className="section bg-tertiary text-center animate-on-scroll">
        <div className="container">
          <div className="reviews-header mb-4">
            <h2 className="section-title mb-2">Was unsere <span className="text-gold">Kunden sagen</span></h2>
            <div className="divider mb-4"></div>
            <div className="google-rating mb-4">
              <span className="stars display-4">★★★★★</span>
              <p className="rating-text text-secondary mt-1">Exzellente 5.0 Bewertungen auf Google</p>
            </div>
          </div>

          <div className="slider-container">
            <button className="slider-arrow prev" onClick={prevReview}>&#8249;</button>
            <div className="slider-wrapper google-style-carousel">
              <div
                className="carousel-track"
                style={{ "--current-index": currentReview } as React.CSSProperties}
              >
                {REVIEWS.map((review, index) => (
                  <div key={review.name + index} className="review-card google-card">
                    <div className="google-card-header">
                      <div className="avatar">{review.name.charAt(0)}</div>
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{review.name}</h4>
                        <div className="reviewer-meta">Local Guide</div>
                      </div>
                      <div className="google-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>
                    <div className="review-meta mb-2">
                      <span className="stars">★★★★★</span>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-arrow next" onClick={nextReview}>&#8250;</button>
          </div>

          <div className="reviews-footer mt-5">
            <MagneticWrapper>
              <a
                href="https://www.google.com/search?newwindow=1&sca_esv=7d344b0fa4f660b1&hl=de-DE&gl=de&sxsrf=ANbL-n4fZQ1XC8HebjcyNVknoyhz0xLb5A:1771873726740&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOVmBDCLEzOzXy59-GFna5enW3Q2MB34IAkg68-yNmMCL5dA664-akFzrlpIfuQDZ5GVwzaBQIA0ww9ZgKiF-cyOPFCafQlZN5GnHtJ20xTl2iz-CFmtrNW9fTbLk0WZP4qpTAhMkKU4KXzcNUc0oyeZ50wJDQz8SJzTaKxA-FXe3dUPFjO9KSY_xFPCJxZd4T2pjlsU_cYuZpaLLqBcwftcRCuud&q=Eis+Agnello+Kuppenheim+Schloss+Favorite+%28Eisdiele,+Eiswagen,+Speiseeis+Herstellung+und+Verkauf%29+Rezensionen&sa=X&ved=2ahUKEwimzcaAqPCSAxWY8LsIHU6fLUYQ0bkNegQINBAH&biw=1563&bih=944&dpr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Jetzt auf Google bewerten
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="section bg-secondary animate-on-scroll">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <h2 className="section-title text-center mb-5">Häufig gestellte <span className="text-gold">Fragen</span></h2>

          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <div key={index} className={`faq-item faq-item--${index % 2 === 0 ? 'even' : 'odd'} ${activeFaq === index ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{activeFaq === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition: FAQ -> Footer */}
      <div className="footer-wave" style={{
        lineHeight: 0,
        backgroundColor: 'var(--bg-tertiary)',
        marginTop: '-1px' // Slight overlap with section above
      }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100px', display: 'block' }}
        >
          <path
            d="M0,0 C240,100 480,0 720,50 C960,100 1200,60 1440,80 L1440,0 L0,0 Z"
            fill="var(--bg-secondary)"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="footer bg-tertiary">
        <div className="container footer-grid">
          <div className="footer-col col-main">
            <h3 className="text-gold mb-3">EISFAVORITE</h3>
            <p className="mb-3">Premium Eiswagen-Catering für Hochzeiten, Firmen-Events & Feste in Kuppenheim & Region.</p>
            <p className="small text-secondary">Mit ❤️ handgemacht in Kuppenheim.</p>
          </div>

          <div className="footer-col">
            <h4 className="mb-3 footer-heading">Kontakt</h4>
            <ul className="footer-list">
              <li>Favoritstraße 11, Kuppenheim</li>
              <li className="mt-2">
                <a href="tel:+4917656813172" className="footer-interactive-link">📞 0176 56813172</a>
              </li>
              <li>
                <a href="mailto:eisfavorit@gmail.com" className="footer-interactive-link">✉️ eisfavorit@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="mb-3 footer-heading">Rechtliches</h4>
            <ul className="footer-list">
              <li><button onClick={() => setShowImpressum(true)} className="link-btn-premium">Impressum</button></li>
              <li><button onClick={() => setShowDatenschutz(true)} className="link-btn-premium">Datenschutz</button></li>
              <li><a href="#faq" className="footer-interactive-link">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="mb-3 footer-heading">Social</h4>
            <a href="https://www.instagram.com/eisfavorite/" target="_blank" rel="noopener noreferrer" className="instagram-btn-premium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="insta-svg-small">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@eisfavorite</span>
            </a>
          </div>
        </div>

        <div className="container service-area mt-5">
          <h4 className="mb-4 text-center" style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>Eiswagen mieten in...</h4>
          <div className="service-links-grid">
            {CITIES.map(c => (
              <Link key={c.slug} to={`/${c.slug}`} className="service-link">
                Eiswagen {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="container footer-bottom text-center">
          <div className="footer-divider-thin mb-4"></div>
          <p className="text-secondary small">&copy; {new Date().getFullYear()} EisFavorite - Italienische Eistradition</p>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={showImpressum} onClose={() => setShowImpressum(false)} title="Impressum">
        <div className="legal-content">
          <p><strong>Angaben gemäß § 5 TMG:</strong></p>
          <p>Agnello Andrea<br />
            Favoritstraße 11<br />
            76456 Kuppenheim</p>

          <p><strong>Kontakt:</strong></p>
          <p>Telefon: 0176 56813172<br />
            E-Mail: eisfavorit@gmail.com</p>

          <p><strong>Umsatzsteuer-ID:</strong></p>
          <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            39102/26343</p>

          <p><strong>Zuständige Aufsichtsbehörde:</strong></p>
          <p>Handwerkskammer Karlsruhe</p>

          <p className="small mt-4 text-secondary">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr</a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </div>
      </Modal>

      <Modal isOpen={showDatenschutz} onClose={() => setShowDatenschutz(false)} title="Datenschutz">
        <div className="legal-content">
          <h4>1. Datenschutz auf einen Blick</h4>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.</p>

          <h4>2. Datenerfassung auf dieser Website</h4>
          <p><strong>Wer ist verantwortlich?</strong><br />
            Verantwortlich für die Datenverarbeitung ist Agnello Andrea (siehe Impressum).</p>

          <p><strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>

          <p><strong>Wofür nutzen wir Ihre Daten?</strong><br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

          <h4>3. Hosting und SSL-Verschlüsselung</h4>
          <p>Wir nutzen Verschlüsselungstechnologien (SSL/TLS), um die Sicherheit Ihrer Daten bei der Übertragung zu gewährleisten. Unsere Website wird so betrieben, dass möglichst wenig Daten anfallen.</p>

          <h4>4. Ihre Rechte</h4>
          <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.</p>
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={isSubmitted ? "" : (
          <div className="modal-branding">
            <div className="logo-container">
              <div className="logo text-gold">EISFAVORITE</div>
              <div className="logo-subtitle">agnello</div>
            </div>
            <div className="modal-subtitle">unverbindliche anfrage</div>
          </div>
        )}
      >
        <div className="booking-modal-content">
          {isSubmitted ? (
            <div className="success-message animate-fade-in py-5">
              <div className="success-icon">✓</div>
              <h3 className="text-gold">Vielen Dank!</h3>
              <p>Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.</p>
              <button onClick={() => setIsBookingOpen(false)} className="btn btn-primary mt-4">Schließen</button>
            </div>
          ) : (
            <>
              <div className="step-indicator mb-5">
                {[1, 2, 3].map(step => (
                  <div key={step} className={`step-circle ${bookingStep >= step ? 'active' : ''}`}>
                    {step}
                  </div>
                ))}
              </div>


              <form onSubmit={handleSubmit} className="multi-step-form">
                <div style={{ display: bookingStep === 1 ? 'block' : 'none' }}>
                  <div className="step-content animate-fade-in">
                    <h4 className="mb-4">1. Deine Kontaktdaten</h4>
                    <div className="form-group">
                      <label htmlFor="name">Vollständiger Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Vorname Nachname"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-Mail-Adresse *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="name@beispiel.de"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Telefonnummer (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Für Rückfragen zum Termin"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: bookingStep === 2 ? 'block' : 'none' }}>
                  <div className="step-content animate-fade-in">
                    <h4 className="mb-4">2. Wann & Wo?</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="date">Datum *</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          min={todayDate}
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="time">Uhrzeit *</label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ flex: '2' }}>
                        <label htmlFor="street">Straße *</label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          required
                          placeholder="Event-Location"
                          value={formData.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group" style={{ flex: '1' }}>
                        <label htmlFor="houseNumber">Nr. *</label>
                        <input
                          type="text"
                          id="houseNumber"
                          name="houseNumber"
                          required
                          placeholder="Nr."
                          value={formData.houseNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ flex: '1' }}>
                        <label htmlFor="zip">PLZ *</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          required
                          placeholder="PLZ"
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group" style={{ flex: '2' }}>
                        <label htmlFor="city">Ort *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          placeholder="Ort"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: bookingStep === 3 ? 'block' : 'none' }}>
                  <div className="step-content animate-fade-in">
                    <h4 className="mb-4">3. Event-Details</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="guests">Anzahl der Gäste (ca.) *</label>
                        <select
                          id="guests"
                          name="guests"
                          required
                          value={formData.guests}
                          onChange={handleInputChange}
                        >
                          <option value="">Bitte wählen...</option>
                          <option value="unter 50">unter 50</option>
                          <option value="50-100">50-100</option>
                          <option value="100-200">100-200</option>
                          <option value="über 200">über 200</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="eventType">Art der Veranstaltung *</label>
                        <select
                          id="eventType"
                          name="eventType"
                          required
                          value={formData.eventType}
                          onChange={handleInputChange}
                        >
                          <option value="Hochzeit">Hochzeit</option>
                          <option value="Geburtstag">Geburtstag</option>
                          <option value="Firmenfeier">Firmenfeier</option>
                          <option value="Schulfest/Kita">Schulfest/Kita</option>
                          <option value="Privatfest">Privatfest</option>
                          <option value="Sonstiges">Sonstiges</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Deine Nachricht (optional)</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Besondere Wünsche, die Location oder Fragen..."
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="form-navigation mt-5">
                  {formError && (
                    <div className="text-danger small mb-3 text-center" style={{ color: '#FF4B4B', fontWeight: 'bold' }}>
                      {formError}
                    </div>
                  )}
                  {bookingStep > 1 && (
                    <button type="button" onClick={prevStep} className="btn btn-outline">
                      <span style={{ marginRight: '8px' }}>←</span> Zurück
                    </button>
                  )}
                  {bookingStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className={`btn btn-primary ${bookingStep === 1 ? 'w-full' : ''}`}
                    >
                      Weiter <span style={{ marginLeft: '8px' }}>→</span>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>
                      ANFRAGE ABSENDEN <span style={{ marginLeft: '10px' }}>✓</span>
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/:citySlug" element={<MainContent />} />
    </Routes>
  );
}

export default App;
