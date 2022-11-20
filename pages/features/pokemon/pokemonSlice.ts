import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { BASE_URL } from "../../../constant";
import axios from "axios";

interface PokemonState {
  pokemonList: {
    pokemons: any[];
    status: string;
    error: any;
  };
  wildPokemonList: {
    pokemons: any[];
    status: string;
    error: any;
  };
  pokemonDetail: {
    pokemon: any;
    status: string;
    error: any;
  };
}

const initialState: PokemonState = {
  pokemonList: {
    pokemons: [],
    status: "idle",
    error: null,
  },
  wildPokemonList: {
    pokemons: [],
    status: "idle",
    error: null,
  },
  pokemonDetail: { pokemon: {}, status: "idle", error: null },
} as PokemonState;

export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPokemonsList.pending, (state, action) => {
        state.pokemonList.status = "loading";
      })
      .addCase(fetchPokemonsList.fulfilled, (state, action) => {
        state.pokemonList.status = "successed";
        state.pokemonList.pokemons = action.payload.data;
      })
      .addCase(fetchPokemonsList.rejected, (state, action) => {
        state.pokemonList.status = "failed";
        state.pokemonList.error = action.error.message;
      })
      .addCase(fetchWildPokemonsList.pending, (state, action) => {
        state.wildPokemonList.status = "loading";
      })
      .addCase(fetchWildPokemonsList.fulfilled, (state, action) => {
        state.wildPokemonList.status = "successed";
        state.wildPokemonList.pokemons = action.payload.data;
      })
      .addCase(fetchWildPokemonsList.rejected, (state, action) => {
        state.wildPokemonList.status = "failed";
        state.wildPokemonList.error = action.error.message;
      })
      .addCase(updatePokemon.pending, (state, action) => {
        state.pokemonDetail.status = "loading";
      })
      .addCase(updatePokemon.fulfilled, (state, { payload }) => {
        state.pokemonDetail.pokemon = payload.data;
        state.pokemonDetail.status = "successed";
        alert("update thanh cong");
      })
      .addCase(updatePokemon.rejected, (state, action) => {
        state.pokemonDetail.status = "failed";
        state.pokemonDetail.pokemon = action.error.message;
      })
      .addCase(getPokemonDetail.pending, (state, action) => {
        state.pokemonDetail.status = "loading";
      })
      .addCase(getPokemonDetail.fulfilled, (state, action) => {
        state.pokemonDetail.status = "successed";
        state.pokemonDetail.pokemon = action.payload.data[0];
      })
      .addCase(getPokemonDetail.rejected, (state, action) => {
        state.pokemonDetail.status = "failed";
        state.pokemonDetail.error = action.error.message;
      });
  },
});

export const fetchPokemonsList = createAsyncThunk(
  "pokemons/fetchPokemons",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/api/pokemons?populate=*&filters%5BisWildPokemon%5D=false`
    );
    return response.data;
  }
);

export const fetchWildPokemonsList = createAsyncThunk(
  "pokemons/fetchWildPokemons",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/api/pokemons?populate=*&filters%5BisWildPokemon%5D=true`
    );
    return response.data;
  }
);

export const updatePokemon = createAsyncThunk(
  "pokemons/updatePokemon",
  async (data: any) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/pokemons/${data.id}`, {
        data: data.values,
      });
      return response.data;
    } catch (error: any) {
      return error;
    }
  }
);

export const getPokemonDetail = createAsyncThunk(
  "pokemons/getPokemonDetail",
  async (id: any) => {
    const response = await axios.get(
      `${BASE_URL}/api/pokemons?populate=*&filters%5Bid%5D=${id}`
    );
    console.log(response.data);
    return response?.data;
  }
);

export default pokemonSlice.reducer;

export const allPokemons = (state: any) =>
  state.pokemonsWiki.pokemonList.pokemons;

export const allWildPokemons = (state: any) =>
  state.pokemonsWiki.wildPokemonList.pokemons;

export const pokemonDetail = (state: any) =>
  state.pokemonsWiki.pokemonDetail.pokemon;
