/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import "../styles/Home.scss";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  allPokemons,
  fetchPokemonsList,
  allWildPokemons,
  fetchWildPokemonsList,
} from "./features/pokemon/pokemonSlice";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import CarouselHeader from "../components/carouselHeader";
import Header from "../components/header";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CaretUpOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "../constant";
import { useRouter } from "next/router";

const { Meta } = Card;

export default function Home() {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(allPokemons);
  const wildPokemons = useAppSelector(allWildPokemons);
  const [isLoading, setisLoading] = useState<boolean>(false);
  let router = useRouter();

  const pokemonListStatus = useAppSelector(
    (state: any) => state.pokemonsWiki.pokemonList.status
  );

  const wildPokemonListStatus = useAppSelector(
    (state: any) => state.pokemonsWiki.wildPokemonList.status
  );

  const pokemonListError = useAppSelector(
    (state: any) => state.pokemonsWiki.pokemonList.error
  );

  useEffect(() => {
    switch (pokemonListStatus) {
      case "idle":
        dispatch(fetchPokemonsList());
        break;
      case "loading":
        setisLoading(true);
      case "successed":
        getWildPokemonList();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonListStatus, dispatch]);

  const getWildPokemonList = () => {
    switch (wildPokemonListStatus) {
      case "idle":
        dispatch(fetchWildPokemonsList());
        break;
      case "loading":
      case "successed":
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
        break;
      default:
        break;
    }
  };

  const trainingPokemon = (id: string) => {
    console.log("traning: ", id);
  };

  const catchPokemon = (id: string) => {
    console.log("catch pokemon: ", id);
  };

  const freePokemon = (id: string) => {
    console.log("free pokemon: ", id);
  };

  const customPokemon = (id: string) => {
    console.log("custom pokemon: ", id);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="main">
          <Header data={pokemons} />
          <h2 style={{ marginLeft: "10px" }}>Collection details:</h2>
          <div className="pokemon-list-wrap">
            {pokemons?.map((pokemon: any, index: number) => {
              let attributes = pokemon?.attributes;
              let pokemonTypes = "";
              attributes?.pokemon_types?.data?.forEach(
                (type: any, index: number) => {
                  pokemonTypes += `${index > 0 ? ", " : ""}${
                    type?.attributes?.typeName
                  }`;
                }
              );
              return (
                <Card
                  key={index}
                  style={{ width: 300 }}
                  cover={
                    <Image
                      className="pokemon-avatar"
                      alt="example"
                      width={300}
                      height={300}
                      src={`${
                        attributes?.animationDefault ||
                        "https://picsum.photos/200/300"
                      }`}
                      onClick={() =>
                        router.push(`/features/pokemon/${pokemon?.id}`)
                      }
                    />
                  }
                  actions={[
                    <CaretUpOutlined
                      key="traning"
                      onClick={() => trainingPokemon(pokemon?.id)}
                    />,
                    <EditOutlined
                      key="to-detail"
                      onClick={() =>
                        router.push(`/features/pokemon/${pokemon?.id}`)
                      }
                    />,
                    <LogoutOutlined
                      key="freePokemon"
                      onClick={() => freePokemon(pokemon?.id)}
                    />,
                  ]}
                >
                  <Meta
                    title={
                      attributes?.customNameByUser
                        ? attributes?.customNameByUser
                        : attributes?.name
                    }
                    description={pokemonTypes}
                  />
                </Card>
              );
            })}
          </div>
          <h2 style={{ marginLeft: "10px" }}>Wild Pokemon:</h2>
          <div className="pokemon-list-wrap">
            {wildPokemons?.map((pokemon: any, index: number) => {
              let attributes = pokemon?.attributes;
              let pokemonTypes = "";
              attributes?.pokemon_types?.data?.forEach(
                (type: any, index: number) => {
                  pokemonTypes += `${index > 0 ? ", " : ""}${
                    type?.attributes?.typeName
                  }`;
                }
              );
              return (
                <Card
                  key={index}
                  style={{ width: 300 }}
                  cover={
                    <Image
                      alt="example"
                      width={300}
                      height={300}
                      src={`${
                        attributes?.animationDefault ||
                        "https://picsum.photos/200/300"
                      }`}
                    />
                  }
                  actions={[
                    <PlusCircleOutlined
                      key="catchPokemon"
                      onClick={() => catchPokemon(pokemon?.id)}
                    />,
                  ]}
                >
                  <Meta
                    title={
                      attributes?.customNameByUser
                        ? attributes?.customNameByUser
                        : attributes?.name
                    }
                    description={pokemonTypes}
                  />
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
