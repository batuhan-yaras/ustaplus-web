// SRP: Bu dosya sadece uygulama verisini ve yapılandırmasını tanımlamaktan sorumludur.

interface Contact {
    name: string;
    title?: string; // Yeni alan eklendi
    phone: string;
    email: string;
    icon: 'Phone' | 'Mail';
}

interface TeamMember {
    name: string;
    titleKey: string; // Çeviri anahtarı (i18n'den gelir)
    bioKey: string; // Çeviri anahtarı
    phone: string;
    img: string;
}

interface Service {
    key: string;
    icon: 'Sun' | 'Moon' | 'Wind' | 'Truck';
    durationKey: string; // Çeviri anahtarı
    priceKey: string; // Çeviri anahtarı (Fiyat bilgisi kaldırıldı, açıklama için kullanılıyor)
    imageUrl: string;
    descriptionKey?: string; // Hizmet açıklaması için
}

interface Testimonial {
    name: string;
    commentKey: string;
    rating: number; // 1-5 arası
    date: string;
}

interface Statistic {
    value: string;
    labelKey: string;
    icon: string;
}

// --- Ana Yapılandırma ---
export const FIRM_NAME = 'UstaPlus Teknik';
export const FIRM_SLOGAN = 'Hızlı, Güvenilir ve Garantili Teknik Servis';
export const FIRM_ESTABLISHED_YEAR = 2010;

export const BASE_CONTACTS: Contact[] = [
    { name: 'Bayram Tokmak', title: 'Kurucu / Usta Teknisyen', phone: '0501 581 9606', email: '', icon: 'Phone' },
    { name: 'E-posta Adresi', phone: '', email: 'bayramtokmak810@gmail.com', icon: 'Mail' },
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Bayram Tokmak',
        titleKey: 'about.bayram_title',
        bioKey: 'about.bayram_bio',
        phone: '0501 581 9606',
        img: '/bayramtokmak.jpg'
    },
];

export const SERVICES: Service[] = [
  {
    key: 'plumbing',
    icon: 'Sun',
    durationKey: 'services.duration_medium',
    priceKey: 'services.price_campaign',
    imageUrl: 'sihhi_tesisat.jpg',
    descriptionKey: 'services.plumbing_desc'
  },
  {
    key: 'appliance',
    icon: 'Moon',
    durationKey: 'services.duration_short',
    priceKey: 'services.price_campaign',
    imageUrl: 'applience_repair.jpg',
    descriptionKey: 'services.appliance_desc'
  },
  {
    key: 'ac',
    icon: 'Wind',
    durationKey: 'services.duration_medium',
    priceKey: 'services.price_campaign',
    imageUrl: 'AC-repair.jpg',
    descriptionKey: 'services.ac_desc'
  },
  {
    key: 'moving',
    icon: 'Truck',
    durationKey: 'services.duration_long',
    priceKey: 'services.price_campaign',
    imageUrl: 'appliance_installation.jpg',
    descriptionKey: 'services.moving_desc'
  },
];

export const STATISTICS: Statistic[] = [
    {
        value: '1000+',
        labelKey: 'stats.customers',
        icon: 'users'
    },
    {
        value: '15+',
        labelKey: 'stats.experience',
        icon: 'clock'
    },
    {
        value: '7/24',
        labelKey: 'stats.availability',
        icon: 'phone'
    },
    {
        value: '%100',
        labelKey: 'stats.satisfaction',
        icon: 'heart'
    }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        name: 'Ahmet Yılmaz',
        commentKey: 'testimonials.ahmet',
        rating: 5,
        date: '2024-11-15'
    },
    {
        name: 'Ayşe Demir',
        commentKey: 'testimonials.ayse',
        rating: 5,
        date: '2024-10-28'
    },
    {
        name: 'Mehmet Kaya',
        commentKey: 'testimonials.mehmet',
        rating: 4,
        date: '2024-09-12'
    }
];

export const SERVICE_AREAS = [
    'Adana Merkez',
    'Seyhan', 
    'Çukurova',
    'Yüreğir',
    'Sarıçam',
    'Karaisalı'
];

export const WORKING_HOURS = {
    weekdays: '08:00 - 20:00',
    saturday: '09:00 - 18:00',
    sunday: 'Acil Durumlar'
};

export const SOCIAL_MEDIA = {
    phone: '0501 581 9606',
    email: 'bayramtokmak810@gmail.com',
    whatsapp: '905015819606'
};

export const SEO_CONFIG = {
    title: `${FIRM_NAME} - Profesyonel Teknik Servis`,
    description: `${FIRM_SLOGAN}. Sıhhi tesisat, klima ve beyaz eşya tamiri, kurulumu ve taşımacılığı.`,
    keywords: ['teknik servis', 'sıhhi tesisat', 'klima tamiri', 'beyaz eşya', 'Adana'],
    author: FIRM_NAME
};

