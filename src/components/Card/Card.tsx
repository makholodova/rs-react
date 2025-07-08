import { Component } from 'react';
import type { CardProps, CardState } from 'types/components.ts';
import CircleLoader from 'components/CircleLoader/CircleLoader.tsx';
import { getRandomColorRGB } from '../../units/generate-colors.ts';
import { getPokemonImageUrl } from '../../units/pokemon-helpers.ts';
import './Card.css';

export default class Card extends Component<CardProps, CardState> {
  color: string;

  constructor(props: CardProps) {
    super(props);
    this.state = {
      imageLoaded: false,
    };
    this.color = getRandomColorRGB();
  }

  handleImageLoad = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { name, id, weight, height } = this.props;
    const { imageLoaded } = this.state;
    const imageUrl = getPokemonImageUrl(id);

    return (
      <div className="card">
        <div className="card__image">
          {!imageLoaded && <CircleLoader />}
          <img
            className="card__sprite"
            src={imageUrl}
            alt={name}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={this.handleImageLoad}
          />
        </div>
        <div
          className="card__title-wrapper"
          style={{ backgroundColor: this.color }}
        >
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
  }
}
