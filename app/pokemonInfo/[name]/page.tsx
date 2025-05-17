"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';

interface Attack {
  name: string;
  damage: number;
}

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface Pokemon {
  id: string;
  name: string;
  image: string;
  attacks: {
    special: Attack[];
    fast: Attack[];
  };
  evolutions: Evolution[];
}

function PokemonInfo() {
  const { name } = useParams();
  const [poke, setPoke] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://graphql-pokemon2.vercel.app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                pokemon(name: "${name}") {
                  id
                  name
                  image
                  attacks {
                   fast {
                      name
                      damage
                    }
                    special {
                      name
                      damage
                    }
                  }
                  evolutions {
                    id
                    name
                    image
                  }
                }
              }
            `,
          }),
        });

        const { data } = await res.json();
        setPoke(data.pokemon);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return
  <div className="flex items-center justify-center min-h-screen">
    Loading...
  </div>
  if (!poke) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center flex-col">
          <img src="/not_found.png" alt="Not Found" className="mb-6" />
          <h1 className="text-2xl font-bold mb-8">Pokemon Not Found</h1>
          <Link href="/" className='bg-gradient-to-r from-yellow-500 to-orange-400 text-white h-[32px] w-fit flex items-center rounded-md mt-6 p-2 ml-3'>Back</Link>

        </div>
      </div>
    );
  }

  return (
    <div className='container text-center mx-auto '>

      <div className='flex flex-col items-center justify-center '>
        <div className="flex justify-center items-center ">
          <h1 className="text-3xl font-bold">{poke.name}</h1>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="flex justify-center flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Fast Attacks</h2>
            <div>
              {poke.attacks.fast.map((atk) => (
                <div key={atk.name}>
                  {atk.name} - {atk.damage} dmg
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={poke.image} alt={poke.name} className="my-4 w-64" />
          </div>
          <div className="flex justify-center flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Special Attacks</h2>
            <ul>
              {poke.attacks.special.map((atk) => (
                <li key={atk.name}>
                  {atk.name} - {atk.damage} dmg
                </li>
              ))}
            </ul>
          </div>
        </div>

        {poke.evolutions?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Evolutions</h2>
            <div className="flex gap-4 mt-2 justify-center flex-row mb-6">
              {poke.evolutions.map((evo) => (
                <div
                  key={evo.id}
                  className="cursor-pointer text-center border-1  border-gray-300 p-4 rounded-md h-32 flex flex-col items-center justify-center shadow-md transition hover:shadow-lg"
                  onClick={() => router.push(`/pokemonInfo/${evo.name.toLowerCase()}`)}
                >
                  <img src={evo.image} alt={evo.name} className="h-[64px] w-[64px]" />
                  <p>{evo.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      <Link href="/" className='bg-gradient-to-r from-yellow-500 to-orange-400 text-white h-[32px] w-fit flex items-center rounded-md mt-6 p-2 ml-3'>Back</Link>
      </div>

    </div>

  );
}

export default PokemonInfo;
