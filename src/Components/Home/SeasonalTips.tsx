// components/SeasonalTips.jsx
"use client";
import { useState } from "react";
import { 
  WiDaySunny, 
  WiRain, 
  WiCloud, 
  WiStrongWind, 
  WiThermometer,
  WiHumidity
} from "react-icons/wi";
import { 
  MdCalendarMonth, 
  MdLocationOn, 
  MdWarning, 
  MdChevronRight,
  MdWaterDrop,
  MdGrass,
  MdBugReport,
  MdShield,
  MdSchedule
} from "react-icons/md";

type Region = "Dhaka" | "Rajshahi" | "Barishal" | "Sylhet" | "Chattogram" | "Khulna" | "Rangpur" | "Mymensingh";

const SeasonalTips = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("Dhaka");
  const [weatherAlert, setWeatherAlert] = useState(true);

  // Current month and season determination
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 8) return { name: "Monsoon", icon: WiRain, color: "blue" };
    if (month >= 4 && month <= 5) return { name: "Summer", icon: WiDaySunny, color: "orange" };
    if (month >= 8 && month <= 10) return { name: "Autumn", icon: WiStrongWind, color: "amber" };
    if (month >= 10 && month <= 12) return { name: "Late Autumn", icon: WiCloud, color: "indigo" };
    if (month >= 12 || month <= 2) return { name: "Winter", icon: WiThermometer, color: "gray" };
    return { name: "Spring", icon: WiHumidity, color: "green" };
  };

  const season = getCurrentSeason();
  const SeasonIcon = season.icon;

  // Regional tips database
  const regionalTips: Record<Region, string> = {
    Dhaka: "High humidity in Dhaka causes more fungal diseases. Use neem oil spray regularly for prevention.",
    Rajshahi: "Temperatures can exceed 40°C in Rajshahi. Apply mulching to retain soil moisture.",
    Barishal: "Riverine areas in Barishal may face salinity issues. Choose salt-tolerant plant varieties.",
    Sylhet: "Sylhet receives heavy rainfall. Ensure proper drainage system for your plants.",
    Chattogram: "Use contour farming methods for hilly slopes in Chattogram region.",
    Khulna: "Consider salinity and flood-prone conditions near Sundarbans in Khulna.",
    Rangpur: "Winter temperatures drop significantly in Rangpur. Use cold frames for protection.",
    Mymensingh: "Mymensingh has fertile soil suitable for vegetable farming alongside rice cultivation."
  };

  // Monthly planting guide
  const monthlyPlants = {
    plantNow: ["Amaranth Greens", "Malabar Spinach", "Red Spinach", "Ridge Gourd", "Snake Gourd", "Okra"],
    prepareNext: ["Cauliflower Seedlings", "Cabbage Seedlings", "Tomato Seeds"],
    avoidNow: ["Tomatoes", "Cauliflower (will rot in heat)", "Radish (high pest risk)"]
  };

  // Get current month name
  const getCurrentMonth = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[new Date().getMonth()];
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <MdCalendarMonth className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">
              {getCurrentMonth()} 2026
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seasonal Farming Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Region-specific plant care and cultivation advice based on current season
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Weather & Season Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Season Card */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
              season.color === 'blue' ? 'border-blue-500' :
              season.color === 'orange' ? 'border-orange-500' :
              season.color === 'amber' ? 'border-amber-500' :
              season.color === 'indigo' ? 'border-indigo-500' :
              season.color === 'gray' ? 'border-gray-500' : 'border-green-500'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <SeasonIcon className={`w-8 h-8 ${
                  season.color === 'blue' ? 'text-blue-600' :
                  season.color === 'orange' ? 'text-orange-600' :
                  season.color === 'amber' ? 'text-amber-600' :
                  season.color === 'indigo' ? 'text-indigo-600' :
                  season.color === 'gray' ? 'text-gray-600' : 'text-green-600'
                }`} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Current Season</h3>
                  <p className="text-lg font-semibold text-gray-700">{season.name}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Plant growth and care require special attention during this season
              </p>
            </div>

            {/* Weather Alert */}
            {weatherAlert && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <MdWarning className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Weather Alert</h4>
                    <p className="text-sm text-amber-800 mb-3">
                      80% chance of heavy rainfall in next 48 hours. Move potted plants under shelter.
                    </p>
                    <button 
                      onClick={() => setWeatherAlert(false)}
                      className="text-xs text-amber-600 hover:text-amber-800 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Region Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MdLocationOn className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-gray-900">Your Region</h3>
              </div>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as Region)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barishal">Barishal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Khulna">Khulna</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
              
              {/* Regional Tip */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">📍 {selectedRegion} Tip:</span> {regionalTips[selectedRegion]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Tips & Planting Guide */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Care Tips Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Water Tip */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MdWaterDrop className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Watering Routine</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Check soil moisture before watering during monsoon. Use finger test - don't water if soil feels damp. Water maximum once daily.
                </p>
              </div>

              {/* Fertilizer Tip */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <MdGrass className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Fertilizer Guide</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Apply organic fertilizer before rainfall. Vermicompost or decomposed cow dung works best. Chemical fertilizers may wash away in rain.
                </p>
              </div>

              {/* Pest Control */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MdBugReport className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Pest Control</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Mix neem oil + mild soap in water for an effective spray. Apply every 7 days to keep pests and fungal diseases under control.
                </p>
              </div>

              {/* Protection Tip */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MdShield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Protection Measures</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Use polythene tunnels or cloches for young plants. Stake larger plants to prevent wind damage during storms.
                </p>
              </div>
            </div>

            {/* Monthly Planting Guide */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MdCalendarMonth className="w-6 h-6 text-green-600" />
                {getCurrentMonth()} Planting Guide
              </h3>
              
              <div className="space-y-6">
                {/* Plant Now */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <MdGrass className="w-5 h-5" />
                    ✅ What to Plant This Month
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {monthlyPlants.plantNow.map((plant, index) => (
                      <span key={index} className="px-4 py-2 bg-white text-green-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prepare Next Month */}
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                    <MdSchedule className="w-5 h-5" />
                    ⏳ Prepare for Next Month
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {monthlyPlants.prepareNext.map((plant, index) => (
                      <span key={index} className="px-4 py-2 bg-white text-amber-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Avoid Now */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                    <MdWarning className="w-5 h-5" />
                    ❌ Avoid Planting This Month
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {monthlyPlants.avoidNow.map((plant, index) => (
                      <span key={index} className="px-4 py-2 bg-white text-red-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                View Complete Guide
                <MdChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalTips;
