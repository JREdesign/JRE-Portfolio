import React, { useState, useEffect } from 'react';
import styles from '../Login.module.css'; // Asegura la correcta importación de tus estilos

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperienceId, setSelectedExperienceId] = useState('');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [icon, setIcon] = useState('');
  const [iconBg, setIconBg] = useState('');
  const [date, setDate] = useState('');
  const [points, setPoints] = useState(['']);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://localhost:3001/experiences');
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        } else {
          throw new Error('No se pudieron cargar las experiencias');
        }
      } catch (error) {
        console.error('Error al cargar las experiencias:', error);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    if (selectedExperienceId) {
      const selectedExperience = experiences.find(experience => experience._id === selectedExperienceId);
      if (selectedExperience) {
        setTitle(selectedExperience.title);
        setCompanyName(selectedExperience.company_name); // Asegurándonos de usar el campo correcto
        setIcon(selectedExperience.icon);
        setIconBg(selectedExperience.iconBg);
        setDate(selectedExperience.date);
        setPoints(selectedExperience.points || ['']);
      }
    } else {
      // Resetea los campos si no se ha seleccionado ninguna experiencia
      setTitle('');
      setCompanyName('');
      setIcon('');
      setIconBg('');
      setDate('');
      setPoints(['']);
    }
  }, [selectedExperienceId, experiences]);

  const handleAdd = async (e) => {
    e.preventDefault();

    // Estructura de datos que espera tu backend
    const newExperience = {
      title,
      company_name: companyName, // Asegurándonos de que se envía como `company_name`
      icon,
      iconBg,
      date,
      points
    };

    try {
      const response = await fetch('http://localhost:3001/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperience),
      });

      if (response.ok) {
        alert('Experiencia añadida con éxito.');
        const addedExperience = await response.json();
        setExperiences([...experiences, addedExperience]);
        // Resetear los campos del formulario después de añadir una experiencia
        setTitle('');
        setCompanyName('');
        setIcon('');
        setIconBg('');
        setDate('');
        setPoints(['']);
      } else {
        // En caso de respuesta no exitosa, intenta leer el cuerpo de la respuesta
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo añadir la experiencia');
      }
    } catch (error) {
      console.error('Error al añadir la experiencia:', error);
      alert(`Hubo un problema al añadir la experiencia: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExperience = {
      title,
      company_name: companyName, // Cambiado a `company_name` para coincidir con el backend
      icon,
      iconBg,
      date,
      points
    };

    try {
      const response = await fetch(`http://localhost:3001/experiences/${selectedExperienceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExperience),
      });

      if (response.ok) {
        alert('Experiencia actualizada con éxito.');
        const data = await response.json();
        setExperiences(experiences.map(experience => experience._id === selectedExperienceId ? data : experience));
        // Resetea los estados después de una actualización exitosa para limpiar el formulario
        setSelectedExperienceId('');
        setTitle('');
        setCompanyName('');
        setIcon('');
        setIconBg('');
        setDate('');
        setPoints(['']);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo actualizar la experiencia');
      }
    } catch (error) {
      console.error('Error al actualizar la experiencia:', error);
      alert(`Hubo un problema al actualizar la experiencia: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedExperienceId) {
      alert('Por favor, selecciona una experiencia para borrar.');
      return;
    }

    const isConfirmed = window.confirm('¿Estás seguro de que quieres borrar esta experiencia?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/experiences/${selectedExperienceId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Experiencia borrada con éxito.');
          setExperiences(experiences.filter(experience => experience._id !== selectedExperienceId));
          setSelectedExperienceId('');
        } else {
          throw new Error('No se pudo borrar la experiencia');
        }
      } catch (error) {
        console.error('Error al borrar la experiencia:', error);
        alert('Hubo un problema al borrar la experiencia.');
      }
    }
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, '']);
  };

  const removePoint = (index) => {
    const newPoints = [...points];
    newPoints.splice(index, 1);
    setPoints(newPoints);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={`${styles.header} ${styles.textBlack}`}>Gestión Experiencias Laborales</h2>
        
        <select value={selectedExperienceId} onChange={e => setSelectedExperienceId(e.target.value)} className={styles.input}>
          <option value="">Selecciona una experiencia</option>
          {experiences.map((experience) => (
            <option key={experience._id} value={experience._id}>{experience.title}</option>
          ))}
        </select>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.textBlack}>Título</label>
            <input className={styles.input} type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Nombre de la Compañía</label>
            <input className={styles.input} type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Icono (URL)</label>
            <input className={styles.input} type="url" value={icon} onChange={e => setIcon(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Color de Fondo del Icono</label>
            <input className={styles.input} type="text" value={iconBg} onChange={e => setIconBg(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Fecha</label>
            <input className={styles.input} type="text" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          {points.map((point, index) => (
            <div key={index}>
              <label className={styles.textBlack}>Punto {index + 1}</label>
              <input className={styles.input} type="text" value={point} onChange={(e) => handlePointChange(index, e.target.value)} />
              {points.length > 1 && (
                <button className={styles.textBlack} type="button" onClick={() => removePoint(index)}>Eliminar Punto</button>
              )}
            </div>
          ))}
          <button className={styles.textBlack} type="button" onClick={addPoint}>Añadir Punto</button>
          
          <div className={styles.buttonsContainer}>
            <input type="button" value="Añadir" className={`${styles.button} ${styles.input}`} onClick={handleAdd} />
            <input type="submit" value="Actualizar" className={`${styles.button} ${styles.input}`} />
            <input type="button" value="Borrar" className={`${styles.button} ${styles.input} ${styles.buttonDelete}`} onClick={handleDelete} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminExperiences;
