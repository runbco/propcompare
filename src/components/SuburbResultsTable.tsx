import React from 'react';
import { PropertyData, SubGroup, suburbInformationGroup } from '../types/types';
import { calculateOutcome } from '../utils/calculations';
import GroupScore from './GroupScore';
import '../styles/SuburbResultsTable.css';

// Define props interface for SuburbResultsTable component
interface SuburbResultsTableProps {
  suburbData: PropertyData;
}

// Component for displaying suburb comparison results in a table format
const SuburbResultsTable: React.FC<SuburbResultsTableProps> = ({ suburbData }) => {
  // Calculate score for a single field
  const calculateFieldScore = (field: { id: string; label: string }) => {
    const fieldData = suburbData[field.id];
    if (!fieldData) return 0;
    return calculateOutcome(fieldData.importance, fieldData.rating);
  };

  // Calculate score for a subgroup
  const calculateSubGroupScore = (subGroup: SubGroup) => {
    let totalScore = 0;
    let fieldCount = 0;
    subGroup.fields.forEach(field => {
      const fieldData = suburbData[field.id];
      if (fieldData) {
        totalScore += calculateOutcome(fieldData.importance, fieldData.rating);
        fieldCount++;
      }
    });
    return fieldCount > 0 ? totalScore / fieldCount : 0;
  };

  // Calculate overall rating for the suburb
  const calculateTotalRating = () => {
    const subGroupScores = suburbInformationGroup.subGroups.map(calculateSubGroupScore);
    const totalScore = subGroupScores.reduce((sum, score) => sum + score, 0);
    return subGroupScores.length > 0 ? totalScore / subGroupScores.length : 0;
  };

  return (
    <div className="suburb-results-table">
      <h2>Suburb Results</h2>
      <table>
        <thead>
          <tr>
            <th>Data Point</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate through subgroups and render scores */}
          {suburbInformationGroup.subGroups.map((subGroup) => (
            <React.Fragment key={subGroup.name}>
              <tr className="group-title-row">
                <td colSpan={2}><strong>{subGroup.name}</strong></td>
              </tr>
              {/* Render individual field scores */}
              {subGroup.fields.map((field) => (
                <tr key={field.id}>
                  <td>{field.label}</td>
                  <td>
                    <GroupScore score={calculateFieldScore(field)} />
                  </td>
                </tr>
              ))}
              {/* Render subgroup total score */}
              <tr className="subgroup-total-row">
                <td><em>Subgroup Total</em></td>
                <td>
                  <GroupScore score={calculateSubGroupScore(subGroup)} />
                </td>
              </tr>
            </React.Fragment>
          ))}
          {/* Render overall total rating */}
          <tr className="total-rating-row">
            <td><strong>Total Rating</strong></td>
            <td>
              <GroupScore score={calculateTotalRating()} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SuburbResultsTable;
