import type { FC } from 'react';
import './AboutPage.css';
import photo from './makholodova.jpg';
import GitHubIcon from '../../assets/icon-github.svg?react';
import RsSchoolIcon from '../../assets/rs-school-logo.svg?react';

const info = {
  name: 'Marina Kholodova',
  role: 'Frontend Developer',
  github: 'https://github.com/makholodova',
  rsSchool: 'https://rs.school/courses/reactjs',
  githubUsername: 'makholodova',
  photo,
  bio: "I'm Marina, a frontend developer. I'm inspired by mountains and snowboarding — it's my way to recharge. I got into development out of curiosity about web technologies, which grew into a passion for creating modern and user-friendly interfaces. I enjoy building interfaces that are intuitive and pleasant to use. In the future, I want to grow as a frontend specialist and contribute to creating meaningful and useful products.",
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
