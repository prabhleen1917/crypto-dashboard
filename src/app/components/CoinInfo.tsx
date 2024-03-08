import axios from "axios";
import React, { useState } from "react";
import CandleStickChart from "./CandleStickChart";

interface Coin {
  id: string;
  days: number;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

interface CoinInfoProps {
  coin: Coin;
}

const timePeriods = [
  { label: "1D", value: 1 },
  { label: "1W", value: 7 },
  { label: "1M", value: 30 },
];

const CoinInfo: React.FC<CoinInfoProps> = ({ coin }) => {
  // State to keep track of selected time period
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[1].value); // Default to 1 week

  // Handler for time period button click
  const handleTimePeriodChange = (days: number) => {
    console.log('jjj',days)
    setSelectedTimePeriod(days);
  };

  return (
    <div className="bg-white dark:bg-[#1C1C25] flex flex-col rounded-[15px] w-[851px] p-8">
      <div className="flex justify-between items-start">
        <div className="flex justify-between w-1/3">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{coin.symbol.toUpperCase()}USDT</h1>
            <p>{coin.name}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">${coin.market_data.current_price.usd.toLocaleString()}</h1>
            {/* The percentage would likely come from an API, this is hard-coded */}
            <p>+23.6%</p>
          </div>
        </div>

        <div className="flex gap-4">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              className={`bg-gray-100 dark:bg-dark text-primary rounded-md font-bold text-sm p-2 ${selectedTimePeriod === period.value ? 'dark:bg-[#262C3038]' : ''}`}
              onClick={() => handleTimePeriodChange(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full pt-8">
        {/* Pass the selected time period to the CandleStickChart component */}
        <CandleStickChart id={coin.id} days={selectedTimePeriod} />
      </div>
    </div>
  );
};

export default CoinInfo;
