import { type FC, useMemo, useState } from 'react';
import type { CardProps } from 'types/components.ts';
import CircleLoader from 'components/CircleLoader/CircleLoader.tsx';
import { getRandomColorRGB } from '../../units/generate-colors.ts';
import { getPokemonImageUrl } from '../../units/pokemon-helpers.ts';
import './Card.css';

const Card: FC<CardProps> = ({ name, id, weight, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = getPokemonImageUrl(id);
  const color = useMemo(() => getRandomColorRGB(), []);

  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };

  return (
    <div className="card">
      <div className="card__image">
        {!imageLoaded && <CircleLoader />}
        <img
          className="card__sprite"
          src={imageUrl}
          alt={name}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="card__title-wrapper" style={{ backgroundColor: color }}>
        <h3 className="card__title">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <div className="card__description">
          <p>weight: {weight};</p>
          <p>height: {height}; </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
