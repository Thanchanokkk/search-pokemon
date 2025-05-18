"use client";

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image'

interface Pokemon {
    id: string;
    name: string;
    image: string;
}

const PokemonData = () => {
    const [poke, setPoke] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPoke = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://graphql-pokemon2.vercel.app", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: `query { pokemons(first: 30) { id name image } }` }),
                });
                const { data } = await res.json();
                setPoke(data.pokemons);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPoke();
    }, []);


    return (
         <div className='container text-center mx-auto'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='grid grid-cols-5'>
          {poke.map((val, index) => (
            <Link key={val.name} href={`/pokemonInfo/${val.name}`}>
              <div className='flex justify-center items-center shadow-md transition cursor-pointer hover:shadow-lg m-3 rounded-md'>
                <div>
                  <h3>{val.name}</h3>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                    width={150}
                    height={150}
                    alt={val.name}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    );
};
export default PokemonData;