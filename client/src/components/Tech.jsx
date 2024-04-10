import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const Tech = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tech')
      .then(response => {
        setTechnologies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Variantes para controlar las animaciones de los iconos
  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15, // Aumenta el retardo entre cada icono
        duration: 0.5, // Hace la animación de aparición más lenta
        type: "spring",
        stiffness: 100
      },
    }),
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.3 } // Mantiene la animación de hover
    },
  };
  

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology, index) => (
        <motion.div 
          className='w-28 h-28 flex flex-col items-center justify-center' 
          key={technology._id}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          custom={index} // Proporciona el índice para el delay
          viewport={{ once: true }} // La animación ocurre una vez
          transition={{ type: "spring", stiffness: 100 }}
        >
          <img src={technology.icon} alt={technology.name} className="w-full h-full object-contain" />
          <span>{technology.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
