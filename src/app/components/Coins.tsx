import React from 'react';
import Link from 'next/link';

interface CoinProps {
  name: string;
  symbol: string;
  image: string;
  price: number;
  volume: number;
  priceChange: number;
  marketcap: number;
  id:string
}

const Coins: React.FC<CoinProps> = ({
  name,
  symbol,
  image,
  price,
  volume,
  priceChange,
  marketcap,
  id
}) => {
  return (
    <Link href='/coin/[id]' as={`/coin/${id}`}>
    <div className="flex justify-between items-center bg-white shadow-md rounded-md my-2 mx-4 p-4">
      <div className="flex items-center space-x-3">
        <img src={image} alt={name} className="w-6 h-6" />
        <div>
          <h1 className="text-base font-medium">{name}</h1>
          <p className="text-sm text-gray-500 uppercase">{symbol}</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-base">${price.toLocaleString()}</p>
        <p className={`text-base font-semibold ${priceChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
          {priceChange.toFixed(2)}%
        </p>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <p className="text-sm text-gray-500">Mkt Cap</p>
        <p className="text-base">${marketcap.toLocaleString()}</p>
      </div>
    </div>
    </Link>
  );
};

export default Coins;
