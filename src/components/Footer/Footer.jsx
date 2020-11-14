import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <span className="back-to-top">
          <Link to="hero" smooth duration={1000}>
            <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
          </Link>
        </span>
        <hr />
        <p className="footer__text">Built by Bryan Thomas</p>
        <p className="footer__text">
          Source code for this portfolio can be found on my{' '}
          <a
            href="https://github.com/BryanMThomas/BryanMThomas.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.io repo
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
