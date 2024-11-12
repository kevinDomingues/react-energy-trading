import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { apiURL } from "../constants/apiURL";
import { Link } from "react-router-dom";

interface CertificateItem {
    energyCertificateId: string;
    ownerId: string;
    producerId: string;
    emissionDate: string;
    usableMonth: number;
    usableYear: number;
    regulatoryAuthorityID: string;
}

interface CertificatesResponse {
    response: CertificateItem[]
}

interface LinkToCreateCertificateProps {
  isBusinessAccount: boolean;
  loading: boolean;
}

const LinkToCreateCertificate: FC<LinkToCreateCertificateProps> = ({isBusinessAccount, loading}) => (
  <div className="p-4 w-full container mx-auto text-center">
    <Link to={isBusinessAccount ? "/create-certificate" : "/request-certificate"}>
      <button
        type="submit"
        disabled={loading}
        className="w-44 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
      >
        {isBusinessAccount ? "Create Certificate" : "Buy certificate"}
      </button>
    </Link>
  </div>
)

const OwnedCertificates: FC = () => {
    const { token } = useAuth();
    const [data, setData] = useState<CertificateItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { isBusinessAccount } = useAuth();

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
  
          const response = await axios.get<CertificatesResponse>(`${apiURL}/certificate/owned`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setData(response.data.response);
        } catch (error) {
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p className="container mx-auto text-center p-4">Loading...</p>;
    if (error) return <p className="container mx-auto text-center p-4 text-red-500">{error}</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">Owned certificates</h1>
        <div className="overflow-x-auto">
          {data.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Owner ID</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Producer ID</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Emission Date</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Month</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Year</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4">{item.ownerId}</td>
                  <td className="py-3 px-4">{item.producerId}</td>
                  <td className="py-3 px-4">
                    {new Date(item.emissionDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="py-3 px-4">{item.usableMonth}</td>
                  <td className="py-3 px-4">{item.usableYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <div className="container mx-auto">
              <div className="text-center p-4 text-red-500">
                It seems like there is no data
              </div>
            </div>
          )}
        </div>
        <LinkToCreateCertificate loading={loading} isBusinessAccount={isBusinessAccount} />
      </div>
    );
  };
  
  export default OwnedCertificates;