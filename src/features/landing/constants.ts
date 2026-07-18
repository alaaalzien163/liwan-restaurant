export const LANDING_NAV_LINKS = [
  { label: "Home", labelAr: "الرئيسية", href: "#home" },
  { label: "About", labelAr: "عن المطعم", href: "#about" },
  { label: "Menu", labelAr: "القائمة", href: "#menu" },
  { label: "Contact", labelAr: "اتصل بنا", href: "#contact" },
] as const;

export const CONTACT_INFO = {
  phone: "0991660966 , 0941100098",
  phoneDisplay: "0991660966 \n , 0941100098",
  phoneNumbers: [
    { number: "0991660966", display: "0991660966" },
    { number: "0941100098", display: "0941100098" },
  ],
  email: "info@liwanrestaurant.com",
  address: "حلب ، تجميل الخالدية آخر طلعة سلورة",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/liwan_rest/",
  whatsapp: "https://wa.me/963991660966",
  facebook: "https://www.facebook.com/share/1BgYToKRDM/?mibextid=wwXIfr",
};

export const WHATSAPP_REVIEW_NUMBER = "963991660966";

export const LANDING_QUERY_KEYS = {
  categories: ["landing", "categories"],
  menuItems: ["landing", "menu-items"],
};
