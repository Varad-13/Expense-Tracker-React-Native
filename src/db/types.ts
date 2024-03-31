export interface Card {
    nickname: string;
    holderName: string;
    cardType: string;
    cardProvider: string;
    bankName: string;
    validity: string;
    cardNumber: string;
    CVV: string;
    limits: number;
  }
  
  export interface Bank {
    nickname: string;
    holderName: string;
    accountType: string;
    accountNumber: string;
    limits: number;
    balance: number;
  }
  
  export interface Account {
    id: number;
    cardNumber: string;
    holderName: string;
    accountNumber: string;
  }
  
  export interface Transaction {
    id: number;
    amount: number;
    timestamp: string;
    date: string;
    type: string;
    accountId: number;
    category: string;
  }
  