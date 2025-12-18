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
}

// --- Ana Yapılandırma ---
export const FIRM_NAME = 'UstaPlus Teknik';

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
  },
  {
    key: 'appliance',
    icon: 'Moon',
    durationKey: 'services.duration_short',
    priceKey: 'services.price_campaign',
    imageUrl: 'applience_repair.jpg',
  },
  {
    key: 'ac',
    icon: 'Wind',
    durationKey: 'services.duration_medium',
    priceKey: 'services.price_campaign',
    imageUrl: 'AC-repair.jpg',
  },
  {
    key: 'moving',
    icon: 'Truck',
    durationKey: 'services.duration_long',
    priceKey: 'services.price_campaign',
    imageUrl: 'appliance_installation.jpg',
  },
];


