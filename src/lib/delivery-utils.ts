export interface DeliveryZone {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: number;
}

// Comprehensive list of delivery zones
export const deliveryZones: DeliveryZone[] = [
  // Maharashtra
  { pincode: "400001", city: "Mumbai", state: "Maharashtra", deliveryDays: 2 },
  { pincode: "400002", city: "Mumbai", state: "Maharashtra", deliveryDays: 2 },
  { pincode: "400003", city: "Mumbai", state: "Maharashtra", deliveryDays: 2 },
  { pincode: "411001", city: "Pune", state: "Maharashtra", deliveryDays: 1 },
  { pincode: "411002", city: "Pune", state: "Maharashtra", deliveryDays: 1 },
  { pincode: "411003", city: "Pune", state: "Maharashtra", deliveryDays: 1 },
  { pincode: "440001", city: "Nagpur", state: "Maharashtra", deliveryDays: 3 },
  { pincode: "440002", city: "Nagpur", state: "Maharashtra", deliveryDays: 3 },
  
  // Delhi
  { pincode: "110001", city: "New Delhi", state: "Delhi", deliveryDays: 2 },
  { pincode: "110002", city: "New Delhi", state: "Delhi", deliveryDays: 2 },
  { pincode: "110003", city: "New Delhi", state: "Delhi", deliveryDays: 2 },
  { pincode: "110020", city: "New Delhi", state: "Delhi", deliveryDays: 2 },
  
  // Karnataka
  { pincode: "560001", city: "Bangalore", state: "Karnataka", deliveryDays: 3 },
  { pincode: "560002", city: "Bangalore", state: "Karnataka", deliveryDays: 3 },
  { pincode: "560003", city: "Bangalore", state: "Karnataka", deliveryDays: 3 },
  { pincode: "580001", city: "Mysore", state: "Karnataka", deliveryDays: 4 },
  { pincode: "580002", city: "Mysore", state: "Karnataka", deliveryDays: 4 },
  
  // Tamil Nadu
  { pincode: "600001", city: "Chennai", state: "Tamil Nadu", deliveryDays: 3 },
  { pincode: "600002", city: "Chennai", state: "Tamil Nadu", deliveryDays: 3 },
  { pincode: "600003", city: "Chennai", state: "Tamil Nadu", deliveryDays: 3 },
  { pincode: "625001", city: "Madurai", state: "Tamil Nadu", deliveryDays: 4 },
  { pincode: "625002", city: "Madurai", state: "Tamil Nadu", deliveryDays: 4 },
  
  // Gujarat
  { pincode: "380001", city: "Ahmedabad", state: "Gujarat", deliveryDays: 3 },
  { pincode: "380002", city: "Ahmedabad", state: "Gujarat", deliveryDays: 3 },
  { pincode: "380003", city: "Ahmedabad", state: "Gujarat", deliveryDays: 3 },
  { pincode: "390001", city: "Vadodara", state: "Gujarat", deliveryDays: 4 },
  { pincode: "390002", city: "Vadodara", state: "Gujarat", deliveryDays: 4 },
  
  // Uttar Pradesh
  { pincode: "226001", city: "Lucknow", state: "Uttar Pradesh", deliveryDays: 4 },
  { pincode: "226002", city: "Lucknow", state: "Uttar Pradesh", deliveryDays: 4 },
  { pincode: "221001", city: "Varanasi", state: "Uttar Pradesh", deliveryDays: 5 },
  { pincode: "221002", city: "Varanasi", state: "Uttar Pradesh", deliveryDays: 5 },
  
  // West Bengal
  { pincode: "700001", city: "Kolkata", state: "West Bengal", deliveryDays: 4 },
  { pincode: "700002", city: "Kolkata", state: "West Bengal", deliveryDays: 4 },
  { pincode: "700003", city: "Kolkata", state: "West Bengal", deliveryDays: 4 },
  
  // Telangana
  { pincode: "500001", city: "Hyderabad", state: "Telangana", deliveryDays: 3 },
  { pincode: "500002", city: "Hyderabad", state: "Telangana", deliveryDays: 3 },
  { pincode: "500003", city: "Hyderabad", state: "Telangana", deliveryDays: 3 },
  
  // Rajasthan
  { pincode: "302001", city: "Jaipur", state: "Rajasthan", deliveryDays: 4 },
  { pincode: "302002", city: "Jaipur", state: "Rajasthan", deliveryDays: 4 },
  { pincode: "313001", city: "Udaipur", state: "Rajasthan", deliveryDays: 5 },
  { pincode: "313002", city: "Udaipur", state: "Rajasthan", deliveryDays: 5 },

  // Punjab
  { pincode: "160001", city: "Chandigarh", state: "Punjab", deliveryDays: 4 },
  { pincode: "160002", city: "Chandigarh", state: "Punjab", deliveryDays: 4 },
  { pincode: "141001", city: "Ludhiana", state: "Punjab", deliveryDays: 5 },
  { pincode: "141002", city: "Ludhiana", state: "Punjab", deliveryDays: 5 },

  // Madhya Pradesh
  { pincode: "462001", city: "Bhopal", state: "Madhya Pradesh", deliveryDays: 4 },
  { pincode: "462002", city: "Bhopal", state: "Madhya Pradesh", deliveryDays: 4 },
  { pincode: "452001", city: "Indore", state: "Madhya Pradesh", deliveryDays: 4 },
  { pincode: "452002", city: "Indore", state: "Madhya Pradesh", deliveryDays: 4 },

  // Bihar
  { pincode: "800001", city: "Patna", state: "Bihar", deliveryDays: 5 },
  { pincode: "800002", city: "Patna", state: "Bihar", deliveryDays: 5 },
  { pincode: "846001", city: "Gaya", state: "Bihar", deliveryDays: 6 },
  { pincode: "846002", city: "Gaya", state: "Bihar", deliveryDays: 6 },

  // Kerala
  { pincode: "695001", city: "Thiruvananthapuram", state: "Kerala", deliveryDays: 4 },
  { pincode: "695002", city: "Thiruvananthapuram", state: "Kerala", deliveryDays: 4 },
  { pincode: "682001", city: "Kochi", state: "Kerala", deliveryDays: 4 },
  { pincode: "682002", city: "Kochi", state: "Kerala", deliveryDays: 4 },

  // Assam
  { pincode: "781001", city: "Guwahati", state: "Assam", deliveryDays: 6 },
  { pincode: "781002", city: "Guwahati", state: "Assam", deliveryDays: 6 },
  { pincode: "785001", city: "Dibrugarh", state: "Assam", deliveryDays: 7 },
  { pincode: "785002", city: "Dibrugarh", state: "Assam", deliveryDays: 7 },

  // Odisha
  { pincode: "751001", city: "Bhubaneswar", state: "Odisha", deliveryDays: 5 },
  { pincode: "751002", city: "Bhubaneswar", state: "Odisha", deliveryDays: 5 },
  { pincode: "753001", city: "Cuttack", state: "Odisha", deliveryDays: 5 },
  { pincode: "753002", city: "Cuttack", state: "Odisha", deliveryDays: 5 },

  // Generate more pincodes for each major city with incremental numbers
  ...Array.from({ length: 20 }, (_, i) => ({
    pincode: `400${String(i + 10).padStart(3, '0')}`,
    city: "Mumbai",
    state: "Maharashtra",
    deliveryDays: 2
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    pincode: `110${String(i + 30).padStart(3, '0')}`,
    city: "New Delhi",
    state: "Delhi",
    deliveryDays: 2
  }))
];

// Check if delivery is available for a pincode
export const checkDeliveryAvailability = (pincode: string): DeliveryZone | null => {
  return deliveryZones.find(zone => zone.pincode === pincode) || null;
};

// Get unique states
export const getStates = (): string[] => {
  return Array.from(new Set(deliveryZones.map(zone => zone.state))).sort();
};

// Get cities for a state
export const getCitiesForState = (state: string): string[] => {
  return Array.from(
    new Set(
      deliveryZones
        .filter(zone => zone.state === state)
        .map(zone => zone.city)
    )
  ).sort();
};

// Promo codes (in a real app, this would come from an API)
export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
}

export const promoCodes: PromoCode[] = [
  {
    code: 'FIRST20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 1000,
    maxDiscount: 500
  },
  {
    code: 'FLAT200',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 1500
  },
  {
    code: 'SUMMER25',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 2000,
    maxDiscount: 750
  }
];

// Validate and calculate promo code discount
export const validatePromoCode = (
  code: string,
  subtotal: number
): { isValid: boolean; discount: number; message: string } => {
  const promoCode = promoCodes.find(p => p.code === code.toUpperCase());
  
  if (!promoCode) {
    return {
      isValid: false,
      discount: 0,
      message: 'Invalid promo code'
    };
  }

  if (promoCode.minOrderValue && subtotal < promoCode.minOrderValue) {
    return {
      isValid: false,
      discount: 0,
      message: `Minimum order value of ₹${promoCode.minOrderValue} required`
    };
  }

  let discount = promoCode.discountType === 'percentage'
    ? (subtotal * promoCode.discountValue) / 100
    : promoCode.discountValue;

  if (promoCode.maxDiscount) {
    discount = Math.min(discount, promoCode.maxDiscount);
  }

  return {
    isValid: true,
    discount,
    message: `${promoCode.discountType === 'percentage' ? promoCode.discountValue + '% off' : 'Flat ₹' + promoCode.discountValue + ' off'} applied successfully!`
  };
};