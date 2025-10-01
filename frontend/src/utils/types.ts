export type User = {
  firstName: string;
  lastName: string;
  email: string;
  wallet: string;
};
export type userInitialState = {
  user: User | null;
  isLoading: boolean;
  showSideBar: boolean;
  succesMsg: string;
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
  phoneNumber: string;
  amount: number | string;
  charge: number;
  error: string;
};

export type buyDataProps = {
  phoneNumber: string;
  amount: string | number;
  provider: string;
  selectedPlan: string;
  subCategoryId: number;
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
};

export type verifyUserProps = {
  email: string;
  token: string;
};
