export interface ProductTypes {
  _id: string;
  name: string;
  slug: string;
  price: number;
  offerPrice: number;
  image: string[];
  stock: number;
  description: string[];
  quantity?: number;
  ratings: number;
  isOrganic: boolean;
  createdAt: string;
  reviewCount: number;
  discount: number;
  unit: string;
  category: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: AddressType[];
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressType {
  _id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  lat: number;
  lng: number;
}

export interface CategoryType {
  slug: string;
  text: string;
  Image: string;
}

export interface CartItemType {
  product: ProductTypes;
  quantity: number;
}

export interface OrderItemType {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface DeliveryPartnerType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  vehicleType: "bike" | "scooter" | "car";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderType {
  _id: string;
  user: string | { _id: string; name: string; email: string; phone?: string };
  items: OrderItemType[];
  shippingAddress: Omit<AddressType, "_id" | "isDefault">;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: string;
  statusHistory: { status: string; timestamp: string; note: string }[];
  deliveryPartner: DeliveryPartnerType | null;
  deliveryOtp: string;
  isPaid: boolean;
  createdAt: string;
}
