import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

interface PokemonData {
  results: Array<{ name: string; url: string }>;
}

interface HomeProps {
  pokemon: Array<{ name: string; url: string; image: string }>;
}

export default function Home({ pokemon }: HomeProps) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <div className="w-20 h-20 mr-3">
                  <Image
                    src={pokeman.image}
                    alt={pokeman.name}
                    width={80}
                    height={80}
                  />
                </div>
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results }: PokemonData = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return { ...result, image };
    });
    return {
      props: {
        pokemon,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
