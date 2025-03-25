
export type TransactionBodyV2 = {
    amount:number;
    currency:string;
    hookUrl:string;
    callback:string;
    callbackFail:string;
    billing: Billing;
    lang?:string;
    orderId?:string;
    cardToken?:string;
    paymentHistory?:any;

}



type Billing = {
    firstName:string;
    lastName:string;
    address1:string;
    city:string;
    state:string;
    country:string;
    postalCode:string;
    phone:string;
    email:string;
    externalUserId?:string

}


 export type TransactionResponseV2 = {

        "paymentId": string;
        "paymentUrl": string
        "paymentUrlIframe": string;
        "paymentUrlIframeApm": string;

}

