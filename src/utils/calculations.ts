import { PropertyData, PropertyGroup, SubGroup, propertyGroups } from '../types/types';

// Calculate the outcome score for a single property field
// Lower ratings result in higher outcomes, indicating areas that need attention
export const calculateOutcome = (importance: number, rating: number): number => {
  return importance * rating;
};

// Calculate scores for each group in the property data
export const calculateGroupScores = (propertyData: PropertyData): { [key: string]: number } => {
  const scores: { [key: string]: number } = {};

  propertyGroups.forEach((group: PropertyGroup) => {
    group.subGroups.forEach((subGroup: SubGroup) => {
      // Calculate scores for each field within the current subgroup
      const fieldScores = subGroup.fields.map((field) => {
        const fieldData = propertyData[field.id];
        if (!fieldData) return 0;
        
        // Convert importance rating to number
        const importanceValue = 
          fieldData.importance === "Very important" ? 3 :
          fieldData.importance === "Somewhat important" ? 2 : 1;
        
        // Convert property rating to number
        const ratingValue = 
          fieldData.rating === "Excellent" ? 4 :
          fieldData.rating === "Good" ? 3 :
          fieldData.rating === "Acceptable" ? 2 : 1;
        
        return calculateOutcome(importanceValue, ratingValue);
      });

      // Calculate average score for the subgroup
      const subGroupScore = fieldScores.length > 0 
        ? fieldScores.reduce((sum, score) => sum + score, 0) / fieldScores.length 
        : 0;
      
      scores[subGroup.name] = subGroupScore;
    });
  });

  return scores;
};
