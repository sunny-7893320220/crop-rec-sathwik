import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { handleError } from '../../utils/errortost';
import { Sprout, Tractor ,Shrub,Activity, Thermometer, Droplet, BarChart2, Leaf } from 'lucide-react'; // Import relevant icons

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const growthPhases = [
  { name: "Seed Phase", value: 25 },
  { name: "Vegetation", value: 50 },
  { name: "Bloom", value: 75 },
  { name: "Final", value: 100 },
];

const doughnutOptions = {
  cutout: '50%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 20,
        padding: 10,
        font: {
          size: 12,
          color: '#000000'
        }
      }
    },
    tooltip: { enabled: true }
  }
};

export default function RecommendationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRecommendation = location.state?.recommendation;
  const [recommendationData, setRecommendationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendedData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          handleError('Please log in to access crop recommendations');
          navigate('/login');
          return;
        }

        if (!initialRecommendation) {
          handleError('No Recommendation Data Found');
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/v1/crop/getcrop/${initialRecommendation}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Extract the 'data' object from the response
        const resultData = response.data.data; // Note the nested 'data' key
        setRecommendationData(resultData);
        setError(null);

      } catch (error) {
        const errorMessage = error.message || "Failed to get crop recommendation";
        setError(errorMessage);
        handleError(errorMessage);
        console.error("Error fetching data:", error);
      }
    };

    if (initialRecommendation) {
      getRecommendedData();
    } else {
      setError("No Recommendation Data Found");
    }
  }, [initialRecommendation, navigate]);

  // Loading state
  if (!recommendationData && !error) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  // Success state with data
  const { imageUrl, scientificName, name, optimalConditions, doughnutData, growthCycle, yield: harvestYield } = recommendationData;

  // Use the doughnutData from the API response
  const chartData = {
    labels: doughnutData.labels,
    datasets: doughnutData.datasets
  };

  return (
    <div className="min-h-screen bg-green-900/10 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center ">
            {/* <div className="text-5xl font-semibold justify-center items-center mb-4 text-black">{name}</div> */}
            <div className="flex justify-center">
              <img
                src={imageUrl || ""}
                alt={name || ""}
                className="object-cover w-[90%] h-[80%] rounded-lg mx-auto"
               
              />
            </div>
            <p className="mt-4 text-center text-black font-bold text-2xl">
              This is a {name || ""} ({scientificName || ""})
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-semibold mb-4 text-black">{name} Area</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Droplet className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">{optimalConditions.humidity.split('-')[0]}</div>
                <div className="text-sm text-black">Humidity</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Thermometer className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">{optimalConditions.pH.split('-')[0]}</div>
                <div className="text-sm text-black">Water pH</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Sprout className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">1.8</div> {/* Placeholder - update if API provides this */}
                <div className="text-sm text-black">Growth Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
               <div className="text-4xl font-semibold justify-center items-center mb-4 text-black">Water Usage Details</div>
            <div className="w-full max-w-md mx-auto">
              <Doughnut data={chartData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-semibold mb-4 text-black">{name} Information</div>


// Inside your component's return statement:
<div className="space-y-4 text-[#1A1A1A]"> {/* Dark gray text for consistency */}
  <p className="flex items-center">
    <Sprout className="w-5 h-5 mr-2" fill="#40801b" stroke="none" /> {/* Filled icon for Crop Type */}
    <strong className="text-[#40801b]">Crop Type:</strong>
    <span className="ml-1 text-[#1A1A1A]">{name} ({scientificName})</span>
  </p>
  <p className="flex items-center">
  <Shrub className="w-5 h-5 mr-2" fill="#40801b" stroke="none"/>
    <strong className="text-[#40801b]">Growth Cycle:</strong>
    <span className="ml-1 text-[#1A1A1A]">{growthCycle}</span>
  </p>
  <p className="flex items-center">
    <Leaf className="w-5 h-5 mr-2" fill="#40801b" stroke="none" /> {/* Filled icon for Optimal Conditions */}
    <strong className="text-[#40801b]">Optimal Conditions:</strong>
  </p>
  <ul className="list-disc pl-8 text-[#1A1A1A] " >
    <li className="flex items-center text-black py-2"> 
       <Thermometer className="w-6 h-6 stroke-green-900 fill-none" />
     <span className='px-3 text-black text-[17px]'> Temperature: {optimalConditions.temperature}</span>
    </li>
    <li className="flex items-center text-black ">
    <Droplet  className="w-6 h-6 stroke-green-900 fill-none"/>
    <span className='px-3 text-black text-[17px]'> Humidity: {optimalConditions.humidity}</span>
    </li>
    <li className="flex items-center text-black py-2">
    <Activity  className="w-6 h-6 stroke-green-900 fill-none" /> {/* Reusing Droplet for pH */}
    <span className='px-3 text-black text-[17px]'> pH Level: {optimalConditions.pH}</span>
    </li>
  </ul>
  <div className="flex items-center bg-[#f7c35f] px-2 py-3 rounded-md">
    <Tractor  className="w-15 h-15 mr-2" fill="#000000" stroke="none" /> {/* Filled icon for Harvest Yield */}
    <strong className="text-[#000000] text-[17px]">Harvest Yield:</strong>
    <span className="px-4 text-[#ffffff] text-[17px] font-bold ">{harvestYield}</span>
  </div>
</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-[200px] w-full mb-4">
              <div className="relative h-full">
                {growthPhases.map((phase, index) => (
                  <div
                    key={phase.name}
                    className="absolute"
                    style={{
                      left: `${(index / (growthPhases.length - 1)) * 100}%`,
                      bottom: `${phase.value}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  </div>
                ))}
                <div className="absolute w-full h-[2px] bg-gray-200 top-1/2" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-center flex-1">
                <div className="text-sm font-medium text-black">Seed Phase</div>
                <div className="text-xs text-black">15 Days</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-sm font-medium text-black">Vegetation</div>
                <div className="text-xs text-black">25 Days</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-sm font-medium text-black">Bloom</div>
                <div className="text-xs text-black">20 Days</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-sm font-medium text-black">Final</div>
                <div className="text-xs text-black">10 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}