import React, { useState, useEffect } from 'react';
import styles from '../Login.module.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const AdminAbout = () => {
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

  const handleSelectChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);

    const selectedService = services.find(service => service._id === serviceId);
    if (selectedService) {
      setTitle(selectedService.title);
      setIcon(selectedService.icon);
    } else {
      setTitle('');
      setIcon('');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
  
    const newService = { title, icon };
    
    try {
      const response = await fetch('http://localhost:3001/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });
  
      if (!response.ok) {
        throw new Error('La petición no fue exitosa');
      }
      
      alert('Servicio añadido con éxito.');
      const addedService = await response.json();
      setServices([...services, addedService]); // Añade el nuevo servicio al estado
      setSelectedServiceId('');
      setTitle('');
      setIcon('');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un problema al añadir el servicio.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedServiceId) {
      alert('Por favor, selecciona un servicio para actualizar.');
      return;
    }
  
    const updatedService = { title, icon };
  
    try {
      const response = await fetch(`http://localhost:3001/services/${selectedServiceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });
  
      if (!response.ok) {
        throw new Error('La petición no fue exitosa');
      }
      
      alert('Servicio actualizado con éxito.');
      const updatedServiceResponse = await response.json();
      setServices(services.map(service => service._id === selectedServiceId ? updatedServiceResponse : service));
      setSelectedServiceId('');
      setTitle('');
      setIcon('');
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      alert('Hubo un problema al actualizar el servicio.');
    }
  };
  
  const handleDelete = async () => {
    if (!selectedServiceId) {
      alert('Por favor, selecciona un servicio para borrar.');
      return;
    }
  
    const isConfirmed = window.confirm('¿Estás seguro de que quieres borrar este servicio?');
    if (!isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/services/${selectedServiceId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo borrar el servicio');
      }
      
      alert('Servicio borrado con éxito.');
      setServices(services.filter(service => service._id !== selectedServiceId));
      setSelectedServiceId('');
      setTitle('');
      setIcon('');
    } catch (error) {
      console.error('Error al borrar el servicio:', error);
      alert('Hubo un problema al borrar el servicio.');
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={`${styles.header} ${styles.textBlack}`}>General (Servicios)</h2>
        
        <select value={selectedServiceId} onChange={handleSelectChange} className={styles.input}>
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service._id} value={service._id}>{service.title}</option>
          ))}
        </select>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.textBlack}>Título</label>
            <input className={styles.input} type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div style={{marginTop: '20px'}}>
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

export default AdminAbout;
