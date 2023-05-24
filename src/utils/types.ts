export type UserType = {
    createdAt: string;
    orgName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    lastActiveDate: string;
    profile: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        avatar: string;
        gender: "Male" | "Female";
        bvn: string;
        address: string;
        currency: "NGN" | "USD";
    };
    guarantor: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: "Male" | "Female";
        address: string;
    };
    accountBalance: string;
    accountNumber: string;
    socials: {
        facebook: string;
        instagram: string;
        twitter: string;
    };
    education: {
        level: string;
        employmentStatus: string;
        sector: string;
        duration: string;
        officeEmail: string;
        monthlyIncome: string[];
        loanRepayment: string;
    };
    id: "1";
};
