import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import {
  Home,
  Wrench,
  Users,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Wind,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { FIRM_NAME, BASE_CONTACTS, TEAM_MEMBERS, SERVICES } from './data.ts'; // Hata düzeltildi: Uzantı (.ts) eklendi.

// --- 1. i18n (Çeviri) Yapısı ---
// SOLID (OCP): Yeni bir dil eklemek için 'translations' objesini genişletmek yeterlidir.

// TypeScript'te iç içe geçmiş nesne yapısını desteklemek için Recursive tip tanımı
type RecursiveTranslation = {
  [key: string]: string | RecursiveTranslation;
};

// Ana Translations tipi
type Translations = {
  [key: string]: RecursiveTranslation;
};

const translations: Translations = {
  tr: {
    nav: {
      home: 'Anasayfa',
      services: 'Hizmetler',
      about: 'Hakkımızda',
      faq: 'SSS',
      contact: 'İletişim',
    },
    hero: {
      title: 'Hızlı, Güvenilir ve Garantili Teknik Servis',
      subtitle: 'Sıhhi tesisat, klima ve beyaz eşya tamiri, kurulumu ve taşımacılığı.',
      cta: 'Hemen Teklif Alın',
      call_now: 'Şimdi Arayın',
    },
    services: {
      title: 'Hizmetlerimiz',
      plumbing: 'Sıhhi Tesisat',
      plumbing_desc: 'Musluk tamiri, boru döşeme, tıkanıklık açma ve su kaçağı tespiti.',
      appliance: 'Beyaz Eşya Tamiri',
      appliance_desc: 'Çamaşır makinesi, buzdolabı, bulaşık makinesi arıza ve bakımı.',
      ac: 'Klima Servisi',
      ac_desc: 'Klima montajı, sökümü, yıllık bakım ve gaz dolumu hizmetleri.',
      moving: 'Kurulum ve Taşıma',
      moving_desc: 'Beyaz eşya ve klima için profesyonel kurulum ve yer değiştirme.',
      price_range: 'Servis Ücreti:',
      duration: 'Tahmini Süre:',
      duration_short: '1-3 saat',
      duration_medium: '2-4 saat',
      duration_long: 'Yarım gün',
      price_campaign: 'ÜCRETSİZ KEŞİF', // Yeni kampanya metni
    },
    about: {
      title: 'Ekibimizle Tanışın',
      bayram_title: 'Kurucu / Usta Teknisyen',
      bayram_bio: '“15 yılı aşkın süredir sıhhi tesisat ve beyaz eşya sektöründe edindiğim deneyimle, müşterilerimizin memnuniyetini her zaman önceliğimiz olarak görüyorum.”',
    },
    faq: {
      title: 'Sık Sorulan Sorular',
      q1: 'Servis/Keşif ücretiniz nedir?',
      a1: 'Bu ay geçerli olan kampanyamızla, arıza tespiti ve keşif hizmetimiz **ÜCRETSİZDİR**. Sadece parça değişimi veya tamirat onayı verildiğinde ücret alınır.',
      q2: 'Garantili hizmet veriyor musunuz?',
      a2: `Evet, yaptığımız tüm tamirat ve parça değişim işlemleri 1 yıl "${FIRM_NAME}" garantisi altındadır.`,
      q3: 'Hangi bölgelere hizmet veriyorsunuz?',
      a3: 'Adana\'nın tüm ilçelerine hizmet vermekteyiz. Acil durumlar için 7/24 iletişim bilgilerimizden bize ulaşabilirsiniz.',
      q4: 'Randevu nasıl alabilirim?',
      a4: 'Bizi doğrudan arayabilir veya iletişim sayfamızdaki E-Posta adresimize isteklerinizi iletebilirsiniz. Size en kısa sürede dönüş yapacağız.',
    },
    footer: {
      hours: 'Çalışma Saatleri',
      hours_desc: 'Hafta içi: 08:00 - 20:00 | Hafta sonu: 09:00 - 18:00',
      area: 'Hizmet Bölgeleri',
      area_desc: 'Adana\'nın tüm ilçeleri.',
      privacy: 'KVKK ve Gizlilik Politikası',
      copyright: `Tüm hakları saklıdır.`,
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      title: 'Fast, Reliable, and Guaranteed Technical Service',
      subtitle: 'Plumbing, air conditioning, and white goods repair, installation, and moving.',
      cta: 'Get a Quote Now',
      call_now: 'Call Now',
    },
    services: {
      title: 'Our Services',
      plumbing: 'Plumbing',
      plumbing_desc: 'Faucet repair, pipe laying, unclogging, and water leak detection.',
      appliance: 'Appliance Repair',
      appliance_desc: 'Washing machine, refrigerator, dishwasher malfunction and maintenance.',
      ac: 'AC Service',
      ac_desc: 'Air conditioner assembly, disassembly, annual maintenance, and gas refill services.',
      moving: 'Installation & Moving',
      moving_desc: 'Professional installation and relocation for appliances and AC units.',
      // Fiyat Bilgisi Kaldırıldı, yerine kampanya metni eklendi.
      price_range: 'Service Fee:',
      duration: 'Est. Duration:',
      duration_short: '1-3 hours',
      duration_medium: '2-4 hours',
      duration_long: 'Half day',
      price_campaign: 'FREE DISCOVERY', // Yeni kampanya metni
    },
    about: {
      title: 'Meet Our Team',
      mehmet_title: 'Founder / Master Technician',
      mehmet_bio: 'Over 15 years in the plumbing and appliance industry. Customer satisfaction is always our priority.',
      ayse_title: 'Operations & Customer Relations',
      ayse_bio: 'You can contact Ayşe for appointment scheduling, logistics, and all your questions. We are focused on fast solutions.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      // Cevap güncellendi: Servis ücreti ücretsiz
      q1: 'What is your service/discovery fee?',
      a1: `With our current campaign, our troubleshooting and discovery service is **FREE**. A fee is only charged when parts replacement or repair approval is given.`,
      q2: 'Do you provide guaranteed service?',
      a2: `Yes, all repairs and part replacements we perform are under a 1-year "${FIRM_NAME}" warranty.`,
      q3: 'Which areas do you serve?',
      a3: 'We serve all districts of Istanbul. We have 24/7 mobile teams for emergencies.',
      q4: 'How can I get an appointment?',
      a4: 'You can call us directly or fill out the form on our contact page. We will get back to you as soon as possible.',
    },
    contact: {
      title: 'Contact Us',
      desc: 'Fill out the form for your questions or appointment requests, and we will call you.',
      form: {
        name: 'Your Name',
        phone: 'Your Phone Number',
        phone_req: 'Phone number is required.',
        email: 'Your Email (Optional)',
        service: 'Service You Are Interested In',
        service_placeholder: 'Select a service...',
        message: 'Description',
        message_placeholder: 'Brief info about the issue or request...',
        preferred: 'Preferred Contact Method',
        pref_phone: 'Phone',
        pref_email: 'Email',
        submit: 'Send Message',
        success: 'Your message has been sent successfully! We will contact you shortly.',
        error: 'An error occurred. Please check the information or call us directly.',
      },
      info: 'Contact Information',
    },
    footer: {
      hours: 'Working Hours',
      hours_desc: 'Weekdays: 08:00 - 20:00 | Weekend: 09:00 - 18:00',
      area: 'Service Areas',
      area_desc: 'All of Istanbul (European and Anatolian sides)',
      privacy: 'Privacy Policy',
      copyright: `Tüm hakları saklıdır.`,
    },
  },
};

type Language = 'tr' | 'en';
type Page = 'home' | 'services' | 'about' | 'faq' | 'contact';

// --- 2. Context API (State Yönetimi) ---
// SOLID (DIP): Bileşenler doğrudan state'e değil, Context aracılığıyla soyutlamalara (abstractions) bağlıdır.
// i18nContext ve AppContext, state yönetimini bileşenlerden ayırır.

interface ILangContext {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

interface IAppContext {
  page: Page;
  setPage: (page: Page) => void;
}

const LangContext = createContext<ILangContext | null>(null);
const AppContext = createContext<IAppContext | null>(null);

const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within a LangProvider');
  return context;
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

// Çeviri fonksiyonu (nested key desteği ile)
const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let result: any = translations[lang];

  for (const k of keys) {
    if (typeof result === 'undefined' || result === null || typeof result[k] === 'undefined') {
      console.warn(`Translation not found for key: "${key}" in lang: "${lang}"`);
      return key; // Anahtarı geri döndür
    }
    result = result[k];
  }

  if (typeof result !== 'string') {
    console.warn(`Translation result for key: "${key}" in lang: "${lang}" is not a string (it's an object).`);
    return key; // Nesne ise anahtarı geri döndür
  }

  return result as string;
};

// Provider Bileşenleri
const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('tr');

  const t = useCallback((key: string) => {
    return getTranslation(lang, key);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('home');
  const value = useMemo(() => ({ page, setPage }), [page]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- 3. Ana Uygulama ve Sayfa Yönlendirme ---
// SOLID (SRP): App bileşeni sadece provider'ları ayarlamak ve sayfa yönlendirmekle sorumludur.
// Her sayfa kendi içeriğinden sorumludur.

const App: React.FC = () => {
  return (
    <LangProvider>
      <AppProvider>
        <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gray-50">
          <Header />
          <main className="flex-grow">
            <PageContent />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </LangProvider>
  );
};

const PageContent: React.FC = () => {
  const { page } = useApp();

  // Basit "Routing" Mekanizması
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'services':
      return <ServicesPage />;
    case 'about':
      return <AboutPage />;
    case 'faq':
      return <FAQPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage />;
  }
};

// --- 4. Bileşenler (Components) ---

// İkonları veri dosyasından çekmek için Map
const IconMap: { [key: string]: React.ElementType } = {
  Home, Wrench, Users, HelpCircle, Mail, Phone, Clock, MapPin, ChevronDown, Menu, X, Sun, Moon, Wind, Truck, CheckCircle, AlertCircle
};

// SOLID (SRP): Header bileşeni sadece navigasyon ve dil seçiminden sorumludur.
const Header: React.FC = () => {
  const { page, setPage } = useApp();
  const { t } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', icon: IconMap.Home },
    { key: 'services', icon: IconMap.Wrench },
    { key: 'about', icon: IconMap.Users },
    { key: 'faq', icon: IconMap.HelpCircle },
    { key: 'contact', icon: IconMap.Mail },
  ];

  const NavLink: React.FC<{
    itemKey: Page;
    Icon: React.ElementType;
    isMobile?: boolean;
  }> = ({ itemKey, Icon, isMobile = false }) => {
    const isActive = page === itemKey;
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200";
    const activeClasses = "bg-blue-100 text-blue-700 font-medium";
    const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
    const mobileClasses = "text-lg";

    return (
      <li>
        <a
          href={`#${itemKey}`}
          onClick={(e) => {
            e.preventDefault();
            setPage(itemKey);
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${isMobile ? mobileClasses : ''}`}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon className="w-5 h-5" />
          {t(`nav.${itemKey}`)}
        </a>
      </li>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo - Sol tarafta */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => setPage('home')}
          >
            <Wrench className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {FIRM_NAME.split(' ')[0]}
              <span className="text-blue-600">{FIRM_NAME.split(' ')[1]}</span>
            </span>
          </div>

          {/* Desktop Nav - Sağ tarafta */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <NavLink key={item.key} itemKey={item.key as Page} Icon={item.icon} />
              ))}
            </ul>
          </div>

          {/* Dil Seçici ve Mobil Menü Butonu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Menüyü aç</span>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" id="mobile-menu">
          <ul className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.key} itemKey={item.key as Page} Icon={item.icon} isMobile />
            ))}
          </ul>
        </div>
      )}
    </header>
  );

};


// SOLID (SRP): Footer sadece altbilgi, çalışma saatleri ve telif hakkı bilgilerini gösterir.
const Footer: React.FC = () => {
  const { t } = useLang();
  const { setPage } = useApp();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 7.99 9.8v-7H7.47v-2.8h2.52V9.95c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.56v1.88h2.78l-.45 2.8h-2.33v7C18.56 20.87 22 16.84 22 12z" /></svg> },
    { name: 'Instagram', href: '#', icon: (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.7 2 8.3 2.02 7.1.07c-1.2.05-2.02.27-2.73.58-.7.3-1.3.7-1.9 1.3-.6.6-1 1.2-1.3 1.9-.3.7-.53 1.53-.58 2.73C2.02 8.3 2 8.7 2 12s.02 3.7.07 4.9c.05 1.2.27 2.02.58 2.73.3.7.7 1.3 1.3 1.9.6.6 1.2 1 1.9 1.3.7.3 1.53.53 2.73.58 1.2.05 1.6.07 4.9.07s3.7-.02 4.9-.07c1.2-.05 2.02-.27 2.73-.58.7-.3 1.3-.7 1.9-1.3.6-.6 1-1.2 1.3-1.9.3-.7.53-1.53.58-2.73.05-1.2.07-1.6.07-4.9s-.02-3.7-.07-4.9c-.05-1.2-.27-2.02-.58-2.73-.3-.7-.7-1.3-1.3-1.9-.6-.6-1.2-1-1.9-1.3-.7-.3-1.53-.53-2.73-.58C15.7 2.02 15.3 2 12 2zm0 1.8c3.2 0 3.58.01 4.85.07 1.1.05 1.7.2 2.07.35.45.18.78.4.98.78.2.38.35.98.35 2.07.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.1-.2 1.7-.35 2.07-.18.45-.4.78-.78.98-.38.2-.98.35-2.07.35-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.1-.05-1.7-.2-2.07-.35-.45-.18-.78-.4-.98-.78-.2-.38-.35-.98-.35-2.07-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.1.2-1.7.35-2.07.18-.45.4-.78.78-.98.38-.2.98-.35 2.07-.35C8.42 3.81 8.8 3.8 12 3.8zm0 3.6c-2.42 0-4.38 1.96-4.38 4.38s1.96 4.38 4.38 4.38 4.38-1.96 4.38-4.38-1.96-4.38-4.38-4.38zm0 7.1c-1.5 0-2.72-1.22-2.72-2.72S10.5 9.48 12 9.48s2.72 1.22 2.72 2.72-1.22 2.72-2.72 2.72zm4.9-7.3c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9z" /></svg> },
    { name: 'Twitter', href: '#', icon: (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M23.95 4.57c-.88.39-1.83.65-2.82.77 1.02-.61 1.8-1.57 2.16-2.72-.95.56-2.01.97-3.13 1.19-1.8-1.92-4.6-2.08-6.6-.4-1.9 1.6-2.5 4.2-.9 6.2C7.9 9.1 4.2 7.1 1.7 4.1c-1.3 2.2-.7 5.1 1.5 6.4-.8-.03-1.5-.2-2.1-.6v.1c0 2.2 1.6 4.1 3.6 4.5-.4.1-.8.2-1.2.1-.3 0-.6-.05-.9-.08.6 1.8 2.3 3.1 4.3 3.1-1.6 1.2-3.6 1.9-5.7 1.9-.4 0-.7 0-1.1-.1 2 1.3 4.4 2.1 7 2.1 8.4 0 13-7 13-13 0-.2 0-.4 0-.6.9-.6 1.6-1.4 2.2-2.2z" /></svg> },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo ve Sosyal Medya */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => setPage('home')}>
              <Wrench className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">
                {FIRM_NAME.split(' ')[0]}<span className="text-blue-500">{FIRM_NAME.split(' ')[1]}</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-xs mb-4">{t('hero.subtitle')}</p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2">
              {SERVICES.map(service => (
                <li key={service.key}><a href="#services" onClick={(e) => { e.preventDefault(); setPage('services') }} className="hover:text-white transition">{t(`services.${service.key}`)}</a></li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{t('footer.hours')}</span>
              </li>
              <li className="ml-7 text-gray-400 text-sm">{t('footer.hours_desc')}</li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{t('footer.area')}</span>
              </li>
              <li className="ml-7 text-gray-400 text-sm">{t('footer.area_desc')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {FIRM_NAME}. {t('footer.copyright')}</p>
          <a href="#privacy" className="text-sm text-gray-400 hover:text-white transition mt-2 sm:mt-0">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  );
};

// --- 5. Sayfa Bileşenleri (Pages) ---

// SOLID (SRP): HomePage, sadece anasayfa içeriğini (Hero, Hizmet Özeti) düzenler.
const HomePage: React.FC = () => {
  const { t } = useLang();
  const { setPage } = useApp();

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-12 md:pb-16 lg:max-w-2xl lg:w-full lg:pb-20 xl:pb-24">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mt-8 sm:mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-24">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900">
                  <span className="block">{t('hero.title').split(' ')[0]}</span>{' '}
                  <span className="block text-blue-600">
                    {t('hero.title').substring(t('hero.title').indexOf(' ') + 1)}
                  </span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-500 sm:mt-4 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); setPage('contact') }}
                      className="w-full flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                    >
                      {t('hero.cta')}
                    </a>
                  </div>
                  <div className="rounded-md shadow">
                    <a
                      href={`tel:${BASE_CONTACTS[0].phone.replace(/\s/g, '')}`}
                      className="w-full flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                    >
                      {t('hero.call_now')}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-48 w-full object-cover sm:h-56 md:h-72 lg:w-full lg:h-full"
            src="plumbing.jpeg"
            alt="Sıhhi tesisat ve beyaz eşya tamiri"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/1000x800/e0e7ff/3b82f6?text=G%C3%B6rsel+Y%C3%BCklenemedi')}
          />  
        </div>
      </div>

      {/* Services Summary */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-8 sm:mb-12">{t('services.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const Icon = IconMap[service.icon];
              return (
                <div key={service.key} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t(`services.${service.key}`)}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{t(`services.${service.key}_desc`)}</p>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); setPage('services') }}
                    className="text-blue-600 font-medium hover:text-blue-800 transition text-sm sm:text-base"
                  >
                    Detaylar &rarr;
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const ServicesPage: React.FC = () => {
  const { t } = useLang();

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">{t('services.title')}</h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">{t('hero.subtitle')}</p>

        <div className="space-y-12">
          {SERVICES.map((service) => {
            const Icon = IconMap[service.icon];
            return (
              <div key={service.key} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="md:w-1/3">
                  <img
                    className="h-64 w-full object-cover"
                    src={service.imageUrl}
                    alt={t(`services.${service.key}`)}
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/e0e7ff/3b82f6?text=G%C3%B6rsel+Y%C3%BCklenemedi')}
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <Icon className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t(`services.${service.key}`)}</h3>
                  <p className="text-gray-600 mb-4">{t(`services.${service.key}_desc`)}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1">
                      <span className="block text-sm font-medium text-gray-500">{t('services.duration')}</span>
                      <span className="block text-lg font-semibold text-gray-900">{t(service.durationKey)}</span>
                    </div>
                    {/* Fiyat Bilgisi yerine kampanya metni */}
                    <div className="bg-white p-3 rounded-lg border border-gray-200 flex-1">
                      <span className="block text-sm font-medium text-gray-500">{t('services.price_range')}</span>
                      <span className="block text-lg font-semibold text-green-600">{t(service.priceKey)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const { t } = useLang();
  const { setPage } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Bölümü */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            15 yılı aşkın süredir Adana'da profesyonel teknik servis hizmeti sunuyoruz. 
            Müşteri memnuniyetini her zaman ön planda tutuyoruz.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { number: '15+', label: 'Yıl Deneyim' },
            { number: '1000+', label: 'Mutlu Müşteri' },
            { number: '24/7', label: 'Hizmet' },
            { number: '100%', label: 'Garanti' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ekip Üyesi */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Kurucumuz</h2>
            <p className="text-base sm:text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              15 yılı aşkın süredir Adana'da teknik servis sektöründe öncü olan uzman ekibimizin lideriyle tanışın
            </p>
          </div>
          
          {/* Kurucu Kartı */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Görsel Taraf */}
              <div className="relative group">
                {/* Professional Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 rounded-2xl transform rotate-1 scale-105 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 rounded-2xl transform -rotate-1 scale-105 opacity-10"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-100 group-hover:border-blue-200 transition-all duration-500">
                  {/* Inner Frame */}
                  <div className="p-2">
                    <div className="relative aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        src={TEAM_MEMBERS[0].img}
                        alt={TEAM_MEMBERS[0].name}
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400/dbeafe/2563eb?text=Bayram+T.')}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Corner Decorations */}
                      <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
                      <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-blue-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Rozet */}
                <div className="absolute -top-2 -right-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-75"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-2xl border-2 border-white/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                        <span className="font-bold text-xs sm:text-sm">15+ Yıl Deneyim</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Professional Badge */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl shadow-xl border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold text-xs sm:text-sm">Usta Teknisyen</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bilgiler Taraf */}
              <div className="p-10 flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{TEAM_MEMBERS[0].name}</h3>
                  <p className="text-xl text-blue-600 font-semibold mb-6">{t(TEAM_MEMBERS[0].titleKey)}</p>
                  
                  {/* Bio */}
                  <div className="bg-white/70 rounded-xl p-6 mb-6 border border-blue-100">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {t(TEAM_MEMBERS[0].bioKey)}
                    </p>
                  </div>
                  
                  {/* İletişim Bilgileri */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Direkt İletişim</p>
                        <a 
                          href={`tel:${TEAM_MEMBERS[0].phone.replace(/\s/g, '')}`} 
                          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {TEAM_MEMBERS[0].phone}
                        </a>
                      </div>
                    </div>
                    
                    {/* Hızlı İletişim Butonları */}
                    <div className="flex gap-4 pt-4">
                      <a 
                        href={`tel:${TEAM_MEMBERS[0].phone.replace(/\s/g, '')}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Phone className="w-5 h-5 inline mr-2" />
                        Hemen Arayın
                      </a>
                      <a 
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); setPage('contact') }}
                        className="flex-1 bg-white text-blue-600 text-center py-3 px-6 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                      >
                        <Mail className="w-5 h-5 inline mr-2" />
                        Mesaj Gönder
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600">
              İşimizi yaparken bize ilham veren prensipler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Kalite',
                desc: 'Her işimizde en yüksek kalite standartlarını koruyoruz'
              },
              {
                icon: Clock,
                title: 'Zamanında',
                desc: 'Belirttiğimiz zamanda işinizi teslim ediyoruz'
              },
              {
                icon: Users,
                title: 'Güven',
                desc: 'Müşterilerimizle şeffaf ve dürüst ilişkiler kuruyoruz'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SOLID (SRP): FAQItem bileşeni sadece tek bir SSS öğesini yönetir (açma/kapama).
const FAQItem: React.FC<{ qKey: string; aKey: string }> = ({ qKey, aKey }) => {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10">
            <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {t(qKey)}
          </span>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
        }`}>
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-gray-700 leading-relaxed">{t(aKey)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const { t } = useLang();
  const { setPage } = useApp();
  const faqs = [
    { qKey: 'faq.q1', aKey: 'faq.a1' },
    { qKey: 'faq.q2', aKey: 'faq.a2' },
    { qKey: 'faq.q3', aKey: 'faq.a3' },
    { qKey: 'faq.q4', aKey: 'faq.a4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-4 sm:mb-6">
            <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-base sm:text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Sıkça sorulan soruların cevapları. Aklınıza takılan bir soru mu var? Hemen arayın!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4 mb-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.qKey} qKey={faq.qKey} aKey={faq.aKey} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-blue-100">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Hala sorunuz mu var?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Size yardımcı olmak için buradayız. Hemen iletişime geçin!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={`tel:${BASE_CONTACTS[0].phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Hemen Arayın
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); setPage('contact') }}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Mesaj Gönder
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ContactPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">İletişim Bilgileri</h1>
          <p className="text-lg sm:text-xl text-gray-600 px-4">7/24 hizmetinizdeyiz. Hemen arayın!</p>
        </div>

        {/* Ana İletişim Kartı */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-12 mx-4 sm:mx-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 text-white">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Hemen Arayın!</h2>
            <p className="text-center text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base px-4">Acil durumlar için 7/24 ulaşabilirsiniz</p>
            
            {/* Vurgulanan Telefon Numarası */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-yellow-300/30">
              <a 
                href={`tel:${BASE_CONTACTS[0].phone.replace(/\s/g, '')}`}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors group"
              >
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-center break-all">{BASE_CONTACTS[0].phone}</span>
              </a>
              <p className="text-center text-blue-100 mt-2 sm:mt-3 text-sm sm:text-base">{BASE_CONTACTS[0].name}</p>
            </div>
          </div>

          {/* Diğer İletişim Bilgileri */}
          <div className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {BASE_CONTACTS.map((info) => {
                const Icon = IconMap[info.icon];
                return (
                  <div key={info.name} className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-lg p-2 sm:p-3">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{info.name}</h3>
                        {info.title && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{info.title}</p>
                        )}
                        {info.phone && (
                          <a 
                            href={`tel:${info.phone.replace(/\s/g, '')}`} 
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors break-all"
                          >
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{info.phone}</span>
                          </a>
                        )}
                        {info.email && (
                          <a 
                            href={`mailto:${info.email}`} 
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors mt-2 break-all"
                          >
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{info.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hizmet Alanı ve Harita */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mx-4 sm:mx-0">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">Hizmet Bölgemiz</h2>
            <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg px-4">
              Adana'nın tüm ilçelerine profesyonel teknik servis hizmeti sunuyoruz.
            </p>
            
            {/* Bölge Listesi */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {['Çukurova', 'Seyhan', 'Yüreğir', 'Sarıçam'].map((district) => (
                <div key={district} className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{district}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Harita */}
          <div className="h-96 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d101047.45189663366!2d35.321013!3d37.001345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adana Hizmet Alanları"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;