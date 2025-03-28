// Define the structure for individual financial fields
export interface FinancialField {
  name: string;   // Unique identifier for the field
  type: string;   // Data type of the field (e.g., "number", "string")
  label: string;  // Human-readable label for the field
  calculated?: boolean;  // Whether this is a calculated field
  formula?: (data: FinancialData) => string | null;  // Formula for calculated fields
}

// Define the structure for financial data
export interface FinancialData {
  askingPrice?: number;
  lastSoldFor?: number;
  lastSoldDate?: string;
  weeklyRent?: number;
  monthlyRent?: number;
  yearlyRent?: number;
  yearlyRentalIncrease?: number;
  grossYield?: number;
  netYield?: number;
  desiredDownpaymentPercentage?: number;
  downpaymentAUD?: number;
  lmi?: number;
  stampDuty?: number;
  buyersAgentFees?: number;
  solicitorFees?: number;
  interestRate?: number;
  mortgageTerm?: number;
  repaymentType?: string;
  mortgageRepaymentsMonthly?: number;
  mortgageRepaymentsYearly?: number;
  mortgageTotal?: number;
  fee1?: number;
  fee2?: number;
  fee3?: number;
  totalUpfrontCost?: number;
  councilRate?: number;
  water?: number;
  strata?: number | null;
  landTax?: number | null;
  landlordInsurance?: number;
  propertyManagementFee?: number;
  averageOtherCosts?: number;
  totalOngoingFeesMonthly?: number;
  [key: string]: any;
}

// Define the structure for groups of financial fields
export interface FinancialGroup {
  name: string;             // Name of the financial group
  fields: FinancialField[]; // Array of financial fields in this group
}

// Define an array of financial groups with their respective fields
export const financialGroups: FinancialGroup[] = [
  {
    name: "Purchasing Information",
    fields: [
      // Basic property financial information
      { name: "price", type: "number", label: "Price" },
      { name: "askingPrice", type: "number", label: "Asking Price" },
      { name: "anticipatedSalesPrice", type: "number", label: "Anticipated Sales Price" },
      { name: "lastSoldFor", type: "number", label: "Last sold for (in $)" },
      { name: "lastSoldDate", type: "string", label: "Last sold (date)" },
      { 
        name: "guideToSoldPercentage", 
        type: "number", 
        label: "Difference between Guide and Sold (%)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.askingPrice || !data.lastSoldFor) return null;
          return ((data.lastSoldFor - data.askingPrice) / data.askingPrice * 100).toFixed(2);
        }
      },
      {
        name: "guideToSoldAmount",
        type: "number",
        label: "Difference between Guide and Sold ($)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.askingPrice || !data.lastSoldFor) return null;
          return (data.lastSoldFor - data.askingPrice).toFixed(2);
        }
      },
      // Add other fields as needed for property financial information
    ]
  },
  {
    name: "Purchase Costs",
    fields: [
      { name: "desiredDownpaymentPercentage", type: "number", label: "Desired downpayment %" },
      { name: "downpaymentAUD", type: "number", label: "Downpayment in AUD" },
      { name: "lmi", type: "number", label: "LMI" },
      { name: "stampDuty", type: "number", label: "Stamp Duty" },
      { name: "buyersAgentFees", type: "number", label: "Buyers Agent Fees (one Off)" },
      { name: "solicitorFees", type: "number", label: "Solicitor Fees (One Off)" },
      { name: "interestRate", type: "number", label: "Interest rate" },
      { name: "mortgageTerm", type: "number", label: "Mortage term (years)" },
      { name: "repaymentType", type: "string", label: "Repay Interest Or Principal and Interest" },
      { 
        name: "mortgageRepaymentsMonthly", 
        type: "number", 
        label: "Mortage Repayments (monthly)",
        calculated: true,
        formula: (data: FinancialData) => {
          // TODO: Implement mortgage repayment calculation
          return null;
        }
      },
      { 
        name: "mortgageRepaymentsYearly", 
        type: "number", 
        label: "Mortage Repayments (yearly)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.mortgageRepaymentsMonthly) return null;
          return (data.mortgageRepaymentsMonthly * 12).toFixed(2);
        }
      },
      { 
        name: "mortgageTotal", 
        type: "number", 
        label: "Mortage total",
        calculated: true,
        formula: (data: FinancialData) => {
          // TODO: Implement total mortgage calculation
          return null;
        }
      },
      { name: "fee1", type: "number", label: "Fee 1 - One Off" },
      { name: "fee2", type: "number", label: "Fee 2 - One Off" },
      { name: "fee3", type: "number", label: "Fee 3 - One Off" },
      { 
        name: "totalUpfrontCost", 
        type: "number", 
        label: "Total Upfront Cost",
        calculated: true,
        formula: (data: FinancialData) => {
          const fields = ['downpaymentAUD', 'lmi', 'stampDuty', 'buyersAgentFees', 'solicitorFees'];
          const values = fields.map(field => data[field] || 0);
          return values.reduce((sum, val) => sum + val, 0).toFixed(2);
        }
      }
    ]
  },
  {
    name: "Ongoing Costs",
    fields: [
      { name: "councilRate", type: "number", label: "Council rate (Per quater)" },
      { name: "water", type: "number", label: "Water (Per quater)" },
      { name: "strata", type: "number", label: "Strata (Per quater)" },
      { name: "landTax", type: "number", label: "LandTax (yearly)" },
      { name: "landlordInsurance", type: "number", label: "Landlord Insurance (per Month)" },
      { name: "propertyManagementFee", type: "number", label: "Property Management Fee (per Month)" },
      { name: "averageOtherCosts", type: "number", label: "Average Other Costs e.g. repairs (per Month)" },
      { 
        name: "totalOngoingFeesMonthly", 
        type: "number", 
        label: "Total ongoing fees (Monthly)",
        calculated: true,
        formula: (data: FinancialData) => {
          const monthlyCouncilRate = (data.councilRate || 0) / 3;
          const monthlyWater = (data.water || 0) / 3;
          const monthlyStrata = (data.strata || 0) / 3;
          const monthlyLandTax = (data.landTax || 0) / 12;
          const landlordInsurance = data.landlordInsurance || 0;
          const propertyManagementFee = data.propertyManagementFee || 0;
          const averageOtherCosts = data.averageOtherCosts || 0;
          
          return (
            monthlyCouncilRate +
            monthlyWater +
            monthlyStrata +
            monthlyLandTax +
            landlordInsurance +
            propertyManagementFee +
            averageOtherCosts
          ).toFixed(2);
        }
      }
    ]
  },
  {
    name: "Income Information",
    fields: [
      { name: "weeklyRent", type: "number", label: "Weekly Rent (Gross in $)" },
      { 
        name: "monthlyRent", 
        type: "number", 
        label: "Monthly Rent (Gross in $)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.weeklyRent) return null;
          return ((data.weeklyRent * 52) / 12).toFixed(2);
        }
      },
      { 
        name: "yearlyRent", 
        type: "number", 
        label: "Yearly Rent (Gross in $)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.weeklyRent) return null;
          return (data.weeklyRent * 52).toFixed(2);
        }
      },
      { name: "yearlyRentalIncrease", type: "number", label: "Yearly Rental increase (in %)" },
      { 
        name: "grossYield", 
        type: "number", 
        label: "Gross Yield in % (based on Asking Price)",
        calculated: true,
        formula: (data: FinancialData) => {
          if (!data.weeklyRent || !data.askingPrice) return null;
          const yearlyRent = data.weeklyRent * 52;
          return ((yearlyRent / data.askingPrice) * 100).toFixed(2);
        }
      },
      { 
        name: "netYield", 
        type: "number", 
        label: "Net Yield in % based on Asking Price*",
        calculated: true,
        formula: (data: FinancialData) => {
          // TODO: Implement net yield calculation when requirements are provided
          return null;
        }
      }
    ]
  }
];

// Note: This structure allows for easy expansion of financial groups and fields.
// It can be used to dynamically generate forms, calculate financial metrics,
// or organize property-related financial data in a consistent manner.
