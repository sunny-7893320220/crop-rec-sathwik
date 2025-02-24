import React from 'react';
import { Droplet, Thermometer, Sprout } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const growthPhases = [
  { name: "Seed Phase", value: 25 },
  { name: "Vegetation", value: 50 },
  { name: "Bloom", value: 75 },
  { name: "Final", value: 100 },
];

// Doughnut chart data and options (matching your provided chart)
const doughnutData = {
  datasets: [{
    data: [25.6, 32.0, 23.8, 9.9, 8.7], // Percentages from your chart
    backgroundColor: ['#1E90FF', '#32CD32', '#FFA500', '#FF4500', '#9370DB'], // Blue, Green, Orange, Red, Purple
    borderWidth: 0,
  }],
  labels: ['Series-1', 'Series-2', 'Series-3', 'Series-4', 'Series-5']
};

const doughnutOptions = {
  cutout: '50%', // Doughnut style
  plugins: {
    legend: {
      position: 'bottom', // Legend at the bottom like your chart
      labels: {
        boxWidth: 20,
        padding: 10,
        font: {
          size: 12,
          color: '#000000' // Black text for legend
        }
      }
    },
    tooltip: { enabled: true }
  }
};

export default function RecommendationPage() {
  return (
    <div className="min-h-screen bg-green-900/10 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-6">
          {/* New crop image and text at the start */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-semibold mb-4 text-black">Mustard Plant</div>
            <div className="flex justify-center">
              <img
                src="https://example.com/mustard-plant.jpg" // Replace with your actual crop image URL
                alt="Mustard Plant"
                className="object-cover w-48 h-48 rounded-lg"
              />
            </div>
            <p className="mt-4 text-center text-black">
              This is a mustard plant (Brassica juncea) thriving in a hydroponic system.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-semibold mb-4 text-black">Mustard Plant Area</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Droplet className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">64%</div>
                <div className="text-sm text-black">Humidity</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Thermometer className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">3.4</div>
                <div className="text-sm text-black">Water pH</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Sprout className="w-6 h-6 stroke-green-900 fill-none" />
                </div>
                <div className="text-2xl font-bold text-black">1.8</div>
                <div className="text-sm text-black">Growth Rate</div>
              </div>
            </div>
          </div>

          {/* Doughnut chart remains at the bottom of left column */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-full max-w-md mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Right Column (unchanged) */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-lg font-semibold mb-4 text-black">Mustard Plant Information</div>
            <div className="space-y-4 text-black">
              <p className="text-black"><strong className='text-black'>Crop Type:</strong> Mustard (Brassica juncea)</p>
              <p className="text-black"><strong className='text-black'>Growth Cycle:</strong> 90-120 days</p>
              <p className="text-black"><strong className='text-black'>Optimal Conditions:</strong></p>
              <ul className="list-disc pl-5 text-black">
                <li className='text-black'>Temperature: 15-25°C</li>
                <li className='text-black'>Humidity: 60-70%</li>
                <li className='text-black'>pH Level: 6.0-7.5</li>
              </ul>
              <p className="text-black"><strong>Harvest Yield:</strong> 800-1200 kg/acre (average)</p>
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