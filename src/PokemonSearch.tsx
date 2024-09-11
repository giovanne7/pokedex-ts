
import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch: React.FC = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (name: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setPokemonData(response.data);
      setError(null);
    } catch (err) {
      setError('Pokémon não encontrado');
      setPokemonData(null);
    }
  };

  const handleSearch = () => {
    if (pokemonName) {
      fetchPokemon(pokemonName);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Buscar Pokémon</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Digite o nome do Pokémon"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p><strong>Tipo(s):</strong> {pokemonData.types.map((type: any) => type.type.name).join(', ')}</p>
          <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
