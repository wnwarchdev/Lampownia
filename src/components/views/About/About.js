import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

import styles from './About.module.scss';

const Component = ({className}) => (
  <div className={styles.root}>
    <div className={styles.container}>
      <h1 className={styles.headerS}>lampownia</h1>
      <div className={styles.splash}>
        <div className={styles.logo}>
          <div className={styles.halfTop}></div>
          <div className={styles.halfBottom}></div>
        </div>
      </div>
      <h2>O NAS</h2>
      <p>
        Nie produkujemy naszych lamp - znajdujemy je. Każdy z nich ma do powiedzenia swoją historię.... a właściwie dwie: o swoim oryginalnym przeznaczniu na przestrzeni lat XX wieku, oraz historię odrestaurowania i przysposobienia do ponownego użycia. Praca, którą wykonujemy w naszej pracowni opiera się na poszanowaniu i zachowaniu dziedzictwa każdego pojedynczego przedmiotu.<br/><br/>
        Mamy trzy zasady przewodnie:<br/>
        <ul>
          <li>Uratować najlepsze oświetlenie przemysłowe XX wieku.<br/></li>
          <li>Przywrócić do życia każdy element z wyczuciem jego historii- bez uszczerbku dla jego charakteru.<br/></li>
          <li>Odnowić każdą oprawę aby spełniała najwyższe nowoczesne standardy użytkowania.<br/></li>
        </ul>
        
        
        
      </p>
      <h2>POZNAJMY SIĘ!</h2>
      <p>Wysyłamy nasze lampy do zadowolonych klientów w całym kraju. Jeśli masz pytanie dotyczące któregokolwiek z naszych produktów lub szukasz czegoś konkretnego, zawsze chętnie pomożemy. Czekamy na Ciebie w naszym studiu w Katowicach po wcześniejszym umówieniu się w godzinach 9:00-17:00 od poniedziałku do piątku.</p>
      <p>Skontaktuj się z nami:</p>
      <h4 className={styles.adress}><a href="mailto:hello@lampownia.pl">hello@lampownia.pl</a></h4>
      <h4 className={styles.adress}><a href="tel:+44 7768444795">+44 77 68 444 795</a></h4>

      <address className={styles.adress}>
        <a href="https://goo.gl/maps/s7W4sZRqss6Vy9wr8">
          Al. Roździeńskiego 199<br/>
          40-315 Katowice<br/>  
        </a>
      </address>
      <div className={styles.socialLinks}>
        <a href="facebook.com">
          <FacebookIcon className={styles.icon}/>
        </a>
        <a  href="youtube.com">
          <YouTubeIcon className={styles.icon}/>
        </a>
      </div>


      <Button
        className={styles.button}
        component={NavLink}
        exact
        to={`${process.env.PUBLIC_URL}/`}>
        Powrót
      </Button>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as About,
};