import React, { useState, useEffect } from 'react';
import styles from '../Login.module.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          throw new Error('No se pudieron cargar los servicios');
        }
      } catch (error) {
        console.error('Error al cargar los servicios:', error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedServiceId) {
      alert('Por favor, selecciona un servicio para actualizar.');
      return;
    }
    
    if (!title || !icon) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/services/${selectedServiceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, icon }),
      });

      if (response.ok) {
        alert('Servicio actualizado con éxito.');
        // Opcionalmente, actualizar la lista de servicios en el estado para reflejar los cambios
        const updatedService = await response.json();
        setServices(services.map(service => service._id === selectedServiceId ? updatedService : service));
      } else {
        throw new Error('La petición no fue exitosa');
      }
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      alert('Hubo un problema al actualizar el servicio.');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // Lógica para añadir un servicio, como se implementó anteriormente
  };

  const handleDelete = async () => {
    // Lógica para borrar un servicio, como se implementó anteriormente
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={`${styles.header} ${styles.textBlack}`}>Editar Portfolio</h1>

        <select value={selectedServiceId} onChange={e => setSelectedServiceId(e.target.value)} className={styles.input}>
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service._id} value={service._id}>{service.title}</option>
          ))}
        </select>

        <section>
          <h2 className={`${styles.header} ${styles.textBlack}`} style={{fontSize: '1.5rem', marginBottom: '20px'}}>General (Servicios)</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={styles.textBlack}>Título</label>
              <input className={styles.input} type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div style={{marginTop: '20px'}}>
              <label className={styles.textBlack}>Icono (URL)</label>
              <input className={styles.input} type="url" name="icon" value={icon} onChange={e => setIcon(e.target.value)} />
            </div>
            <div className={styles.buttonsContainer}>
              <input type="button" value="Añadir" className={`${styles.button} ${styles.input}`} onClick={handleAdd} />
              <input type="submit" value="Guardar" className={`${styles.button} ${styles.input}`} />
              <input type="button" value="Borrar" className={`${styles.button} ${styles.input} ${styles.buttonDelete}`} onClick={handleDelete} />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;



