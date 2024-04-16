// src/components/Links.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../constants/index.js'; // Verifica que la ruta sea correcta

const Links = () => {
  // Variantes para controlar las animaciones de los iconos
  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      },
    }),
    hover: {
      scale: 1.3, // Aumentamos la escala para que se vea más grande
      transition: { duration: 0.2 } // Hacemos la transición más rápida
    },
  };

  return (
    // Añadimos 'pb-8' para padding bottom y 'bg-[color]' con el código de color de tu fondo.
    <div className='flex flex-row flex-wrap justify-center gap-20 pb-8' style={{ backgroundColor: 'inherit' }}> 
      {socialLinks.map((link, index) => (
        <motion.a 
          className='w-10 h-10 flex items-center justify-center' // Tamaño de los íconos
          key={link.name}
          href={link.url}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          custom={index}
          viewport={{ once: true }}
        >
          <img src={link.icon} alt={link.name} className="w-full h-full object-contain" />
        </motion.a>
      ))}
    </div>
  );
};

export default Links;
