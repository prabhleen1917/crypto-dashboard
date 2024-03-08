"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Coins from './components/Coins';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

// Define the types for the data you expect to receive from the API
type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  image: string;
  price_change_percentage_24h: number;
};

const Home: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false
          }
        });
        setCoins(response.data);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

   // Filter coins based on the search term
   const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // Update the search term when the search input changes
   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
     <Navbar/>
      <Layout>
      <Head>
        <title>Crypto Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br/>
      <br/>
      <SearchBar searchQuery={searchTerm}
      handleSearchChange={handleSearch}/>
      </Layout>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        filteredCoins.map((coin) => (
          <Coins
            key={coin.id}
            id={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        ))
      )}
    </div>
  );
};

export default Home;
