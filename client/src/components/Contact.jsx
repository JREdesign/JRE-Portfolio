import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    // Validación en tiempo real
    validateField(name, value);
  };

  // Validación específica para cada campo
  const validateField = (fieldName, value) => {
    let tempErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        tempErrors.name = value.length > 30 || value.length === 0 ? "Por favor introduce un nombre válido" : "";
        break;
      case 'email':
        tempErrors.email = !value.includes("@") || value.length === 0 ? "Por favor introduce un e-mail válido" : "";
        break;
      case 'message':
        tempErrors.message = value.length < 10 ? "El mensaje debe contener mínimo 10 caracteres" : "";
        break;
      default:
        break;
    }

    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error !== "")) return;
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JRE design",
          from_email: form.email,
          to_email: "jr.eugercios@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Gracias. Te responderé lo antes posible");

          setForm({
            name: "",
            email: "",
            message: "",
          });
          setErrors({});
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Algo fué mal, intentalo de nuevo.");
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-custom-blue p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Mándame un mensaje</p>
        <h3 className={styles.sectionHeadText}>Contacto</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Tu nombre</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cómo te llamas?"
              className='bg-custom-blue2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
            {errors.name && <p className="text-custom-orange">{errors.name}</p>}
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Tu e-mail</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="¿Cuál es tu dirección de correo electrónico?"
              className='bg-custom-blue2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
            {errors.email && <p className="text-custom-orange">{errors.email}</p>}
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Tu mensaje</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='¿Qué es lo que quieres decirme?'
              className='bg-custom-blue2 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
            {errors.message && <p className="text-custom-orange">{errors.message}</p>}
          </label>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e78009" }}
            type='submit'
            className='bg-custom-blue3 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Enviando..." : "Enviar"}
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
