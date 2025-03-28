import { PropertyGroup } from '../types/types';

export const propertyGroups: PropertyGroup[] = [
  {
    name: "Property Specific Information",
    subGroups: [
      {
        name: "Education",
        fields: [
          { id: "elementarySchoolDistance", label: "Elementary School Distance" },
          { id: "publicBoysHighSchoolDistance", label: "Public Boys High School Distance" },
          { id: "publicGirlsHighSchoolDistance", label: "Public Girls High School Distance" },
          { id: "privateBoysHighSchoolDistance", label: "Private Boys High School Distance" },
          { id: "privateGirlsHighSchoolDistance", label: "Private Girls High School Distance" },
          { id: "universityDistance", label: "University Distance" }
        ]
      },
      {
        name: "Transport",
        fields: [
          { id: "publicTransportWalkingDistance", label: "Public Transport Walking Distance" },
          { id: "shopsWalkingDistance", label: "Shops Walking Distance" },
          { id: "shopsDrivingDistance", label: "Shops Driving Distance" },
          { id: "hospitalWalkingDistance", label: "Hospital Walking Distance" },
          { id: "hospitalDrivingDistance", label: "Hospital Driving Distance" },
          { id: "cbdPublicTransportTime", label: "CBD Public Transport Time" },
          { id: "cbdDrivingTime", label: "CBD Driving Time" },
          { id: "workTravelCost", label: "Work Travel Cost" }
        ]
      },
      {
        name: "Environment",
        fields: [
          { id: "floodingRisk", label: "Flooding Risk" },
          { id: "fireRisk", label: "Fire Risk" },
          { id: "cycloneRisk", label: "Cyclone Risk" },
          { id: "infrastructureProjectsPlanned", label: "Infrastructure Projects Planned" },
          { id: "infrastructureProjectsTiming", label: "Infrastructure Projects Timing" },
          { id: "infrastructureProjectsType", label: "Infrastructure Projects Type" }
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
          { id: "depreciationYearsLeft", label: "Depreciation Years Left" }
        ]
      },
      {
        name: "Block Financials (Available)",
        fields: [
          { id: "strataFundAmount", label: "Strata Fund Amount" },
          { id: "strataFundPercentage", label: "Strata Fund Percentage" },
          { id: "adminFundAmount", label: "Admin Fund Amount" },
          { id: "adminFundPercentage", label: "Admin Fund Percentage" },
          { id: "specialLevyRequired", label: "Special Levy Required" },
          { id: "specialLevyAmount", label: "Special Levy Amount" },
          { id: "specialLevyPercentage", label: "Special Levy Percentage" }
        ]
      },
      {
        name: "Land Size & Value",
        fields: [
          { id: "landSize", label: "Land Size" },
          { id: "landValue", label: "Land Value" },
          { id: "unitHouseSize", label: "Unit/House Size" },
          { id: "unitHouseValue", label: "Unit/House Value" }
        ]
      },
      {
        name: "Demographic",
        fields: [
          { id: "complexDemographic", label: "Complex Demographic" },
          { id: "tenantCount", label: "Tenant Count" }
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
          { id: "anticipatedWeeklyRent", label: "Anticipated Weekly Rent" },
          { id: "anticipatedYearlyRent", label: "Anticipated Yearly Rent" },
          { id: "councilRates", label: "Council Rates" },
          { id: "waterCost", label: "Water Cost" },
          { id: "landlordInsuranceCost", label: "Landlord Insurance Cost" },
          { id: "propertyManagementFee", label: "Property Management Fee" },
          { id: "otherMonthlyCosts", label: "Other Monthly Costs" }
        ]
      },
      {
        name: "Unit/House Size & Features",
        fields: [
          { id: "floorLevel", label: "Floor Level" },
          { id: "internalSize", label: "Internal Size" },
          { id: "bedroomCount", label: "Bedroom Count" },
          { id: "bathroomCount", label: "Bathroom Count" },
          { id: "hasGarage", label: "Has Garage" },
          { id: "garageSize", label: "Garage Size" },
          { id: "hasParking", label: "Has Parking" },
          { id: "hasBalcony", label: "Has Balcony" },
          { id: "balconySize", label: "Balcony Size" },
          { id: "totalSize", label: "Total Size" },
          { id: "suitableForKids", label: "Suitable for Kids" },
          { id: "suitableForPets", label: "Suitable for Pets" }
        ]
      },
      {
        name: "Renovation/Upkeep",
        fields: [
          { id: "externalAreaSize", label: "External Area Size" },
          { id: "needsGardener", label: "Needs Gardener" },
          { id: "gardenerCost", label: "Gardener Cost" },
          { id: "lastRenovationAge", label: "Last Renovation Age" },
          { id: "renovationDetails", label: "Renovation Details" },
          { id: "internalRenovationCost", label: "Internal Renovation Cost" },
          { id: "externalRenovationCost", label: "External Renovation Cost" },
          { id: "renovationCost1Year", label: "Renovation Cost (1 Year)" },
          { id: "renovationCost5Years", label: "Renovation Cost (5 Years)" },
          { id: "renovationCost10Years", label: "Renovation Cost (10 Years)" }
        ]
      },
      {
        name: "Growth Potential",
        fields: [
          { id: "similarPropertiesCount", label: "Similar Properties Count" },
          { id: "rentGrowth12Months", label: "Rent Growth (12 Months)" },
          { id: "rentGrowth24Months", label: "Rent Growth (24 Months)" },
          { id: "rentGrowth36Months", label: "Rent Growth (36 Months)" },
          { id: "valueGrowth12Months", label: "Value Growth (12 Months)" },
          { id: "valueGrowth24Months", label: "Value Growth (24 Months)" },
          { id: "valueGrowth36Months", label: "Value Growth (36 Months)" }
        ]
      }
    ]
  }
]; 