'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="🔍 Rechercher un objet..."
        value={value}
        onChange={handleChange}
        className="w-full p-3 pl-10 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <span className="absolute left-3 top-3 text-gray-400 text-lg">🔍</span>
    </div>
  );
}