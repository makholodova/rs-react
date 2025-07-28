import type { FC } from 'react';
import './AboutPage.css';
import photo from './makholodova.jpg';
import GitHubIcon from '../../assets/icon-github.svg?react';
import RsSchoolIcon from '../../assets/rs-school-logo.svg?react';

const info = {
  name: 'Марина Холодова',
  role: 'Frontend Developer',
  github: 'https://github.com/makholodova',
  rsSchool: 'https://rs.school/courses/reactjs',
  githubUsername: 'makholodova',
  photo,
  bio: 'Я Марина, frontend-разработчик. Вдохновляюсь горами и сноубордом — это мой способ перезагрузки. В разработку пришла из интереса к веб-технологиям, который перерос в увлечение созданием удобных и современных интерфейсов. Мне нравится делать интерфейсы, которые понятны и приятны в использовании. В будущем хочу развиваться в направлении frontend и участвовать в создании полезных продуктов.',
};

const About: FC = () => (
  <div data-testid="about-page" className="about">
    <div className="about__content">
      <div className="about__photo-wrapper">
        <img src={info.photo} alt={info.name} className="about__photo" />
      </div>

      <div className="about__info">
        <h2 className="about__name">{info.name}</h2>
        <h3 className="about__role">{info.role}</h3>
        <p className="about__bio">{info.bio}</p>

        <a
          href={info.github}
          target="_blank"
          aria-label="Github"
          className="about__link--github"
          rel="noreferrer"
        >
          <GitHubIcon className="about__icon--github" />
          <span className="about__link-text">GitHub {info.githubUsername}</span>
        </a>
        <a
          href={info.rsSchool}
          target="_blank"
          aria-label="RS_Shool"
          className="about__link--rs-school"
          rel="noreferrer"
        >
          <RsSchoolIcon className="about__icon--rs-school" />
        </a>
      </div>
    </div>
  </div>
);

export default About;
