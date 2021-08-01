import { nanoid } from 'nanoid';
import pawesomeGif from '../images/pawesome-demo.gif';

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
    'I started my career in quality engineering and test automation as a Software Development Engineer in Test. Today I am working towards expanding my knowledge of software development in relation to web development and DevOps in industy.',
  paragraphTwo:
    'My passions are full stack web development and building out tools/processes that assist with continous integration and the development lifecycle.',
  paragraphThree:
    'I am currently deveopling my skills in React JS, .NET Core, and the AWS Public Cloud',
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'ttp_Project.png',
    title: 'Painting Estimate Web App',
    info:
      'Built to allow painting company to provide more consistent estimates and save historical data.',
    info2:
      'AWS Lambda, Dynamo DB, S3 Buckets, Amplify, React JS, useState Hook, React Bootstrap, React Router',
    url:
      'https://demo-portfolio-vids-gifs.s3-us-west-2.amazonaws.com/PaintingEstimateApp/paintingEstimateApp.mp4',
    repo: 'https://github.com/BryanMThomas/ToddThomasPaintingApp',
  },
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
    img: 'bryx_Project.png',
    title: 'bryx Real Estate Site',
    info: 'Introductory project used to learn about developing a web app using AWS and React JS.',
    info2:
      'AWS Lambda, Dynamo DB, S3 Buckets, Amplify, React JS, useState Hook, React Bootstrap, React Router',
    url: 'https://main.d3svg2y1msp5x4.amplifyapp.com/',
    repo: 'https://github.com/BryanMThomas/bryx-project',
  },
  {
    id: nanoid(),
    img: 'pawesome.png',
    title: 'Pawesome Dog Adoption Matching',
    info: 'Learning project used to expand knowledge of React JS and state hooks abilities.',
    info2:
      'React JS, AWS Lambda, Dynamo DB, S3 Buckets, useState Hook, useEffect Hook, React Router',
    url: pawesomeGif,
    repo: 'https://github.com/BryanMThomas/pawesome',
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
