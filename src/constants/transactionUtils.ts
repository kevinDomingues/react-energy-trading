type DayData = {
    date: string;
    totalSpent: number;
    count: number;
  };

export const transactionsByMonth = (transactions: any[]) => {
    const aggregatedMap: { [key: string]: { totalSpent: number; count: number } } = {};
  
    transactions.forEach((transaction) => {
      const date = new Date(transaction.transactionDate);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  
      if (!aggregatedMap[yearMonth]) {
        aggregatedMap[yearMonth] = { totalSpent: 0, count: 0 };
      }
  
      aggregatedMap[yearMonth].totalSpent += transaction.price;
      aggregatedMap[yearMonth].count += 1;
    });
  
    const aggregatedData = Object.entries(aggregatedMap).map(([name, data]) => ({
      name,
      total: data.totalSpent,
      avg: data.totalSpent / data.count,
    }));
  
    aggregatedData.sort((a, b) => {
        return new Date(a.name).getTime() - new Date(b.name).getTime();
    });
  
    return aggregatedData;
  }

export const transactionsByDay = (transactions: any[]) => {
    const transactionsGrouped: Record<string, DayData> = {};
    transactions.forEach((transaction) => {
        const originalDate = transaction.transactionDate.split("T")[0];
        const [year, month, day] = originalDate.split("-");
        const date = `${day}-${month}-${year}`;
        if(!transactionsGrouped[date]) {
            transactionsGrouped[date] = {
                date,
                totalSpent: 0,
                count: 0,
            }
        }
        transactionsGrouped[date].totalSpent += transaction.price;
        transactionsGrouped[date].count += 1;
    });

    const transformedData = Object.values(transactionsGrouped).map((dayData) => ({
        name: dayData.date,
        total: dayData.totalSpent.toFixed(2),
        avg: (dayData.totalSpent / dayData.count).toFixed(2),
      }));

      transformedData.sort((a, b) => {
        return new Date(a.name).getTime() - new Date(b.name).getTime();
    });

    return transformedData;
}

export const getTotalAmount = (transactionsTransformed: any[]) => {
    let totalAmount = 0;
    transactionsTransformed.forEach((transaction) => {
        totalAmount = transaction.total + totalAmount;
    })

    return totalAmount;
}