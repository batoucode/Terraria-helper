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
        placeholder="Rechercher un objet..."
        value={value}
        onChange={handleChange}
        className="w-full p-3 pl-10 rounded-craft-input bg-paper border-2 border-brown-md text-craft-ink placeholder-brown-lt font-caveat text-[18px] shadow-craft focus:outline-none focus:border-green-dk transition"
      />
      <span className="absolute left-3 top-3 text-brown-lt text-lg">🔍</span>
    </div>
  );
}
