import React, { useState, useEffect } from 'react';
import styles from '../Login.module.css';

const AdminWorks = () => {
  const [works, setWorks] = useState([]);
  const [selectedWorkId, setSelectedWorkId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([{ name: '', color: '' }]);
  const [image, setImage] = useState('');
  const [sourceCodeLink, setSourceCodeLink] = useState('');

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:3001/works');
        if (response.ok) {
          const data = await response.json();
          setWorks(data);
        } else {
          throw new Error('No se pudieron cargar los trabajos');
        }
      } catch (error) {
        console.error('Error al cargar los trabajos:', error);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    if (selectedWorkId) {
      const selectedWork = works.find(work => work._id === selectedWorkId);
      if (selectedWork) {
        setName(selectedWork.name);
        setDescription(selectedWork.description);
        setTags(selectedWork.tags || [{ name: '', color: '' }]);
        setImage(selectedWork.image);
        setSourceCodeLink(selectedWork.source_code_link);
      }
    } else {
      resetForm();
    }
  }, [selectedWorkId, works]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newWork = { name, description, tags, image, source_code_link: sourceCodeLink };

    try {
      const response = await fetch('http://localhost:3001/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWork),
      });

      if (response.ok) {
        alert('Trabajo añadido con éxito.');
        const addedWork = await response.json();
        setWorks([...works, addedWork]);
        resetForm();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo añadir el trabajo');
      }
    } catch (error) {
      console.error('Error al añadir el trabajo:', error);
      alert(`Hubo un problema al añadir el trabajo: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedWork = { name, description, tags, image, source_code_link: sourceCodeLink };

    try {
      const response = await fetch(`http://localhost:3001/works/${selectedWorkId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWork),
      });

      if (response.ok) {
        alert('Trabajo actualizado con éxito.');
        const updated = await response.json();
        setWorks(works.map(work => work._id === selectedWorkId ? updated : work));
        resetForm();
      } else {
        throw new Error('No se pudo actualizar el trabajo');
      }
    } catch (error) {
      console.error('Error al actualizar el trabajo:', error);
      alert(`Hubo un problema al actualizar el trabajo: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedWorkId) {
      alert('Por favor, selecciona un trabajo para borrar.');
      return;
    }

    const isConfirmed = window.confirm('¿Estás seguro de que quieres borrar este trabajo?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/works/${selectedWorkId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Trabajo borrado con éxito.');
          setWorks(works.filter(work => work._id !== selectedWorkId));
          resetForm();
        } else {
          throw new Error('No se pudo borrar el trabajo');
        }
      } catch (error) {
        console.error('Error al borrar el trabajo:', error);
        alert(`Hubo un problema al borrar el trabajo: ${error.message}`);
      }
    }
  };

  const handleTagChange = (index, field, value) => {
    const newTags = [...tags];
    newTags[index] = { ...newTags[index], [field]: value };
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tags, { name: '', color: '' }]);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const resetForm = () => {
    setSelectedWorkId('');
    setName('');
    setDescription('');
    setTags([{ name: '', color: '' }]);
    setImage('');
    setSourceCodeLink('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={`${styles.header} ${styles.textBlack}`}>Gestión de Proyectos</h2>
        
        <select value={selectedWorkId} onChange={e => setSelectedWorkId(e.target.value)} className={styles.input}>
          <option value="">Selecciona un trabajo</option>
          {works.map((work) => (
            <option key={work._id} value={work._id}>{work.name}</option>
          ))}
        </select>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.textBlack}>Nombre</label>
            <input className={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Descripción</label>
            <textarea className={styles.input} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Imagen del proyecto (URL)</label>
            <input className={styles.input} type="url" value={image} onChange={e => setImage(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Enlace a GitHub o referencia</label>
            <input className={styles.input} type="url" value={sourceCodeLink} onChange={e => setSourceCodeLink(e.target.value)} />
          </div>

          {tags.map((tag, index) => (
            <div key={index}>
              <label className={styles.textBlack}>Etiqueta {index + 1}</label>
              <input className={styles.input} type="text" placeholder="Nombre" value={tag.name} onChange={(e) => handleTagChange(index, 'name', e.target.value)} />
              <label className={styles.textBlack}>Color de etiqueta {index + 1}</label>
              <input className={styles.input} type="color" value={tag.color} onChange={(e) => handleTagChange(index, 'color', e.target.value)} />
              {tags.length > 1 && (
                <button type="button" onClick={() => removeTag(index)}>Eliminar Etiqueta</button>
              )}
            </div>
          ))}

          <button className={styles.textBlack} type="button" onClick={addTag}>Añadir Etiqueta</button>

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

export default AdminWorks;      