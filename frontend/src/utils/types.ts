export type User = {
  firstName: string;
  lastName: string;
  email: string;
  wallet: number;
  phoneNumber: string;
  role: string;
  joinDate: string;
};
export type userInitialState = {
  user: User | null;
  isLoading: boolean;
  verifyLoading: boolean;
  otpCodeSent: string;
  showSideBar: boolean;
  succesMsg: string;
  errorMsg: string;
  password: string;
  email: string;
  newPassword: string;
  otp: string;
};

export type fetchCableResult = {
  variation_code: string;
  name: string;
  variation_amount: string;
  fixedPrice: string;
};

export type dataInitialState = {
  provider: string;
  dataProviderArr: string[] | [];
  dataPlans: string[] | [];
  subCategoryId: number;
  selectedPlan: string;
  examType: string;
  resultType: string;
  resultTypeArr: string[] | [];
  isLoading: boolean;
  localLoading: boolean;
  phoneNumber: string;
  amount: number | string;
  charge: number;
  error: string;
  ported: string;
};

export type buyDataProps = {
  phoneNumber: string;
  amount: string | number;
  provider: string;
  selectedPlan: string;
  subCategoryId: number;
  ported: string;
};
export type fetchDataResult = {
  category: string;
  plan: string[];
  status: number;
  subcategory_id: number;
  title: string;
};
export type registerData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export type payElectricBillProps = {
  electricProvider: string;
  electricProviderType: string;
  amount: number;
  phoneNumber: string;
  meterNumber: string;
  charge: number;
};
export type payCableBillProps = {
  cable: string;
  smartCardNumber: string;
  amount: number;
  phoneNumber: string;
  cableVariationCode: string;
  charge: number;
};

export type fetchAirtimeResult = {
  subcategory_id: number;
  title: string;
  category: string;
  status: number;
};

export type purchaseAirtimeProps = {
  subcategory_id: number;
  amount: number;
  charge: number;
  phoneNumber: string;
  provider: string;
  ported: string;
};

export type verifyUserProps = {
  email: string;
  token: string;
};

export type accountFetchResult = {
  account_number: string;
  bank_name: string;
  expiresIn: string;
  createdAt: string;
  txRef: string;
  amount: number;
};
export type transactionStatusResult = {
  status: string;
  amount: string;
  walletBalance: number;
};

export type statsResult = {
  userCount: number;
  transactionCount: number;
  pendingTransaction: number;
  successfulTransaction: number;
  successfulPayment: number;
  expirePayment: number;
};
export type transactionsResult = {
  trx_id: string;
  user: string;
  amount: number;
  status: string;
  verifiedvia: string | null;
  createdAt: string;
  paymentMethod: string;
  description: string;
  type: string;
};
