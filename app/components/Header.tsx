'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const [pokeName, setPokeName] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPokeName(e.target.value);
  };

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = pokeName.trim().toLowerCase();
    if (!trimmedName) {
      alert('Please enter a Pokémon name.');
      return;
    }
    router.push(`/pokemonInfo/${trimmedName}`);
  };

  return (
    <header className="bg-gradient-to-r from-yellow-500 to-orange-400 text-pink h-[300px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">Pokemon Website</h1>
        <p className="mt-4 text-lg text-white">Search Pokemon Name</p>
        <form onSubmit={handleForm} className="flex mt-2">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-white shadow-md bg-transparent placeholder-white"
            placeholder="Pokemon Name..."
            onChange={handleInput}
            value={pokeName}
          />
          <button
            type="submit"
            className="inline-flex items-center mx-2 px-4 py-2 rounded-md bg-green-500 text-white shadow-md"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
