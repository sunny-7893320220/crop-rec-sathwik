"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Leaf, Droplet, Thermometer, Wind, ClipboardList, Search, Sprout } from "lucide-react"
import bg from "../../assets/cropbg.jpg"
import { handleError } from "../../utils/errortost"

const CropRecommendation = () => {
  const navigate = useNavigate()

  const [nitrogen, setNitrogen] = useState("")
  const [phosphorus, setPhosphorus] = useState("")
  const [potassium, setPotassium] = useState("")
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [ph, setPh] = useState("")
  const [rainfall, setRainfall] = useState("")
  const [accuracy, setAccuracy] = useState(0)

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
  }

  const validate = () => {
    let isValid = true

    if (!nitrogen) {
      handleError("Nitrogen is required")
      isValid = false
    }
    if (!phosphorus) {
      handleError("Phosphorus is required")
      isValid = false
    }
    if (!potassium) {
      handleError("Potassium is required")
      isValid = false
    }
    if (!temperature) {
      handleError("Temperature is required")
      isValid = false
    }
    if (!humidity) {
      handleError("Humidity is required")
      isValid = false
    }
    if (!ph) {
      handleError("pH is required")
      isValid = false
    }
    if (!rainfall) {
      handleError("Rainfall is required")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const formData = {
      N: nitrogen,
      P: phosphorus,
      K: potassium,
      temperature: temperature,
      humidity: humidity,
      ph: ph,
      rainfall: rainfall,
    }

    console.log(formData)

    try {
      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) {
        handleError("Please log in to access crop recommendations")
        navigate("/login")

        return
      }
      const response = await axios.post("http://localhost:8000/api/v1/crop/recommendCrop", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the token to the Authorization header
        },
      })
      const resultData = response.data

      console.log(resultData)

      navigate("/result", {
        state: {
          recommendation: resultData.data.crop,
          accuracy: resultData.accuracy || 99,
        },
      })

      if (resultData.accuracy) {
        setAccuracy(resultData.accuracy)
      }
    } catch (error) {
      handleError(error.message || "Failed to get crop recommendation")
    }
  }

  const inputs = [
    {
      name: "nitrogen",
      label: "Nitrogen",
      value: nitrogen,
      setter: setNitrogen,
      icon: <Leaf className="w-5 h-5" stroke="green" />,
    },
    {
      name: "phosphorus",
      label: "Phosphorus",
      value: phosphorus,
      setter: setPhosphorus,
      icon: <Leaf className="w-5 h-5" stroke="green" />,
    },
    {
      name: "potassium",
      label: "Potassium",
      value: potassium,
      setter: setPotassium,
      icon: <Leaf className="w-5 h-5" stroke="green" />,
    },
    {
      name: "temperature",
      label: "Temperature",
      value: temperature,
      setter: setTemperature,
      icon: <Thermometer className="w-5 h-5" stroke="red" />,
    },
    {
      name: "humidity",
      label: "Humidity",
      value: humidity,
      setter: setHumidity,
      icon: <Droplet className="w-5 h-5" stroke="blue" />,
    },
    { name: "ph", label: "pH", value: ph, setter: setPh, icon: <Wind className="w-5 h-5" stroke="teal" /> },
    {
      name: "rainfall",
      label: "Rainfall",
      value: rainfall,
      setter: setRainfall,
      icon: <Droplet className="w-5 h-5" stroke="blue" />,
    },
  ]

  return (
    <div
      className="min-h-screen bg-yellow-500 bg-center bg-cover flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Crop Recommendation System</h2>

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
            <div className="w-2/3 pr-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {inputs.map(({ name, label, value, setter, icon }) => (
                  <div key={name} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 capitalize">
                      {icon}
                      {label}
                    </label>
                    <input
                      type="number"
                      name={name}
                      value={value}
                      onChange={handleChange(setter)}
                      className="flex h-10 w-full border text-black bg-background px-3 py-2 text-sm rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 focus:outline-none focus:ring-2"
                      placeholder={`Enter ${label}`}
                    />
                  </div>
                ))}

                <div className="col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Get Recommendation
                  </button>
                </div>
              </form>
            </div>

            <div className="w-1/3 bg-gradient-to-b from-green-400 to-yellow-400 p-8 rounded-2xl flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-white mb-4">Recommendation Accuracy</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-grow bg-white rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-green-700 transition-all duration-300"
                    style={{ width: `99%` }}
                  ></div>
                </div>
                <p className="text-2xl text-white font-bold whitespace-nowrap">99%</p>
              </div>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-center">
                  <span className="mr-2 text-green-200">✅</span>
                  Ensure all measurements are accurate
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-200">✅</span>
                  Consider seasonal variations
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-200">✅</span>
                  Update soil data regularly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropRecommendation

