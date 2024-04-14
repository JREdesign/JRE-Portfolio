import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

// Asumiendo que estos import no cambian
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Componente para cada tarjeta de experiencia
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#0b1822",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
      <p
        className='text-custom-orange text-[16px] font-semibold'
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li key={index} className='text-white-100 text-[14px] pl-1 tracking-wider'>
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

// Componente principal que renderiza la sección de experiencias
const Experience = () => {
  const [experiences, setExperiences] = useState([]); // Estado para almacenar las experiencias

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Ajusta la URL según tu configuración de backend
        const response = await axios.get("http://localhost:3001/experiences");
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Mi viaje hasta ahora
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Experiencia laboral
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
