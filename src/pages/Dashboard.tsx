import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { apiURL } from "../constants/apiURL";
import SimpleBarChart from "../components/SimpleBarChart";
import SimplePieChart from "../components/SimplePieChart";

interface ConsumptionData {
  userId: string;
  consumptionYear: number;
  consumptionMonth: number;
  energyTypeId: number;
  energyConsumed: number;
}

interface Filter {
  userId?: string;
  year?: number;
  month?: number;
  energyTypeId?: number;
}

export interface ConsumptionGraphProps {
  data: ConsumptionData[];
}

const consumptionDataExample = [
  {userId: "1", consumptionMonth: 12, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 1 },
  {userId: "1", consumptionMonth: 12, consumptionYear: 2024, energyConsumed: 200, energyTypeId: 2 },
  {userId: "1", consumptionMonth: 12, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 2 },
  {userId: "1", consumptionMonth: 11, consumptionYear: 2024, energyConsumed: 300, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 11, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 4 },
  {userId: "1", consumptionMonth: 10, consumptionYear: 2024, energyConsumed: 300, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 10, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 5 },
  {userId: "1", consumptionMonth: 9, consumptionYear: 2024, energyConsumed: 300, energyTypeId: 1 },
  {userId: "1", consumptionMonth: 9, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 2 },
  {userId: "1", consumptionMonth: 9, consumptionYear: 2024, energyConsumed: 1000, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 8, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 4 },
  {userId: "1", consumptionMonth: 8, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 5 },
  {userId: "1", consumptionMonth: 8, consumptionYear: 2024, energyConsumed: 1000, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 7, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 4 },
  {userId: "1", consumptionMonth: 7, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 5 },
  {userId: "1", consumptionMonth: 7, consumptionYear: 2024, energyConsumed: 1000, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 6, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 4 },
  {userId: "1", consumptionMonth: 5, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 5 },
  {userId: "1", consumptionMonth: 4, consumptionYear: 2024, energyConsumed: 1000, energyTypeId: 3 },
  {userId: "1", consumptionMonth: 3, consumptionYear: 2024, energyConsumed: 50, energyTypeId: 4 },
  {userId: "1", consumptionMonth: 2, consumptionYear: 2024, energyConsumed: 100, energyTypeId: 5 },
];

const Dashboard: FC = () => {
    const { token, isBusinessAccount } = useAuth();
    const [consumptionData, setConsumptionData] = useState<ConsumptionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
          }
    
        setLoading(true);
  
        try {
          const response = await axios.get<ConsumptionData[]>(`${apiURL}/consumptions/from/12/2024`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setConsumptionData(response.data);
        } catch (error) {
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      };
  
      //fetchData();
      setConsumptionData(consumptionDataExample);
    }, []);
  
/*     if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-500">{error}</p>; */
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard</h1>
        <div className="overflow-x-auto">
          <div className="min-h-screen">
            <main className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Energy consumption 
                  </h2>
                  <div className="h-64 flex justify-center items-center border border-dashed border-gray-300 rounded">
                    <p className="text-gray-400">Placeholder for Chart 1</p>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Certificates type
                  </h2>
                  <div className="h-64 flex justify-center items-center border border-dashed border-gray-300 rounded">
                    <SimplePieChart data={consumptionData} />
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Consumption by month
                  </h2>
                  <div className="h-64 flex justify-center items-center border-gray-300 rounded">
                    <SimpleBarChart data={consumptionData}/>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Price paid for last certificates
                  </h2>
                  <div className="h-64 flex justify-center items-center border border-dashed border-gray-300 rounded">
                    <p className="text-gray-400">Placeholder for Chart 4</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;