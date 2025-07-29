import { type FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { CardProps } from 'types/components.ts';
import CircleLoader from 'components/CircleLoader/CircleLoader.tsx';
import { getRandomColorRGB } from '../../units/generate-colors.ts';
import { getPokemonImageUrl } from '../../units/pokemon-helpers.ts';
import './Card.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from '../../units/capitalize .ts';
import HeartIcon from '../../assets/heart.svg?react';
import {
  selectedItem,
  unselectedItem,
} from '../../store/selectedItemsSlice.ts';
import type { StoreState } from '../../store/store.ts';

const Card: FC<CardProps> = ({ name, id, weight, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = getPokemonImageUrl(id);
  const color = useMemo(() => getRandomColorRGB(), []);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const isSelected = useSelector((state: StoreState) =>
    state.selectedItems.items.some((item: CardProps) => item.id === id)
  );

  const handleClick = (): void => {
    navigate(`/pokemon/${id}${location.search}`);
  };

  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };

  const handleCheckboxChange = (): void => {
    if (isSelected) {
      dispatch(unselectedItem({ name, id, weight, height, imageUrl }));
    } else dispatch(selectedItem({ name, id, weight, height, imageUrl }));
  };

  return (
    <div onClick={handleClick} className="card">
      <label
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="card__label"
      >
        <input
          className="card__checkbox"
          type="checkbox"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={handleCheckboxChange}
        ></input>
        <HeartIcon />
      </label>
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
        <h3 className="card__title">{capitalize(name)}</h3>
        <div className="card__description">
          <p>weight: {weight};</p>
          <p>height: {height}; </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
