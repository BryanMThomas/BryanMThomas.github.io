import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { cta, btn, email, subtext, networks } = contact;

  return (
    <section id="contact">
      <Container>
        <Title title="Contact" />
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">
              {cta || 'Would you like to work with me? Awesome!'}
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--resume"
              href={`mailto:${email}`}
            >
              {btn || "Let's Talk"}
            </a>
          </div>
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">{subtext}</p>
          </div>
          <div className="social-links">
            {networks &&
              networks.map((network) => {
                const { id, name, url } = network;
                return (
                  <a
                    key={id}
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={name}
                  >
                    <i className={`fa fa-${name || 'refresh'} fa-inverse`} />
                  </a>
                );
              })}
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
