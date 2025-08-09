import { type FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '../../assets/close.svg?react';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import CircleLoader from 'components/CircleLoader/CircleLoader.tsx';
import PokemonLoader from 'components/PokemonLoader/PokemonLoader.tsx';
import './PokemonDetail.css';
import { capitalize } from '../../units/capitalize.ts';
import { pokemonApi, useGetPokemonByIdQuery } from 'api/pokemon.ts';
import { useDispatch } from 'react-redux';
import RefreshIcon from '../../assets/refresh.svg?react';

const PokemonDetail: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = (): void => {
    navigate({
      pathname: '/',
      search: location.search,
    });
  };
  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };
  const handleRefresh = (): void => {
    dispatch(pokemonApi.util.invalidateTags([{ type: 'Pokemon', id }]));
  };
  const {
    data: pokemon,
    isFetching,
    error,
  } = useGetPokemonByIdQuery(numericId);

  if (isFetching) return <PokemonLoader />;
  if (error || !pokemon)
    return (
      <div>
        <BaseButton className="close-button" onClick={handleClose}>
          <CloseIcon />
        </BaseButton>
        <div>Pokemon not found</div>
      </div>
    );

  return (
    <>
      <div className="pokemon-detail__controls">
        <BaseButton className="refresh__button" onClick={handleRefresh}>
          <RefreshIcon className="refresh__icon" />
        </BaseButton>
        <BaseButton className="close-button" onClick={handleClose}>
          <CloseIcon />
        </BaseButton>
      </div>

      <div className="pokemon-detail">
        <div className="pokemon-detail__image">
          {!imageLoaded && <CircleLoader />}
          <img
            className="pokemon-detail__img"
            src={pokemon.image}
            alt={pokemon.name}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        </div>

        <h3 className="pokemon-detail__name">{capitalize(pokemon.name)}</h3>

        <div className="pokemon-detail__info">
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <div className="pokemon-detail__block">
            <strong>Types:</strong>
            <div className="pokemon-detail__types">
              {pokemon.types?.map((type) => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="pokemon-detail__block">
            <strong>Abilities:</strong>
            <p>{pokemon.abilities?.join(', ')}</p>
          </div>

          <div className="pokemon-detail__block">
            <strong>Stats:</strong>
            <ul className="pokemon-detail__stats">
              {pokemon.stats?.map((stat) => (
                <li key={stat.name}>
                  {capitalize(stat.name)}: {stat.base}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonDetail;
