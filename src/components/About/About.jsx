import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import PortfolioContext from '../../context/context';

const About = () => {
  const { about } = useContext(PortfolioContext);
  const { img, paragraphOne, paragraphTwo, paragraphThree } = about;

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
    <section id="about">
      <Container>
        <Title title="About Me" />
        <Row className="about-wrapper">
          <Col md={6} sm={12}>
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="about-wrapper__image">
                <AboutImg alt="profile picture" filename={img} />
              </div>
            </Fade>
          </Col>
          <Col md={6} sm={12}>
            <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
              <div className="about-wrapper__info">
                <p className="about-wrapper__info-text">{paragraphOne}</p>
                <p className="about-wrapper__info-text">{paragraphTwo}</p>
                <p className="about-wrapper__info-text">{paragraphThree}</p>
                <span className="d-flex mt-3">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn cta-btn--resume"
                    href="https://demo-portfolio-vids-gifs.s3.us-west-2.amazonaws.com/Bryan_Thomas_Resume.pdf"
                  >
                    Resume
                  </a>
                </span>
              </div>
            </Fade>
          </Col>
        </Row>
        <div className="skills-wrapper">
          <Row>
            <div className="skills">
              <h1>Skills</h1>
            </div>
          </Row>
          <Row>
            <div className="skills">
              <p>
                <strong>Languages:</strong> C#, JavaScript, TypeScript, Java, C/C++
              </p>
            </div>
          </Row>
          <Row>
            <div className="skills">
              <p>
                <strong>Software Development:</strong> Agile Development, Software Design, Data
                Structures, Quality Assurance, Continuous Integration, Continous Deployment, Service
                Oriented Architecture, MicroServices/Serverless Frameworks
              </p>
            </div>
          </Row>
          <Row>
            <div className="skills">
              <p>
                <strong>Technologies:</strong> React, .NET, Node, Jenkins, Amazon Web Services
                (AWS), Azure, Docker, Kibana, Jira
              </p>
            </div>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default About;
