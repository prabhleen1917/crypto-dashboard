"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
// import CoinInfo from '../../components/CoinInfo';

// Define the structure of the coin data expected from the API
interface CoinData {
  image: { large: string };
  name: string;
  symbol: string;
  market_data: { current_price: { usd: number } };
  subreddit_url: string;
  market_cap_rank: number;
}

const CoinPage: React.FC = () => {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Extract `id` from the URL
    const id = window.location.pathname.split('/').pop();

    const fetchCoinData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<CoinData>(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log("rrr",response.data);
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Failed to load data.');
      }
      setIsLoading(false);
    };

    if (id) {
      fetchCoinData();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coin) return <div>No coin data available.</div>;

  return (
    <Layout>
      <div className="flex justify-center items-center h-3/4">
        <div className="flex flex-col items-center justify-center border border-[#2fffe5] rounded-lg p-16 w-[400px]">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="mb-4"
          />
          <h1 className="text-2xl  mb-4">Name : {coin.name}</h1>
          <p className="text-2xl  mb-4">Symbol: {coin.symbol}</p>
          <p className="text-2xl  mb-4">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
          <p className="text-2xl  mb-4">Rank: {coin.market_cap_rank}</p>
        </div>
      </div>
      {/* <CoinInfo/> */}
    </Layout>
  );
};

export default CoinPage;
