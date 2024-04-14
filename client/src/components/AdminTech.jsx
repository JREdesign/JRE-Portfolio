import React, { useState, useEffect } from 'react';
import styles from '../Login.module.css';

const AdminTech = () => {
  const [techs, setTechs] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState('');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const response = await fetch('http://localhost:3001/tech');
        if (response.ok) {
          const data = await response.json();
          setTechs(data);
        } else {
          throw new Error('No se pudieron cargar las tecnologías');
        }
      } catch (error) {
        console.error('Error al cargar las tecnologías:', error);
      }
    };

    fetchTechs();
  }, []);

  useEffect(() => {
    if (selectedTechId) {
      const selectedTech = techs.find(tech => tech._id === selectedTechId);
      if (selectedTech) {
        setName(selectedTech.name);
        setIcon(selectedTech.icon);
      }
    } else {
      // Resetea los campos si no se ha seleccionado ninguna tecnología
      setName('');
      setIcon('');
    }
  }, [selectedTechId, techs]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newTech = { name, icon };

    try {
      const response = await fetch('http://localhost:3001/tech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTech),
      });

      if (response.ok) {
        alert('Tecnología añadida con éxito.');
        const addedTech = await response.json();
        setTechs([...techs, addedTech]);
        setName('');
        setIcon('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo añadir la tecnología');
      }
    } catch (error) {
      console.error('Error al añadir la tecnología:', error);
      alert(`Hubo un problema al añadir la tecnología: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTechId) {
      alert('Por favor, selecciona una tecnología para actualizar.');
      return;
    }

    const updatedTech = { name, icon };

    try {
      const response = await fetch(`http://localhost:3001/tech/${selectedTechId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTech),
      });

      if (response.ok) {
        alert('Tecnología actualizada con éxito.');
        const updatedTech = await response.json();
        setTechs(techs.map(tech => tech._id === selectedTechId ? updatedTech : tech));
        setSelectedTechId('');
        setName('');
        setIcon('');
      } else {
        throw new Error('No se pudo actualizar la tecnología');
      }
    } catch (error) {
      console.error('Error al actualizar la tecnología:', error);
      alert(`Hubo un problema al actualizar la tecnología: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedTechId) {
      alert('Por favor, selecciona una tecnología para borrar.');
      return;
    }

    const isConfirmed = window.confirm('¿Estás seguro de que quieres borrar esta tecnología?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/tech/${selectedTechId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Tecnología borrada con éxito.');
          setTechs(techs.filter(tech => tech._id !== selectedTechId));
          setSelectedTechId('');
        } else {
          throw new Error('No se pudo borrar la tecnología');
        }
      } catch (error) {
        console.error('Error al borrar la tecnología:', error);
        alert(`Hubo un problema al borrar la tecnología: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={`${styles.header} ${styles.textBlack}`}>Gestión de Tecnologías</h2>
        
        <select value={selectedTechId} onChange={e => setSelectedTechId(e.target.value)} className={styles.input}>
          <option value="">Selecciona una tecnología</option>
          {techs.map((tech) => (
            <option key={tech._id} value={tech._id}>{tech.name}</option>
          ))}
        </select>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.textBlack}>Nombre</label>
            <input className={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Icono (URL)</label>
            <input className={styles.input} type="url" value={icon} onChange={e => setIcon(e.target.value)} />
          </div>
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

export default AdminTech;
