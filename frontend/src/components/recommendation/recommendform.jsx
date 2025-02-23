import React, { useState } from "react";
import { Leaf, Droplet, Thermometer, FlaskConical, ClipboardList, Search,Sprout ,Wind} from "lucide-react"
import bg from "../../assets/cropbg.jpg"

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [accuracy, setAccuracy] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for recommendation
    setAccuracy(Math.random() * 100); // Mock accuracy
  };

  return (
    <div className="min-h-screen bg-yellow-500 bg-center bg-cover flex items-center justify-center p-4"       style={{ backgroundImage: `url(${bg})` }}>
    <div className="bg-white  rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-6">
          Crop Recommendation System
        </h2>

        <div className="grid grid-cols-3 gap-6 text-center mb-6">
  <div className="flex flex-col items-center">
    <div className="bg-green-100 rounded-full p-4 mb-2">
      <ClipboardList className="h-8 w-8 text-green-600" stroke="green" />
    </div>
    <p className="text-sm py-5 text-gray-700">1. Enter Data</p>
  </div>
  <div className="flex flex-col items-center">
    <div className="bg-yellow-100 rounded-full p-4 mb-2">
      <Search className="h-8 w-8 text-yellow-600" stroke="yellow" />
    </div>
    <p className="text-sm py-5 text-gray-700">2. Analyze</p>
  </div>
  <div className="flex flex-col items-center">
    <div className="bg-blue-100 rounded-full p-4 mb-2">
      <Sprout className="h-8 w-8 text-blue-600" stroke="green" />
    </div>
    <p className="text-sm py-5 text-gray-700">3. Get Recommendation</p>
  </div>
</div>
<div className="flex">
    <div
    className="w-2/3 pr-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {
         [
            { name: "nitrogen", label: "Nitrogen", icon: <Leaf className="w-5 h-5" stroke="green" /> },
            { name: "phosphorus", label: "Phosphorus", icon: <Leaf className="w-5 h-5" stroke="green" /> },
            { name: "potassium", label: "Potassium", icon: <Leaf className="w-5 h-5" stroke="green" /> },
            { name: "temperature", label: "Temperature", icon: <Thermometer className="w-5 h-5" stroke="red" /> },
            { name: "humidity", label: "Humidity", icon: <Droplet className="w-5 h-5" stroke="blue" /> },
            { name: "ph", label: "pH", icon: <Wind className="w-5 h-5" stroke="teal" /> },
            { name: "rainfall", label: "Rainfall", icon:<Droplet className="w-5 h-5" stroke="blue" /> },
          ]
  .map(({ name, label, icon }) => (
    <div key={name} className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {icon}
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="flex h-10 border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder={`Enter ${label}`}
      />
    </div>
  ))}

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Recommendation
            </button>
          </div>
        </form>
    </div>
    
    <div className="w-1/3 bg-gradient-to-b from-green-400 to-yellow-400 p-8 rounded-2xl flex flex-col justify-between">
        <h3 className="text-xl font-bold">Recommendation Accuracy</h3>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden mt-2">
          <div className="h-full bg-green-700" style={{ width: `${accuracy}%` }}></div>
        </div>
        <p className="mt-2 text-white font-bold">{accuracy.toFixed(2)}%</p>
        <ul className="mt-4 text-sm">
          <li>✅ Ensure all measurements are accurate</li>
          <li>✅ Consider seasonal variations</li>
          <li>✅ Update soil data regularly</li>
        </ul>
      </div>
</div>

      </div>
      </div>

    </div>
  );
};

export default CropRecommendation;
