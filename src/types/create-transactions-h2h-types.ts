// Types for billing address
export interface BillingAddress {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
    email: string;
    externalUserId: string;
    dateOfBirth: string;
  }
  
  export interface CardBrowserInfo {
    colorDepth: number;
    userAgent: string;
    language: string;
    timeZone: string;
    screenWidth: number;
    javaEnabled: boolean;
    customerIp: string;
    screenHeight: number;
    windowHeight: number;
    timeZoneOffset: number;
    windowWidth: number;
  }
  
  export interface CardData {
    cardNumber: string;
    cardHolderName: string;
    cardExpiryDate: string;
    cardExpiryDate2: string;
    cardCvv: string;
    browser: CardBrowserInfo;
  }
  
  export interface TransactionBodyH2H {
    amount: number;
    currency: string;
    lang: string;
    hookUrl: string;
    callback: string;
    callbackFail: string;
    billing: BillingAddress;
    orderId: string;
    cardToken: string;
    payment3dsType: string;
    kycVerified: boolean;
    previousPaymentCount: number;
    cardData: CardData;
    saveCard: boolean;
  }
  