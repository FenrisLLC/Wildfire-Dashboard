import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, CheckCircle, TreePine, Eye, Zap, Info } from 'lucide-react';

const ColoradoTransmissionDemo = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [animatePoints, setAnimatePoints] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatePoints(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock compliance data points along a Colorado transmission line
  const compliancePoints = [
    // Green dots - Verified compliance
    { id: 1, lat: 39.7392, lng: -104.9903, type: 'verified', title: 'Mile 0.5 - Vegetation Cleared', details: 'Cryptographic proof: Tree clearance completed 03/15/2024', species: 'Cottonwood', clearance: '25ft', verifications: 7 },
    { id: 2, lat: 39.7425, lng: -104.9820, type: 'verified', title: 'Mile 1.2 - Equipment Inspected', details: 'Multi-source verification: Visual + Thermal + Worker confirmation', equipment: 'Transformer #3847', status: 'Operational', verifications: 5 },
    { id: 3, lat: 39.7458, lng: -104.9737, type: 'verified', title: 'Mile 1.8 - Right-of-Way Maintained', details: 'Anonymous worker feedback + GPS verification confirmed', maintenance: 'Complete', date: '04/22/2024', verifications: 8 },
    { id: 4, lat: 39.7491, lng: -104.9654, type: 'verified', title: 'Mile 2.4 - Pole Inspection Complete', details: 'Blockchain-verified completion with photographic evidence', condition: 'Excellent', inspector: 'Verified Anonymous', verifications: 6 },
    { id: 5, lat: 39.7524, lng: -104.9571, type: 'verified', title: 'Mile 3.1 - Cable Tensioning Verified', details: 'Mathematical proof of proper tension maintenance', tension: '12,500 lbs', compliance: 'Within spec', verifications: 9 },
    { id: 6, lat: 39.7557, lng: -104.9488, type: 'verified', title: 'Mile 3.7 - Substation Access Clear', details: 'Multi-source pattern recognition confirmed access compliance', access: 'Unrestricted', security: 'Verified', verifications: 5 },
    { id: 7, lat: 39.7590, lng: -104.9405, type: 'verified', title: 'Mile 4.2 - Wildlife Protection Active', details: 'Osprey nest protection measures cryptographically documented', species: 'Osprey', protection: 'Active', verifications: 7 },
    { id: 8, lat: 39.7623, lng: -104.9322, type: 'verified', title: 'Mile 4.6 - Grounding System Tested', details: 'Anonymous field verification + electrical testing confirmed', resistance: '2.1 ohms', status: 'Compliant', verifications: 6 },
    { id: 9, lat: 39.7656, lng: -104.9239, type: 'verified', title: 'Mile 4.9 - Final Pole Inspection', details: 'End-of-line verification with multi-source confirmation', condition: 'Good', next_inspection: '2025-Q2', verifications: 8 },
    { id: 10, lat: 39.7689, lng: -104.9156, type: 'verified', title: 'Mile 5.0 - Termination Point Secure', details: 'Cryptographic seal on completion documentation', termination: 'Secure', verification: 'Complete', verifications: 9 },
    
    // Red dots - Problematic patterns
    { id: 11, lat: 39.7450, lng: -104.9680, type: 'problem', title: 'Mile 1.9 - Ponderosa Pine Overgrowth', details: 'Anonymous worker reports: "These pines have grown 8ft since last documented clearance. Wind loading concern during storms."', species: 'Ponderosa Pine', risk: 'High', growth_rate: '3-4ft/year', verifications: 5 },
    { id: 12, lat: 39.7580, lng: -104.9350, type: 'problem', title: 'Mile 4.3 - Cottonwood Encroachment', details: 'Pattern recognition detected: Documentation shows clearance, but satellite + field reports indicate 15ft overgrowth into easement.', species: 'Cottonwood', risk: 'Critical', issue: 'Fast regrowth not addressed', verifications: 7 }
  ];

  const ColoradoProblematicSpecies = [
    { name: 'Ponderosa Pine', growth: '3-4 ft/year', risk: 'Wind loading, fire ladder', height: '60-130 ft' },
    { name: 'Quaking Aspen', growth: '2-3 ft/year', risk: 'Fast regrowth, storm damage', height: '20-80 ft' },
    { name: 'Blue Spruce', growth: '1-2 ft/year', risk: 'Dense branching, ice loading', height: '50-115 ft' },
    { name: 'Cottonwood', growth: '4-6 ft/year', risk: 'Brittle wood, rapid growth', height: '50-100 ft' }
  ];

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowDetails(true);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Dashboard Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Title */}
          <div className="col-span-3">
            <h1 className="text-xl font-bold text-gray-900">GetVer.io Colorado Demo</h1>
            <p className="text-xs text-gray-600">5-Mile Segment • 2024 Full Year</p>
          </div>
          
          {/* Dashboard Stats */}
          <div className="col-span-6 grid grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-600">10</div>
              <div className="text-xs text-green-700">Verified Points</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-600">2</div>
              <div className="text-xs text-red-700">Problem Areas</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center relative group cursor-help">
              <div className="text-xl font-bold text-blue-600">$2.3M</div>
              <div className="text-xs text-blue-700">Gap Prevented</div>
              
              {/* Gap Prevented Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                Value of incidents prevented by catching documentation vs reality gaps
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center relative group cursor-help">
              <div className="text-xl font-bold text-purple-600">83.3%</div>
              <div className="text-xs text-purple-700">Verification Rate</div>
              
              {/* Verification Rate Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                % of documented work cryptographically verified as actually completed
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </div>
          </div>
          
          {/* VAC Technology Badge */}
          <div className="col-span-3 flex justify-end">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg relative group cursor-help">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">VAC Technology</span>
              </div>
              <div className="text-xs opacity-90">Multi-Source Pattern Recognition</div>
              
              {/* VAC Technology Tooltip */}
              <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white px-3 py-2 rounded text-xs font-medium w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                Verified Anonymous Compliance: Workers report field reality anonymously while blockchain creates cryptographic proof of actual work completion vs documentation
                <div className="absolute bottom-full right-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-20">
        {/* Simulated Colorado Terrain Map Background */}
        <div className="w-full h-full relative bg-gray-100" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 139, 34, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(107, 142, 35, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(85, 107, 47, 0.3) 0%, transparent 45%),
            linear-gradient(45deg, #f5f5dc 0%, #deb887 20%, #d2b48c 40%, #bc9a6a 60%, #8b7355 80%, #696969 100%)
          `,
          backgroundSize: '800px 600px, 600px 400px, 400px 500px, 100% 100%'
        }}>
          
          {/* Transmission Line Path - Straight Line */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#374151" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6B7280" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line
              x1="100"
              y1="300"
              x2="1100"
              y2="300"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeDasharray="10,5"
              className="drop-shadow-lg"
            />
          </svg>

          {/* Compliance Points */}
          {compliancePoints.map((point, index) => (
            <div
              key={point.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 z-10 group ${
                animatePoints ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `${(index + 1) * (90 / compliancePoints.length) + 5}%`,
                top: `50%`,
                transitionDelay: `${index * 100}ms`
              }}
              onClick={() => handlePointClick(point)}
            >
              <div className={`relative ${
                point.type === 'verified' 
                  ? 'text-green-600 bg-green-100 hover:bg-green-200' 
                  : 'text-red-600 bg-red-100 hover:bg-red-200'
              } rounded-full p-2 shadow-lg ring-2 ring-white animate-pulse`}>
                {point.type === 'verified' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
                
                {/* Verification Count Badge */}
                <div className={`absolute -top-1 -right-1 ${
                  point.type === 'verified' ? 'bg-green-600' : 'bg-red-600'
                } text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                  {point.verifications}
                </div>
              </div>
              
              {/* Hover Tooltip for Species */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {point.species} • {point.lat}, {point.lng}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
              
              {/* Point Label */}
              <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                point.type === 'verified' 
                  ? 'bg-green-800 text-green-100' 
                  : 'bg-red-800 text-red-100'
              }`}>
                {point.title.split(' - ')[0]}
              </div>
            </div>
          ))}

          {/* Legend - Colorado Species */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg z-20">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Colorado Problematic Species
            </h3>
            <div className="space-y-2">
              {ColoradoProblematicSpecies.map((species, index) => (
                <div key={index} className="flex items-center text-sm">
                  <TreePine className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{species.name}</span>
                    <span className="text-gray-600 ml-2">({species.growth} growth)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend - Pattern Strength */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg z-20">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Pattern Strength Indicator
            </h3>
            <div className="flex items-center text-sm">
              <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">7</div>
              <span className="text-gray-900">Number of independent verifications</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Higher numbers = stronger pattern confidence</p>
          </div>

          {/* Anonymous Verification Badge */}
          <div className="absolute top-20 left-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg z-20">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span className="font-semibold">Anonymous Verifications</span>
            </div>
            <div className="text-xs opacity-90">47 Total Reports Processed</div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {showDetails && selectedPoint && (
        <div className="absolute inset-y-0 right-0 w-96 bg-white shadow-2xl z-30 transform transition-transform duration-300">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className={`p-6 ${
              selectedPoint.type === 'verified' 
                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedPoint.type === 'verified' ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <AlertTriangle className="w-8 h-8" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold">{selectedPoint.title}</h2>
                    <p className="text-sm opacity-90">
                      {selectedPoint.type === 'verified' ? 'Cryptographically Verified' : 'Pattern Recognition Alert'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Main Details */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Field Reality Documentation</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPoint.details}</p>
                </div>

                {/* Species Information (for problem points) */}
                {selectedPoint.species && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                      <TreePine className="w-4 h-4 mr-2" />
                      Species: {selectedPoint.species}
                    </h4>
                    {selectedPoint.growth_rate && (
                      <p className="text-amber-800 text-sm">Growth Rate: {selectedPoint.growth_rate}</p>
                    )}
                    {selectedPoint.risk && (
                      <p className="text-amber-800 text-sm">Risk Level: {selectedPoint.risk}</p>
                    )}
                  </div>
                )}

                {/* Technical Details */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedPoint)
                    .filter(([key]) => !['id', 'lat', 'lng', 'type', 'title', 'details', 'species', 'verifications'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded p-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {key.replace('_', ' ')}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mt-1">{value}</div>
                      </div>
                    ))}
                </div>

                {/* Verification Count */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Anonymous Verifications: {selectedPoint.verifications}
                  </h4>
                  <p className="text-indigo-800 text-sm">
                    {selectedPoint.type === 'verified' 
                      ? `${selectedPoint.verifications} independent anonymous workers confirmed this compliance point through blockchain verification.`
                      : `${selectedPoint.verifications} anonymous field reports identified this pattern discrepancy between documentation and reality.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">GetVer.io Verified Anonymous Compliance</div>
                <div className="text-xs text-gray-600 mt-1">Mathematical proof of field compliance reality</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColoradoTransmissionDemo;
