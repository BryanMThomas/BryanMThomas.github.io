import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';
import avatar from '../../images/bryan-avatar.png';

const Header = () => {
  const { hero } = useContext(PortfolioContext);
  const { name } = hero;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h1 className="hero-title">
            <span>Hi, my name is </span>
            <span className="text-color-main">{name}</span>
            <br />
            <span>I am a Software Development Engineer.</span>
          </h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <Link to="about" smooth duration={1000}>
                Find out more
              </Link>
            </span>
          </p>
        </Fade>
        <img className="hero-avatar" src={avatar} alt="Bryan Avatar" />
      </Container>
    </section>
  );
};

export default Header;
