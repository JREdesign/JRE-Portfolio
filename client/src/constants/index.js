import linkedInIcon from "../assets/linkedin.png"; // Asume la ruta correcta de tu icono
import gitHubIcon from "../assets/github.png"; // Asume la ruta correcta de tu icono
import emailIcon from "../assets/email.png"; // Asume la ruta correcta de tu icono
import {
  mobile,
  backend,
  creator,
  web,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre mi",
  },
  {
    id: "work",
    title: "Mi trabajo",
  },
  {
    id: "contact",
    title: "Contacto",
  },
  {
    id: "portfoliodesign",
    title: "Portfolio Diseño",
    url: "https://jredesigner.wordpress.com/",
  },
];

const services = [
  {
    title: "Diseño Gráfico",
    icon: web,
  },
  {
    title: "Jr. en Desarrollo Web Full Stack",
    icon: mobile,
  },
  {
    title: "Tecnologias inmersivas",
    icon: backend,
  },
  {
    title: "Diseño UI/UX",
    icon: creator,
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jorge-rev-eug/",
    icon: linkedInIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/JREdesign",
    icon: gitHubIcon,
  },
  {
    name: "Email",
    url: "mailto:jr.eugerciosl@gmail.com",
    icon: emailIcon,
  },
];

export { services };
