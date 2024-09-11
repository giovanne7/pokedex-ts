import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = async (pokemonName: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};
