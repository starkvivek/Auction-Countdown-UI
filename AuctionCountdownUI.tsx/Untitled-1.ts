// AuctionCountdownUI.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import './App.css'; // Use Tailwind for styling

interface Bid {
  name: string;
  amount: number;
  timestamp: string;
}

interface AuctionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  endTime: number;
  bids: Bid[];
}

const mockItems: AuctionItem[] = [
  {
    id: 1,
    title: 'Antique Vase',
    description: 'A beautiful porcelain vase from the 18th century.',
    image: 'https://via.placeholder.com/150',
    endTime: Date.now() + 300000,
    bids: []
  },
  {
    id: 2,
    title: 'Vintage Watch',
    description: 'A rare vintage wristwatch from 1950.',
    image: 'https://via.placeholder.com/150',
    endTime: Date.now() + 450000,
    bids: []
  }
];

const AuctionCountdownUI = () => {
  const [items, setItems] = useState<AuctionItem[]>(mockItems);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => prevItems.map(item => {
        const randomBid = Math.random() < 0.3; // 30% chance of new bid
        if (Date.now() >= item.endTime || !randomBid) return item;

        const newBid: Bid = {
          name: User${Math.floor(Math.random() * 100)},
          amount: (item.bids[0]?.amount || 100) + Math.floor(Math.random() * 50 + 10),
          timestamp: new Date().toLocaleTimeString()
        };

        const updatedBids = [newBid, ...item.bids];

        return { ...item, bids: updatedBids };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNewBid = (itemId: number, name: string, amount: number) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id !== itemId || Date.now() >= item.endTime) return item;
      if (amount <= (item.bids[0]?.amount || 0)) return item;

      const newBid: Bid = {
        name,
        amount,
        timestamp: new Date().toLocaleTimeString()
      };

      return { ...item, bids: [newBid, ...item.bids] };
    }));
  };

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Auction Countdown UI</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 p-4">
        {items.map(item => {
          const timeLeft = Math.max(0, item.endTime - Date.now());
          const seconds = Math.floor((timeLeft / 1000) % 60);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const highestBid = item.bids[0];

          return (
            <motion.div key={item.id} className="p-4 border rounded-xl shadow-xl bg-gray-100 dark:bg-gray-800">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />