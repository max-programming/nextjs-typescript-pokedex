import Layout from "../components/Layout";
import Link from "next/link";
// import Image from "next/image";
import { GetServerSideProps } from "next";

interface PokemanData {
  name: string;
  image: string;
  height: number;
  id: number;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  weight: number;
}

interface PokemonProps {
  pokeman: PokemanData;
}

export default function Pokemon({ pokeman }: PokemonProps) {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <img src={pokeman.image} alt={pokeman.name} className="mx-auto" />
      {/* <Image
          src={pokeman.image}
          alt={pokeman.name}
          width={215}
          height={215}
          className="rounded-full"
        /> */}
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {pokeman.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {pokeman.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokeman.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman: PokemanData = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: {
        pokeman,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
