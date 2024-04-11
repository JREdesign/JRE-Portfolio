import React, { useEffect, useState } from "react";
import Axios from "axios";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-custom-blue rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Reemplaza 'http://localhost:3001/services' con la URL de tu backend si es diferente
    Axios.get('http://localhost:3001/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al cargar los servicios:", error);
      });
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez después del montaje inicial

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introducción</p>
        <h2 className={styles.sectionHeadText}>General</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Apasionado por el Diseño Gráfico y las Artes Gráficas, mi carrera ha sido una constante exploración de nuevas habilidades y desafíos. Esta curiosidad me llevó a expandir mis competencias hacia el Desarrollo Web Full Stack, especializándome en crear experiencias de usuario intuitivas y atractivas a través de mis conocimientos en UI/UX. Con una sólida base en diseño y producción editorial, me he dedicado a fusionar la estética visual con la funcionalidad técnica, buscando siempre superar las expectativas.
      </motion.p>
      
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
