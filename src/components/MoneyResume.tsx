import { FC } from "react";
import { TransactionGraphData } from "../pages/Dashboard";
import { getTotalAmount, transactionsByMonth } from "../constants/transactionUtils";
import { useAuth } from "../providers/AuthProvider";

const MoneyResume: FC<TransactionGraphData> = ({
    data
}) => {
    const { isBusinessAccount } = useAuth();
    const typeOfSale = isBusinessAccount ? "earned" : "spent"
    const transformedData = transactionsByMonth(data);

    const totalAmount = getTotalAmount(transformedData);

    return (
        <div className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-white shadow rounded-lg p-6 text-center min-h-full content-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Money {typeOfSale}</h3>
                <p className="text-2xl font-bold text-green-500">{totalAmount} €</p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Money {typeOfSale} Last Month</h3>
                    <p className="text-2xl font-bold text-blue-500">{transformedData[0].total} €</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Average Price Last Month</h3>
                    <p className="text-2xl font-bold text-purple-500">{transformedData[0].avg} €</p>
                </div>
            </div>
        </div>
    );
}

export default MoneyResume;