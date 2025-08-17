import type { FC } from 'react';
import Image from 'next/image';
import styles from './AboutPage.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const info = {
  github: 'https://github.com/makholodova',
  rsSchool: 'https://rs.school/courses/reactjs',
  githubUsername: 'makholodova',
  photo: '/makholodova.jpg',
};

const AboutPage: FC = () => {
  const t = useTranslations('About');
  return (
    <div data-testid="about-page" className={styles['about']}>
      <div className={styles['about__content']}>
        <div className={styles['about__photo-wrapper']}>
          <Image
            src={info.photo}
            alt={t('name')}
            width={150}
            height={150}
            className={styles['about__photo']}
          />
        </div>

        <div className={styles['about__info']}>
          <h2 className={styles['about__name']}>{t('name')}</h2>
          <h3 className={styles['about__role']}>{t('role')}</h3>
          <p className={styles['about__bio']}>{t('bio')}</p>

          <Link
            href={info.github}
            target="_blank"
            aria-label="Github"
            className={styles['about__link--github']}
            rel="noreferrer"
          >
            <Image src="/icon-github.svg" alt="GitHub" width={24} height={24} />
            <span className={styles['about__link-text']}>
              GitHub {info.githubUsername}
            </span>
          </Link>
          <Link
            href={info.rsSchool}
            target="_blank"
            aria-label="RS_Shool"
            className={styles['about__link--rs-school']}
            rel="noreferrer"
          >
            <Image
              src="/rs-school-logo.svg"
              alt="RS School"
              width={65}
              height={24}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
