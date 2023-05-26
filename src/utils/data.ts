type MenuItemType = {
    title: string;
    children: MenuItemChildrenTypeType[];
};
type MenuItemChildrenTypeType = {
    title: string;
    icon: string;
    path?: string;
};

type UsersStatsType = {
    icon: string;
    title: string;
    value: string;
};

export const menuItems: MenuItemType[] = [
    {
        title: "CUSTOMERS",
        children: [
            { title: "Users", icon: "icons/user-friends 1.png", path: "/users" },
            { title: "Guarantors", icon: "icons/users 1.png" },
            { title: "Loans", icon: "icons/sack 1.png" },
            { title: "Decision Models", icon: "icons/handshake-regular 1.png" },
            { title: "Savings", icon: "icons/piggy-bank 1.png" },
            { title: "Loan Requests", icon: "icons/hand money.png" },
            { title: "Whitelist", icon: "icons/user-check 1.png" },
            { title: "Karma", icon: "icons/user-times 1.png" },
        ],
    },
    {
        title: "BUSINESSES",
        children: [
            { title: "Organization", icon: "icons/briefcase 1.png" },
            { title: "Loan Products", icon: "icons/hand money.png" },
            { title: "Savings Products", icon: "icons/np_bank.png" },
            { title: "Fees and Charges", icon: "icons/coins-solid 1.png" },
            { title: "Savings", icon: "icons/piggy-bank 1.png" },
            { title: "Transactions", icon: "icons/icon.png" },
            { title: "Services", icon: "icons/galaxy 1.png" },
            { title: "Service Account", icon: "icons/user-cog 1.png" },
            { title: "Settlements", icon: "icons/scroll 1.png" },
            { title: "Reports", icon: "icons/chart-bar 2.png" },
        ],
    },
    {
        title: "SETTINGS",
        children: [
            { title: "Preferences", icon: "icons/sliders-h 1.png" },
            { title: "Fees and Pricing", icon: "icons/badge-percent 1.png" },
            { title: "Audit Logs", icon: "icons/clipboard-list 1.png" },
            { title: "Systems Messages", icon: "icons/tire 1.png" },
        ],
    },
];

export const userStats: UsersStatsType[] = [
    { title: "Users", icon: "icons/p_users.png", value: "2,453" },
    { title: "Active Users", icon: "icons/b_users.png", value: "2,453" },
    { title: "Users with Loans", icon: "icons/inventory.png", value: "12,453" },
    { title: "Users with Savings", icon: "icons/coins.png", value: "102,453" },
];

type TableDropDownType = {
    name: string;
    placeHolder?: string;
    icon?: string;
};

export const tableDropDown: TableDropDownType[] = [
    { name: "Organization", placeHolder: "Select ", icon: "icons/dropdown.png" },
    { name: "Username", placeHolder: "User" },
    { name: "Email", placeHolder: "Email " },
    { name: "Date", placeHolder: "Date ", icon: "icons/Calendar.png" },
    { name: "Phone Number", placeHolder: "Phone Number " },
    { name: "Status", placeHolder: "Select ", icon: "icons/dropdown.png" },
];
