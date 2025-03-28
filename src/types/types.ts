// Define custom types for importance and property ratings
export type ImportanceRating = "Very important" | "Somewhat important" | "Not important";
export type PropertyRating = "Excellent" | "Good" | "Acceptable" | "Not good";

// Interface for individual property field data
export interface PropertyFieldData {
  dataPoint: string;
  importance: ImportanceRating;
  rating: PropertyRating;
  outcome?: number;
}

// Interface for the entire property data structure
export interface PropertyData {
  [key: string]: PropertyFieldData | any;
  financials: {
    [key: string]: any;
    soldFor?: number;
    guideToSoldPercentage?: number;
    guideToSoldAmount?: number;
  };
}

// Interface for subgroups within property groups
export interface SubGroup {
  name: string;
  fields: Array<{
    id: string;
    label: string;
  }>;
}

// Interface for property groups, containing subgroups
export interface PropertyGroup {
  name: string;
  subGroups: SubGroup[];
}

// Define the structure of property groups and their subgroups
export const propertyGroups: PropertyGroup[] = [
  {
    name: "Property Specific Information",
    subGroups: [
      {
        name: "Education",
        fields: [
          { id: "elementarySchoolDistance", label: "Elementary School in 15min driving distance (in min)" },
          { id: "publicBoysHighSchoolDistance", label: "Public High School (Boys) in 30 min distance w. public transport" },
          { id: "publicGirlsHighSchoolDistance", label: "Public High School (Girls) in 30 min distance w. public transport" },
          { id: "privateBoysHighSchoolDistance", label: "Private High School (Boys) in 30 min distance w. public transport" },
          { id: "privateGirlsHighSchoolDistance", label: "Private High School (Girls) in 30 min distance w. public transport" },
          { id: "universityDistance", label: "University in 30 min distance w. public transport" }
        ]
      },
      {
        name: "Transport",
        fields: [
          { id: "publicTransportWalkingDistance", label: "Public transport in 20 min walking distance" },
          { id: "shopsWalkingDistance", label: "Shops in 20 min walkig distance" },
          { id: "shopsDrivingDistance", label: "Shops in 15 min driving distance" },
          { id: "hospitalWalkingDistance", label: "Hospital in 30 min walkig distance" },
          { id: "hospitalDrivingDistance", label: "Hospital in 30 min driving distance" },
          { id: "cbdPublicTransportTime", label: "Time to CBD - Public Transport" },
          { id: "cbdDrivingTime", label: "Time to CBD - driving" },
          { id: "workTravelCost", label: "Cost to travel to work (CBD)" }
        ]
      },
      {
        name: "Environment",
        fields: [
          { id: "floodingRisk", label: "Prone to weather events (flooding)" },
          { id: "fireRisk", label: "Prone to weather events (fire)" },
          { id: "cycloneRisk", label: "Prone to weather events (cyclone)" },
          { id: "infrastructureProjectsPlanned", label: "Infrastructure projects planned (Y/N)" },
          { id: "infrastructureProjectsTiming", label: "Infrastructure projects planned (when)" },
          { id: "infrastructureProjectsType", label: "Infrastructure projects planned (What)" }
        ]
      }
    ]
  },
  {
    name: "Block Information",
    subGroups: [
      {
        name: "Block Overview",
        fields: [
          { id: "propertyType", label: "Property Type" },
          { id: "buildYear", label: "Build Year" },
          { id: "depreciationYearsLeft", label: "Depeciciation (years left)" }
        ]
      },
      {
        name: "Block Financials (Available)",
        fields: [
          { id: "strataFundAmount", label: "Strata Fund (in $)" },
          { id: "strataFundPercentage", label: "Strata Fund (in % to property value)" },
          { id: "adminFundAmount", label: "Admin Fund (in $)" },
          { id: "adminFundPercentage", label: "Admin Fund (in % to property value)" },
          { id: "specialLevyRequired", label: "Special Levy payable (Y/N)" },
          { id: "specialLevyAmount", label: "Special Levy payable (in $)" },
          { id: "specialLevyPercentage", label: "Special Levy payable (in % to property value)" }
        ]
      },
      {
        name: "Land Size & Value",
        fields: [
          { id: "landSize", label: "Land Size (Sqm)" },
          { id: "landValue", label: "Land Value" },
          { id: "unitHouseSize", label: "Unit/House Size" },
          { id: "unitHouseValue", label: "Unit/House Value" }
        ]
      },
      {
        name: "Demographic",
        fields: [
          { id: "complexDemographic", label: "Appartmet complex / Street demographic" },
          { id: "tenantCount", label: "Number of tenants  in Complex (Only Applicable if it is a  Unit or Townhouse)" }
        ]
      }
    ]
  },
  {
    name: "Unit/House Information",
    subGroups: [
      {
        name: "Unit/House Financials",
        fields: [
          { id: "anticipatedWeeklyRent", label: "(Anticipated) Weekly Rent" },
          { id: "anticipatedYearlyRent", label: "(Anticipated) Yearly Rent" },
          { id: "councilRates", label: "Council rates" },
          { id: "waterCost", label: "Water (in $AUD per Month)" },
          { id: "landlordInsuranceCost", label: "Landlord Insurance (in $AUD per Month)" },
          { id: "propertyManagementFee", label: "Property Management Fee" },
          { id: "otherMonthlyCosts", label: "Other Costs  (in $AUD per Month)" }
        ]
      },
      {
        name: "Unit/House Size & Features",
        fields: [
          { id: "floorLevel", label: "Floor" },
          { id: "internalSize", label: "Internal Size" },
          { id: "bedroomCount", label: "No Of Bedrooms" },
          { id: "bathroomCount", label: "No Of Bathrooms" },
          { id: "hasGarage", label: "Has Garage (Y/N)" },
          { id: "garageSize", label: "Garage Size" },
          { id: "hasParking", label: "Has parking (Y/N)" },
          { id: "hasBalcony", label: "Has Balcony (Y/N)" },
          { id: "balconySize", label: "Balcony Size" },
          { id: "totalSize", label: "Total Size" },
          { id: "suitableForKids", label: "Suitable for Kids (Y/N)" },
          { id: "suitableForPets", label: "Suitable for pets (Y/N)" }
        ]
      },
      {
        name: "Renovation/Upkeep",
        fields: [
          { id: "externalAreaSize", label: "External Area Small/Medium/Large" },
          { id: "needsGardener", label: "Needs Gardener" },
          { id: "gardenerCost", label: "Cost for Garnener" },
          { id: "lastRenovationAge", label: "Last renovation done (in Years)" },
          { id: "renovationDetails", label: "What was renovated" },
          { id: "internalRenovationCost", label: "Cost For Renovations - Internal" },
          { id: "externalRenovationCost", label: "Cost For Renovations - External" },
          { id: "renovationCost1Year", label: "Cost for renovation in 1 years" },
          { id: "renovationCost5Years", label: "Cost for renovation in 5 years" },
          { id: "renovationCost10Years", label: "Cost for renovation in 10 years" }
        ]
      },
      {
        name: "Growth Potential",
        fields: [
          { id: "similarPropertiesCount", label: "No of similar properties size,location quality (renovated)" },
          { id: "rentGrowth12Months", label: "Rent growth in last 12 months" },
          { id: "rentGrowth24Months", label: "Rent growth in last 24 months" },
          { id: "rentGrowth36Months", label: "Rent growth in last 36 months" },
          { id: "valueGrowth12Months", label: "Value Growth last 12 Month" },
          { id: "valueGrowth24Months", label: "Value Growth last 24 Month" },
          { id: "valueGrowth36Months", label: "Value Growth last 36 Month" }
        ]
      }
    ]
  }
];

// Define the structure for suburb information
export const suburbInformationGroup: PropertyGroup = {
  name: "Suburb Information",
  subGroups: [
    {
      name: "Vacancy, Growth, Value",
      fields: [
        // Comprehensive list of fields related to suburb statistics
        // Includes crime rate, income levels, vacancy rates, market trends,
        // demographics, auction clearance rates, property values, and more
      ]
    }
  ]
};

// Import financial groups from a separate file
export { financialGroups } from '../data/financialGroups';

// Note: This file defines the structure for various property-related data points.
// It organizes information into groups and subgroups, allowing for a hierarchical
// representation of property data. This structure can be used to generate forms,
// display information, or organize data input/output in a property management system.
