export interface PropertyGeneralInfo {
  address: string;
  listingLink: string;
  inspectionDate: string;
}

export interface Property {
  id: string;
  generalInfo: PropertyGeneralInfo;
  // ... existing property fields
} 