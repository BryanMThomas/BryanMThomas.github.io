import { nanoid } from 'nanoid';
import pdf from '../images/resume/Bryan_Thomas_Resume.pdf';

// HEAD DATA
export const headData = {
  title: 'Bryan Thomas | Software Engineer',
  lang: 'en',
  description: 'Welcome to my portfolio',
};

// HERO DATA
export const heroData = {
  name: 'Bryan Thomas',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'I started my career in quality engineering and test automation as a Software Development Engineer in Test. Today I am working towards expanding my knowledge of software development in industy.',
  paragraphTwo:
    'My passions are full stack web development and building out tools/processes that assist with continous integration and the development lifecycle.',
  paragraphThree:
    'I am currently deveopling my skills in React JS, .NET Core, and the AWS Public Cloud',
  resume: pdf,
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'VR_Airspace_Project.png',
    title: 'VR Airspace Control Tower',
    info:
      'VR team project completed in conjunction with General Dynamics to establish remote airspace in Virtual Reality. Created the ability to remotely control an airspace with access to realtime data including flight patterns, aircraft location, radio transmissiond, and view of the tarmac.',
    info2: 'AWS EC2 Instances, Swagger API, Node JS, Unity / C#',
    url:
      'https://demo-portfolio-vids-gifs.s3-us-west-2.amazonaws.com/VR_Airspace_Project/VR_Airspace_Project.mp4',
    repo: 'https://github.com/BryanMThomas/VR_AirSpace_Project',
  },
  {
    id: nanoid(),
    img: 'Burger_Builder_Project.png',
    title: 'Burger Builder',
    info: 'Introductory project used to learn about React and managing state.',
    info2: 'React JS',
    repo: 'https://github.com/BryanMThomas/burger-builder',
  },
];

// CONTACT DATA
export const contactData = {
  cta: 'Want to get in touch?',
  btn: 'Shoot Me An Email!',
  email: 'thomas.bryan.m@gmail.com',
  subtext: 'Or check me out on Github or LinkedIn',
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/bryan-m-thomas/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/BryanMThomas',
    },
  ],
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/bryan-m-thomas/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/BryanMThomas',
    },
  ],
};
