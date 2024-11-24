export const fallbackColor = "bdbdbd";

export const labelToColor = {
    Solar: '#ffad46',
    Wind: '#82ca9d',
    Hydro: '#73c2fb',
    Biomass: '#96742f',
    Geothermal: '#4f2f06',
    Other: '#bdbdbd',
  }

export const sortDataByDate = (data: Array<{ [key: string]: string | number }>) => {
    return data.sort((a, b) => {
        const [monthA, yearA] = a.name.toString().split("-").map(Number);
        const [monthB, yearB] = b.name.toString().split("-").map(Number);

        const dateA = new Date(yearA, monthA - 1);
        const dateB = new Date(yearB, monthB - 1);

        return dateB.getTime() - dateA.getTime();
    });
};

export const transformConsumptionData = (consumptionData: any[]): Array<{ [key: string]: string | number }>  => {
    const groupedData = consumptionData.reduce((acc, item) => {
        const name = `${item.consumptionMonth}-${item.consumptionYear}`;
        
        if (!acc[name]) {
        acc[name] = { name };
        }

        const energyTypeKey = getEnergyTypeKey(item.energyTypeId);
        acc[name][energyTypeKey] = (acc[name][energyTypeKey] || 0) + item.energyConsumed;

        return acc;
    }, {}
);

return Object.values(groupedData);
};

export const aggregatedData = (consumptionData: any[]) => {
    const aggregatedData = consumptionData.reduce((acc, entry) => {
      for (const key in entry) {
        if (key === "energyTypeId") {
          const energyTypeKey = getEnergyTypeKey(parseInt(entry.energyTypeId))
          acc[energyTypeKey] = (acc[energyTypeKey] || 0) + entry.energyConsumed;
        }
      }
      return acc;
    }, {});
  
    const transformedData = Object.keys(aggregatedData).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: aggregatedData[key],
    }));
  
    return transformedData;
  };

export const getEnergyTypeKey = (energyTypeId: number) => {
    switch (energyTypeId) {
        case 1:
        return 'Solar';
        case 2:
        return 'Wind';
        case 3:
        return 'Hydro';
        case 4:
        return 'Geothermal';
        case 5:
        return 'Biomass'
        default:
        return 'Other';
    }
};