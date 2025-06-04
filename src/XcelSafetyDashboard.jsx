import React, { useState } from 'react';
import { 
  BarChart, Bar, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, 
  LineChart, Line, 
  ComposedChart, Area,
  RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const YourUtilityWildfireDashboard = () => {
  // Helper function for text wrapping
  const wrapLabelToTwoLines = (text) => {
    if (!text) return '';
    
    // If text already contains spaces, split at a reasonable point
    if (text.includes(' ')) {
      const words = text.split(' ');
      const midpoint = Math.floor(words.length / 2);
      return [
        words.slice(0, midpoint).join(' '),
        words.slice(midpoint).join(' ')
      ];
    } 
    // For long words with no spaces, try to split in the middle
    else if (text.length > 10) {
      const midpoint = Math.floor(text.length / 2);
      return [
        text.substring(0, midpoint),
        text.substring(midpoint)
      ];
    }
    // Short text without spaces doesn't need splitting
    return [text];
  };

  // Custom X-Axis tick for multi-line labels
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const lines = wrapLabelToTwoLines(payload.value);
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#666"
          fontSize={12}
        >
          {lines[0]}
        </text>
        {lines.length > 1 && (
          <text
            x={0}
            y={0}
            dy={34}
            textAnchor="middle"
            fill="#666"
            fontSize={12}
          >
            {lines[1]}
          </text>
        )}
      </g>
    );
  };

  // Styling constants
  const styles = {
    container: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    badge: {
      backgroundColor: '#dbeafe',
      padding: '8px',
      borderRadius: '4px',
      color: '#1e40af',
      fontWeight: '500',
      fontSize: '14px'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    },
    chartGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    },
    card: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#111827'
    },
    valueDisplay: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    bigNumber: {
      fontSize: '36px',
      fontWeight: 'bold'
    },
    textBlue: {
      color: '#2563eb'
    },
    textGreen: {
      color: '#059669'
    },
    textAmber: {
      color: '#d97706'
    },
    textRed: {
      color: '#dc2626'
    },
    trendUp: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#10b981'
    },
    secondaryText: {
      marginLeft: '8px',
      color: '#6b7280'
    },
    smallText: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '8px'
    },
    chartContainer: {
      height: '18rem'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    dataTable: {
      minWidth: '100%',
      backgroundColor: 'white',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      padding: '8px 16px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableCell: {
      padding: '8px 16px',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '14px',
      color: '#6b7280'
    },
    rowEven: {
      backgroundColor: '#f9fafb'
    },
    rowOdd: {
      backgroundColor: 'white'
    },
    footer: {
      marginTop: '24px',
      backgroundColor: '#f3f4f6',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    footerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    verifiedIndicator: {
      display: 'flex',
      alignItems: 'center'
    },
    verifiedDot: {
      width: '12px',
      height: '12px',
      borderRadius: '9999px',
      backgroundColor: '#10b981',
      marginRight: '8px'
    },
    verifiedText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#059669'
    },
    textYellow: {
      color: '#d97706'
    }
  };
  
  // Sample data
  const wildfireMetrics = {
    'Vegetation Management Compliance': {
      average: 8.2,
      byRole: { 'Manager': 9.3, 'Employee': 8.4, 'Contractor': 6.9 },
      distribution: [
        { score: '1-3', count: 1 }, 
        { score: '4-6', count: 5 }, 
        { score: '7-8', count: 22 }, 
        { score: '9-10', count: 22 }
      ],
      trend: [
        { month: 'Jul', score: 7.8 },
        { month: 'Aug', score: 8.0 },
        { month: 'Sep', score: 8.2 }
      ],
      blockchainVerified: true
    },
    'Equipment Inspection Thoroughness': {
      average: 7.6,
      byRole: { 'Manager': 8.9, 'Employee': 7.8, 'Contractor': 6.1 },
      distribution: [
        { score: '1-3', count: 2 }, 
        { score: '4-6', count: 8 }, 
        { score: '7-8', count: 25 }, 
        { score: '9-10', count: 15 }
      ],
      trend: [
        { month: 'Jul', score: 7.3 },
        { month: 'Aug', score: 7.4 },
        { month: 'Sep', score: 7.6 }
      ],
      blockchainVerified: true
    },
    'Weather Monitoring Protocol Adherence': {
      average: 8.7,
      byRole: { 'Manager': 9.1, 'Employee': 8.6, 'Contractor': 8.4 },
      distribution: [
        { score: '1-3', count: 0 }, 
        { score: '4-6', count: 3 }, 
        { score: '7-8', count: 17 }, 
        { score: '9-10', count: 30 }
      ],
      trend: [
        { month: 'Jul', score: 8.4 },
        { month: 'Aug', score: 8.6 },
        { month: 'Sep', score: 8.7 }
      ],
      blockchainVerified: true
    },
    'De-energization Decision Protocols': {
      average: 7.2,
      byRole: { 'Manager': 8.8, 'Employee': 7.1, 'Contractor': 5.7 },
      distribution: [
        { score: '1-3', count: 3 }, 
        { score: '4-6', count: 12 }, 
        { score: '7-8', count: 22 }, 
        { score: '9-10', count: 13 }
      ],
      trend: [
        { month: 'Jul', score: 6.8 },
        { month: 'Aug', score: 7.0 },
        { month: 'Sep', score: 7.2 }
      ],
      blockchainVerified: true
    },
    'Equipment Replacement Prioritization': {
      average: 6.8,
      byRole: { 'Manager': 8.5, 'Employee': 6.7, 'Contractor': 5.2 },
      distribution: [
        { score: '1-3', count: 4 }, 
        { score: '4-6', count: 14 }, 
        { score: '7-8', count: 20 }, 
        { score: '9-10', count: 12 }
      ],
      trend: [
        { month: 'Jul', score: 6.4 },
        { month: 'Aug', score: 6.6 },
        { month: 'Sep', score: 6.8 }
      ],
      blockchainVerified: true
    }
  };
  
  // Historical fire incident data
  const fireIncidentHistory = [
    { year: '2020', count: 3, damageEst: 120000, mitigationScore: 6.4 },
    { year: '2021', count: 5, damageEst: 290000000, mitigationScore: 6.8 },
    { year: '2022', count: 2, damageEst: 85000, mitigationScore: 7.3 },
    { year: '2023', count: 1, damageEst: 42000, mitigationScore: 7.8 },
    { year: '2024', count: 4, damageEst: 295000000, mitigationScore: 8.1 }
  ];
  
  // High-risk area data
  const highRiskAreas = [
    { name: 'Denver Mountain Region', riskScore: 8.7, inspectionRate: 9.1, vegetationCompliance: 7.6 },
    { name: 'Colorado Springs Foothills', riskScore: 9.2, inspectionRate: 8.5, vegetationCompliance: 7.2 },
    { name: 'Boulder County Interface', riskScore: 8.9, inspectionRate: 8.8, vegetationCompliance: 7.9 },
    { name: 'Evergreen District', riskScore: 9.4, inspectionRate: 8.7, vegetationCompliance: 7.3 },
    { name: 'Fort Collins Western Edge', riskScore: 8.5, inspectionRate: 9.3, vegetationCompliance: 8.1 }
  ];
  
  // ROI insights data
  const wildfireInsightData = [
    { insight: "Vegetation management gap in contractor implementation", value: 2.4, impact: "Highest fire risk exposure factor" },
    { insight: "De-energization decision protocol discrepancy", value: 3.1, impact: "$58M potential liability reduction" },
    { insight: "Strong weather monitoring adherence validated", value: 8.7, impact: "Critical strength in prevention" },
    { insight: "Equipment replacement prioritization needs improvement", value: 6.8, impact: "52% higher risk in high-fire areas" },
    { insight: "All patterns cryptographically verified", value: 5, impact: "Legal evidence for compliance defense" }
  ];
  
  // Prepare data for charts
  const overviewData = Object.keys(wildfireMetrics).map(metric => ({
    name: metric,
    score: wildfireMetrics[metric].average,
    verified: wildfireMetrics[metric].blockchainVerified
  }));
  
  const roleComparisonData = Object.keys(wildfireMetrics).map(metric => ({
    name: metric,
    Manager: wildfireMetrics[metric].byRole['Manager'],
    Employee: wildfireMetrics[metric].byRole['Employee'],
    Contractor: wildfireMetrics[metric].byRole['Contractor']
  }));
  
  // Gap analysis
  const gapAnalysis = Object.keys(wildfireMetrics).map(metric => {
    const managerScore = wildfireMetrics[metric].byRole['Manager'];
    const employeeScore = wildfireMetrics[metric].byRole['Employee'];
    const contractorScore = wildfireMetrics[metric].byRole['Contractor'];
    const maxGap = Math.max(
      Math.abs(managerScore - employeeScore),
      Math.abs(managerScore - contractorScore),
      Math.abs(employeeScore - contractorScore)
    );
    return {
      name: metric,
      score: wildfireMetrics[metric].average,
      gap: maxGap,
      opportunity: 10 - wildfireMetrics[metric].average
    };
  });
  
  // Radar data
  const radarData = Object.keys(wildfireMetrics).map(metric => ({
    subject: metric,
    Manager: wildfireMetrics[metric].byRole['Manager'],
    Employee: wildfireMetrics[metric].byRole['Employee'],
    Contractor: wildfireMetrics[metric].byRole['Contractor'],
    fullMark: 10
  }));
  
  // Create trend data
  const trendDataWildfire = wildfireMetrics['Vegetation Management Compliance'].trend.map(item => {
    const dataPoint = { month: item.month };
    
    Object.keys(wildfireMetrics).forEach(pattern => {
      const matchingTrend = wildfireMetrics[pattern].trend.find(
        trend => trend.month === item.month
      );
      dataPoint[pattern] = matchingTrend ? matchingTrend.score : null;
    });
    
    return dataPoint;
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // JSX rendering
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>YourUtility Energy Wildfire Mitigation Dashboard</h1>
        <div style={styles.badge}>
          Cryptographically Verified • 50 Participants • Blockchain Secured
        </div>
      </div>
      
      {/* Key Metrics Section */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Overall Wildfire Mitigation Score</h3>
          <div style={styles.valueDisplay}>
            <span style={{...styles.bigNumber, ...styles.textBlue}}>7.7</span>
            <span style={styles.trendUp}>↑ 0.5 from last month</span>
          </div>
          <p style={styles.smallText}>Based on 5 verified mitigation patterns</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Damage Averted</h3>
          <div style={styles.valueDisplay}>
            <span style={{...styles.bigNumber, ...styles.textGreen}}>$770M</span>
            <span style={styles.secondaryText}>Estimated</span>
          </div>
          <p style={styles.smallText}>Based on prevented incidents</p>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Mitigation Score Trend</h3>
          <div style={styles.valueDisplay}>
            <span style={{...styles.bigNumber, ...styles.textBlue}}>+1.7</span>
            <span style={styles.trendUp}>Points since 2020</span>
          </div>
          <p style={styles.smallText}>Steady improvement in safety culture</p>
        </div>
      </div>
      
      {/* Key Learnings Section */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Key Learnings from Historical Analysis</h3>
        <div style={{padding: '16px'}}>
          <ul style={{paddingLeft: '20px', listStyleType: 'disc'}}>
            <li style={{marginBottom: '8px'}}>Strong correlation between mitigation scores and reduced incident rates</li>
            <li style={{marginBottom: '8px'}}>High-damage incidents (2021, 2024) directly linked to vegetation management gaps</li>
            <li style={{marginBottom: '8px'}}>Weather monitoring improvements yielded significant reduction in outage duration</li>
            <li style={{marginBottom: '8px'}}>Equipment replacement prioritization proved most cost-effective intervention</li>
            <li style={{marginBottom: '8px'}}>Cryptographic verification system enables more precise risk assessment</li>
          </ul>
        </div>
      </div>
      
      {/* Fire Incident History Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Fire Incident History Analysis</h3>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={fireIncidentHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              <Tooltip formatter={(value, name) => {
                if (name === 'damageEst') return `$${value.toLocaleString()}`;
                return value;
              }} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Incident Count" />
              <Bar yAxisId="left" dataKey="damageEst" fill="#ff8042" name="Damage Estimate ($)" />
              <Line yAxisId="right" type="monotone" dataKey="mitigationScore" stroke="#82ca9d" name="Mitigation Score" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Tables and Charts Section */}
      <div style={styles.chartGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Historical Metrics by Year</h3>
          <div style={styles.tableContainer}>
            <table style={styles.dataTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Year</th>
                  <th style={styles.tableHeader}>Incidents</th>
                  <th style={styles.tableHeader}>Damage Estimate</th>
                  <th style={styles.tableHeader}>Mitigation Score</th>
                  <th style={styles.tableHeader}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {fireIncidentHistory.map((year, idx) => (
                  <tr key={idx} style={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.tableCell}>{year.year}</td>
                    <td style={styles.tableCell}>{year.count}</td>
                    <td style={styles.tableCell}>${year.damageEst.toLocaleString()}</td>
                    <td style={styles.tableCell}>{year.mitigationScore.toFixed(1)}</td>
                    <td style={styles.tableCell}>
                      {year.year === '2020' ? "Pre-verification system" : 
                       year.year === '2021' ? "Marshall Fire impact" :
                       year.year === '2022' ? "Improved vegetation protocols" :
                       year.year === '2023' ? "Weather monitoring upgraded" :
                       "PSPS refinement implemented"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Role Breakdown</h3>
          <div style={styles.tableContainer}>
            <table style={styles.dataTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Pattern</th>
                  <th style={styles.tableHeader}>Manager Score</th>
                  <th style={styles.tableHeader}>Employee Score</th>
                  <th style={styles.tableHeader}>Contractor Score</th>
                  <th style={styles.tableHeader}>Gap</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(wildfireMetrics).map((pattern, idx) => {
                  const managerScore = wildfireMetrics[pattern].byRole['Manager'];
                  const employeeScore = wildfireMetrics[pattern].byRole['Employee'];
                  const contractorScore = wildfireMetrics[pattern].byRole['Contractor'];
                  const gap = Math.max(
                    Math.abs(managerScore - employeeScore),
                    Math.abs(managerScore - contractorScore),
                    Math.abs(employeeScore - contractorScore)
                  ).toFixed(1);
                  
                  let gapStyle = styles.textGreen;
                  if (parseFloat(gap) > 2.5) gapStyle = styles.textRed;
                  else if (parseFloat(gap) > 1.5) gapStyle = styles.textYellow;
                  
                  return (
                    <tr key={pattern} style={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                      <td style={styles.tableCell}>{pattern}</td>
                      <td style={styles.tableCell}>{managerScore.toFixed(1)}</td>
                      <td style={styles.tableCell}>{employeeScore.toFixed(1)}</td>
                      <td style={styles.tableCell}>{contractorScore.toFixed(1)}</td>
                      <td style={{...styles.tableCell, ...gapStyle}}>{gap}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Pattern and Risk Charts Section */}
      <div style={styles.chartGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Wildfire Mitigation Pattern Scores</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={overviewData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  height={60} 
                  tick={<CustomXAxisTick />} 
                  interval={0}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" name="Pattern Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>High Risk Area Assessment</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={highRiskAreas}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  height={60} 
                  tick={<CustomXAxisTick />} 
                  interval={0}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="riskScore" fill="#FF8042" name="Fire Risk Score" />
                <Bar dataKey="inspectionRate" fill="#00C49F" name="Inspection Rate" />
                <Bar dataKey="vegetationCompliance" fill="#0088FE" name="Vegetation Compliance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* More Charts Section */}
      <div style={styles.chartGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Mitigation Pattern Recognition by Role</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roleComparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  height={60} 
                  tick={<CustomXAxisTick />} 
                  interval={0}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Manager" fill="#8884d8" name="Managers" />
                <Bar dataKey="Employee" fill="#82ca9d" name="Employees" />
                <Bar dataKey="Contractor" fill="#ffc658" name="Contractors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Perception Radar: Wildfire Mitigation</h3>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={(props) => {
                  const { payload, x, y, cx, cy, ...rest } = props;
                  const lines = wrapLabelToTwoLines(payload.value);
                  return (
                    <g>
                      <text {...rest} verticalAnchor="middle" y={y} x={x} fill="#666" textAnchor={x > cx ? 'start' : 'end'} fontSize="10">
                        {lines[0]}
                      </text>
                      {lines.length > 1 && (
                        <text {...rest} verticalAnchor="middle" y={y + 12} x={x} fill="#666" textAnchor={x > cx ? 'start' : 'end'} fontSize="10">
                          {lines[1]}
                        </text>
                      )}
                    </g>
                  );
                }} />
                <PolarRadiusAxis domain={[0, 10]} />
                <Radar name="Managers" dataKey="Manager" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Employees" dataKey="Employee" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="Contractors" dataKey="Contractor" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Trend Analysis Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Trend Analysis: Wildfire Mitigation Patterns</h3>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendDataWildfire}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[5, 10]} />
              <Tooltip />
              <Legend wrapperStyle={{fontSize: '10px'}} />
              {Object.keys(wildfireMetrics).map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={metric}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Business Impact Table */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Key Insights & Business Impact</h3>
        <div style={styles.tableContainer}>
          <table style={styles.dataTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Key Insight</th>
                <th style={styles.tableHeader}>Value</th>
                <th style={styles.tableHeader}>Business Impact</th>
                <th style={styles.tableHeader}>Action Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {wildfireInsightData.map((insight, idx) => (
                <tr key={idx} style={idx % 2 === 0
? styles.rowEven : styles.rowOdd}>
                  <td style={styles.tableCell}>{insight.insight}</td>
                  <td style={styles.tableCell}>
                    {typeof insight.value === 'number' ? insight.value.toFixed(1) : insight.value}
                  </td>
                  <td style={styles.tableCell}>{insight.impact}</td>
                  <td style={{...styles.tableCell, color: '#2563eb'}}>
                    {idx === 0 ? "Enhance contractor vegetation protocols" : 
                     idx === 1 ? "Standardize de-energization decision triggers" :
                     idx === 2 ? "Use as benchmark for other practices" :
                     idx === 3 ? "Accelerate equipment replacement program" :
                     "Use for regulatory compliance documentation"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Gap Analysis Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Gap Analysis</h3>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={gapAnalysis}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                height={60} 
                tick={<CustomXAxisTick />} 
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gap" fill="#ff8042" name="Max Perception Gap" />
              <Bar dataKey="opportunity" fill="#0088FE" name="Improvement Opportunity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <h3 style={styles.cardTitle}>GetVer.io Verification Status</h3>
            <p style={styles.smallText}>All safety patterns have been validated by qualified personnel and cryptographically protected</p>
          </div>
          <div style={styles.verifiedIndicator}>
            <div style={styles.verifiedDot}></div>
            <span style={styles.verifiedText}>Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourUtilityWildfireDashboard;