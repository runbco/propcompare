import { PropertyData, PropertyFieldData, ImportanceRating, PropertyRating } from '../types/types';

// Generate a random integer between min and max (inclusive)
const generateRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random importance rating
const generateRandomImportance = (): ImportanceRating => {
  const values: ImportanceRating[] = ["Very important", "Somewhat important", "Not important"];
  return values[Math.floor(Math.random() * values.length)];
};

// Generate random property rating
const generateRandomRating = (): PropertyRating => {
  const values: PropertyRating[] = ["Excellent", "Good", "Acceptable", "Not good"];
  return values[Math.floor(Math.random() * values.length)];
};

// List of property fields to generate test data for
const propertyFields = [
  // Property Specific Information - Education
  'elementarySchoolDistance',
  'publicBoysHighSchoolDistance',
  'publicGirlsHighSchoolDistance',
  'privateBoysHighSchoolDistance',
  'privateGirlsHighSchoolDistance',
  'universityDistance',
  
  // Property Specific Information - Transport
  'publicTransportWalkingDistance',
  'shopsWalkingDistance',
  'shopsDrivingDistance',
  'hospitalWalkingDistance',
  'hospitalDrivingDistance',
  'cbdPublicTransportTime',
  'cbdDrivingTime',
  'workTravelCost',
  
  // Property Specific Information - Environment
  'floodingRisk',
  'fireRisk',
  'cycloneRisk',
  'infrastructureProjectsPlanned',
  'infrastructureProjectsTiming',
  'infrastructureProjectsType',
  
  // Block Information - Block Overview
  'propertyType',
  'buildYear',
  'depreciationYearsLeft',
  
  // Block Information - Block Financials
  'strataFundAmount',
  'strataFundPercentage',
  'adminFundAmount',
  'adminFundPercentage',
  'specialLevyRequired',
  'specialLevyAmount',
  'specialLevyPercentage',
  
  // Block Information - Land Size & Value
  'landSize',
  'landValue',
  'unitHouseSize',
  'unitHouseValue',
  
  // Block Information - Demographic
  'complexDemographic',
  'tenantCount',
  
  // Unit/House Information - Unit/House Financials
  'anticipatedWeeklyRent',
  'anticipatedYearlyRent',
  'councilRates',
  'waterCost',
  'landlordInsuranceCost',
  'propertyManagementFee',
  'otherMonthlyCosts',
  
  // Unit/House Information - Size & Features
  'floorLevel',
  'internalSize',
  'bedroomCount',
  'bathroomCount',
  'hasGarage',
  'garageSize',
  'hasParking',
  'hasBalcony',
  'balconySize',
  'totalSize',
  'suitableForKids',
  'suitableForPets',
  
  // Unit/House Information - Renovation/Upkeep
  'externalAreaSize',
  'needsGardener',
  'gardenerCost',
  'lastRenovationAge',
  'renovationDetails',
  'internalRenovationCost',
  'externalRenovationCost',
  'renovationCost1Year',
  'renovationCost5Years',
  'renovationCost10Years',
  
  // Unit/House Information - Growth Potential
  'similarPropertiesCount',
  'rentGrowth12Months',
  'rentGrowth24Months',
  'rentGrowth36Months',
  'valueGrowth12Months',
  'valueGrowth24Months',
  'valueGrowth36Months'
];

// Generate meaningful test data for specific fields
const generateFieldSpecificData = (field: string): string => {
  switch (field) {
    // Education fields
    case 'elementarySchoolDistance':
      return `${generateRandomValue(5, 15)} minutes`;
    case 'publicBoysHighSchoolDistance':
    case 'publicGirlsHighSchoolDistance':
    case 'privateBoysHighSchoolDistance':
    case 'privateGirlsHighSchoolDistance':
      return `${generateRandomValue(10, 30)} minutes`;
    case 'universityDistance':
      return `${generateRandomValue(15, 45)} minutes`;
      
    // Transport fields
    case 'publicTransportWalkingDistance':
    case 'shopsWalkingDistance':
      return `${generateRandomValue(5, 20)} minutes walk`;
    case 'shopsDrivingDistance':
      return `${generateRandomValue(5, 15)} minutes drive`;
    case 'hospitalWalkingDistance':
      return `${generateRandomValue(15, 30)} minutes walk`;
    case 'hospitalDrivingDistance':
      return `${generateRandomValue(5, 30)} minutes drive`;
    case 'cbdPublicTransportTime':
      return `${generateRandomValue(20, 60)} minutes`;
    case 'cbdDrivingTime':
      return `${generateRandomValue(15, 45)} minutes`;
    case 'workTravelCost':
      return `$${generateRandomValue(30, 100)} per week`;
      
    // Property specific fields
    case 'propertyType':
      return ['Apartment', 'House', 'Townhouse'][generateRandomValue(0, 2)];
    case 'buildYear':
      return generateRandomValue(1960, 2024).toString();
      
    // Add more specific cases as needed
    default:
      return `Test data for ${field}`;
  }
};

// Generate a set of test data for a property
export const generateTestData = (): Partial<PropertyData> => {
  const testData: Partial<PropertyData> = {
    financials: {}
  };

  // Generate random data for all property fields
  propertyFields.forEach(field => {
    testData[field] = {
      dataPoint: generateFieldSpecificData(field),
      importance: generateRandomImportance(),
      rating: generateRandomRating(),
      outcome: undefined
    } as PropertyFieldData;
  });

  // Generate a random price between 500,000 and 3,000,000
  const generateRandomPrice = () => Math.floor(Math.random() * (3000000 - 500000 + 1) + 500000);

  // Generate financial data
  if (testData.financials) {
    testData.financials.price = generateRandomPrice();
    testData.financials.askingPrice = generateRandomPrice();
    testData.financials.anticipatedSalesPrice = generateRandomPrice();
    
    // Generate last sold for price between 150,000 and 1,000,000
    testData.financials.lastSoldFor = generateRandomValue(150000, 1000000);
    
    // Generate rental income data
    testData.financials.weeklyRent = generateRandomValue(300, 1200);
    testData.financials.yearlyRentalIncrease = generateRandomValue(1, 10);
    
    // Calculate monthly and yearly rent
    if (testData.financials.weeklyRent) {
      testData.financials.monthlyRent = Number(((testData.financials.weeklyRent * 52) / 12).toFixed(2));
      testData.financials.yearlyRent = Number((testData.financials.weeklyRent * 52).toFixed(2));
    }
    
    // Calculate gross yield if both weekly rent and asking price exist
    if (testData.financials.weeklyRent && testData.financials.askingPrice) {
      const yearlyRent = testData.financials.weeklyRent * 52;
      testData.financials.grossYield = Number(((yearlyRent / testData.financials.askingPrice) * 100).toFixed(2));
    }
    
    // Generate random last sold date (MM/YYYY)
    const randomMonth = generateRandomValue(1, 12).toString().padStart(2, '0');
    const randomYear = generateRandomValue(1930, 2024);
    testData.financials.lastSoldDate = `${randomMonth}/${randomYear}`;
    
    // Calculate the differences if both askingPrice and lastSoldFor exist
    if (testData.financials.askingPrice && testData.financials.lastSoldFor) {
      // Calculate percentage difference
      testData.financials.guideToSoldPercentage = Number(
        ((testData.financials.lastSoldFor - testData.financials.askingPrice) / 
        testData.financials.askingPrice * 100).toFixed(2)
      );
      
      // Calculate dollar difference
      testData.financials.guideToSoldAmount = Number(
        (testData.financials.lastSoldFor - testData.financials.askingPrice).toFixed(2)
      );
    }
    
    // Generate Repayment & Cost Information data
    testData.financials.desiredDownpaymentPercentage = generateRandomValue(5, 30);
    testData.financials.downpaymentAUD = generateRandomValue(50000, 300000);
    testData.financials.lmi = generateRandomValue(3000, 25000);
    testData.financials.stampDuty = generateRandomValue(3000, 25000);
    testData.financials.buyersAgentFees = generateRandomValue(3000, 25000);
    testData.financials.solicitorFees = generateRandomValue(3000, 5000);
    testData.financials.interestRate = (generateRandomValue(30, 80) / 10).toFixed(1);
    testData.financials.mortgageTerm = generateRandomValue(5, 30);
    testData.financials.repaymentType = Math.random() < 0.5 ? "Principal and Interest" : "Interest Only";
    testData.financials.fee1 = generateRandomValue(0, 1000);
    testData.financials.fee2 = generateRandomValue(0, 1000);
    testData.financials.fee3 = generateRandomValue(0, 1000);
    
    // Calculate total upfront cost
    if (testData.financials.downpaymentAUD) {
      const fields = ['downpaymentAUD', 'lmi', 'stampDuty', 'buyersAgentFees', 'solicitorFees'];
      testData.financials.totalUpfrontCost = fields
        .map(field => Number(testData.financials![field]) || 0)
        .reduce((sum, val) => sum + val, 0);
    }
    
    // Generate ongoing costs data
    testData.financials.councilRate = generateRandomValue(300, 1000);
    testData.financials.water = generateRandomValue(200, 5000);
    
    // Randomly choose between strata or land tax
    if (Math.random() < 0.5) {
      testData.financials.strata = generateRandomValue(300, 2500);
      testData.financials.landTax = null;
    } else {
      testData.financials.strata = null;
      testData.financials.landTax = generateRandomValue(5000, 15000);
    }
    
    testData.financials.landlordInsurance = generateRandomValue(100, 500);
    testData.financials.propertyManagementFee = generateRandomValue(100, 500);
    testData.financials.averageOtherCosts = generateRandomValue(0, 1500);
    
    // Calculate total ongoing fees monthly
    const monthlyCouncilRate = (testData.financials.councilRate || 0) / 3;
    const monthlyWater = (testData.financials.water || 0) / 3;
    const monthlyStrata = (testData.financials.strata || 0) / 3;
    const monthlyLandTax = (testData.financials.landTax || 0) / 12;
    
    testData.financials.totalOngoingFeesMonthly = Number((
      monthlyCouncilRate +
      monthlyWater +
      monthlyStrata +
      monthlyLandTax +
      (testData.financials.landlordInsurance || 0) +
      (testData.financials.propertyManagementFee || 0) +
      (testData.financials.averageOtherCosts || 0)
    ).toFixed(2));
  }

  return testData;
};
