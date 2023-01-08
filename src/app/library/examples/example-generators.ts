import { User, Personal, ContactInfo, Address, Transaction } from "./models";
import { Profile } from "./profile";
import { Teller } from "./teller";

export function createDefaultExamples(): {
    user: User;
    personal: Personal;
    contactInfo: ContactInfo;
    address: Address;
    transaction: Transaction;
} {
    const user: User = {
        id: '1',
        personal: null,
        contactInfo: null,
        address: null
    };

    const personal: Personal = {
        firstName: 'John',
        lastName: 'Doe',
        user: user
    };

    const contactInfo: ContactInfo = {
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: null,
        user: user
    };

    const address: Address = {
        street: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        zipCode: '12345',
        contactInfo: contactInfo,
        user: user
    };

    const transaction: Transaction = {
        id: 1,
        amount: 100,
        user: user
    };

    user.personal = personal;
    user.contactInfo = contactInfo;
    user.address = address;
    contactInfo.address = address;

    return {
        user: {
            ...user,
            personal,
            contactInfo,
            address
        },
        personal,
        contactInfo,
        address,
        transaction
    };

}

export function createExampleUser(): User {
    return createDefaultExamples().user;
}

export function createExamplePersonal(): Personal {
    return createDefaultExamples().personal;
}

export function createExampleContactInfo(): ContactInfo {
    return createDefaultExamples().contactInfo;
}

export function createExampleAddress(): Address {
    return createDefaultExamples().address;
}

export function createExampleTransaction(): Transaction {
    return createDefaultExamples().transaction;
}

export function createExampleTeller(): Teller {
    return new Teller();
}

export function createExampleProfile(): Profile {
    const examples = createDefaultExamples();
    const teller = new Teller();

    return new Profile('1', examples.user, teller, 5);
}