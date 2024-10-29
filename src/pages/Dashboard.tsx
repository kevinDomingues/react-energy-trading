import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { apiURL } from "../constants/apiURL";

interface DashboardItem {
    tokenRef: string;
    ownerId: string;
    producerId: string;
    emissionDate: string;
    usableMonth: number;
    usableYear: number;
    regulatoryAuthorityID: string;
}

interface DashBoardResponse {
    response: DashboardItem[]
}

const Dashboard: FC = () => {
    const { token } = useAuth();
    const [data, setData] = useState<DashboardItem[]>([]);
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
          const token = localStorage.getItem("token");
  
          if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
          }
  
          const response = await axios.get<DashBoardResponse>(`${apiURL}/certificate/owned`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log(response.data);
          setData(response.data.response);
        } catch (error) {
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-500">{error}</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Token Ref</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Owner ID</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Producer ID</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Emission Date</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Month</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Year</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Regulatory Authority ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4">{item.tokenRef}</td>
                  <td className="py-3 px-4">{item.ownerId}</td>
                  <td className="py-3 px-4">{item.producerId}</td>
                  <td className="py-3 px-4">
                    {new Date(item.emissionDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="py-3 px-4">{item.usableMonth}</td>
                  <td className="py-3 px-4">{item.usableYear}</td>
                  <td className="py-3 px-4">{item.regulatoryAuthorityID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Dashboard;