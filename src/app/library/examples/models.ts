export interface User {
    id?: string;
    personal: Personal;
    contactInfo: ContactInfo;
    address: Address;
}

export interface Personal {
    id?: string;
    firstName: string;
    lastName: string;
    user: User;
}

export interface ContactInfo {
    id?: string;
    email: string;
    phone?: string;
    address?: Address;
    user: User;
}

export interface Address {
    id?: string;
    street: string;
    city: string;
    state: string;
    zipCode?: string;
    contactInfo?: ContactInfo;
    user: User;
}

export interface Transaction {
    id?: number;
    amount: number;
    user: User;
}