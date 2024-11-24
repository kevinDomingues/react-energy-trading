import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { apiURL } from "../constants/apiURL";
import SimpleBarChart from "../components/SimpleBarChart";
import SimplePieChart from "../components/SimplePieChart";
import SimpleLineChart from "../components/SimpleLineChart";
import MoneyResume from "../components/MoneyResume";

interface ConsumptionData {
  userId: string;
  consumptionYear: number;
  consumptionMonth: number;
  energyTypeId: number;
  energyConsumed: number;
}

type TransactionData = {
  fromUserId: string;
  price: number;
  toUserId: string;
  tokenRef: string;
  transactionDate: string;
  transactionId: string;
};

export interface TransactionGraphData {
  data: TransactionData[];
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
    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const [consumptionData, setConsumptionData] = useState<ConsumptionData[]>([]);
    const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [transactionLoading, setTransactionLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      setSelectedYear(e.target.value);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
          }
    
        setLoading(true);
  
        try {
          const response = await axios.get<ConsumptionData[]>(`${apiURL}/consumptions/${selectedYear}`, {
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
  
      fetchData();
    }, [selectedYear]);

    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
          }
    
        setTransactionLoading(true);
  
        try {
          const response = await axios.get<{response: TransactionData[]}>(`${apiURL}/certificate/${isBusinessAccount ? 'sold' : 'bought'}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setTransactionData(response.data.response);
        } catch (error) {
          setError("Failed to load data");
        } finally {
          setTransactionLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-500">{error}</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard</h1>

        <div className="mb-6 flex justify-center">
          <label htmlFor="year-select" className="mr-4 text-lg font-medium text-gray-700">
            Select Year:
          </label>
          <select
            id="year-select"
            className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="min-h-screen">
            <main className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    {isBusinessAccount ? "Sales" : "Energy consumption" } 
                  </h2>
                  <div className="h-64 flex justify-center items-center border-gray-300 rounded">
                  {transactionData && !transactionLoading ? (
                        <MoneyResume data={transactionData} />
                      ) : 
                      (
                        <p className="text-gray-400">No data to show</p>
                      )
                    }
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Certificates type
                  </h2>
                  <div className="h-64 flex justify-center items-center border-gray-300 rounded">
                    {consumptionData ? (
                        <SimplePieChart data={consumptionData} />
                      ) : 
                      (
                        <p className="text-gray-400">No data to show</p>
                      )
                    }
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    {isBusinessAccount ? "Sales" : "Consumption"} by month
                  </h2>
                  <div className="h-64 flex justify-center items-center border-gray-300 rounded">         
                    {consumptionData ? (
                        <SimpleBarChart data={consumptionData}/>
                      ) : 
                      (
                        <p className="text-gray-400">No data to show</p>
                      )
                    }
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Average price paid for certificates
                  </h2>
                  <div className="h-64 flex justify-center items-center border-gray-300 rounded">
                  {transactionData && !transactionLoading ? (
                        <SimpleLineChart data={transactionData}/>
                      ) : 
                      (
                        <p className="text-gray-400"> {transactionLoading ? 'Loading....' : 'No data to show'}</p>
                      )
                    }
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