export interface LandingCategory {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  icon: string;
  mainSection: "food" | "drinks";
}

export interface PublicMenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  isFeatured: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  altAr: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  labelAr: string;
  href: string;
}
