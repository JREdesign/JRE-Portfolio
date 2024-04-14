import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Login.module.css';

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const selectedFeedback = feedbacks.find(feedback => feedback._id === selectedFeedbackId);
    if (selectedFeedback) {
      setTestimonial(selectedFeedback.testimonial);
      setName(selectedFeedback.name);
      setDesignation(selectedFeedback.designation);
      setCompany(selectedFeedback.company);
      setImage(selectedFeedback.image);
    } else {
      resetForm();
    }
  }, [selectedFeedbackId, feedbacks]);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/feedbacks');
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const feedback = { testimonial, name, designation, company, image };

    try {
      const response = await axios.post('http://localhost:3001/feedbacks', feedback);
      if (response.status === 201) {
        alert('Feedback añadido con éxito');
        fetchFeedbacks();
        resetForm();
      }
    } catch (error) {
      console.error('Error adding feedback:', error);
      alert('Error al añadir el feedback');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFeedbackId) {
      alert('Por favor, selecciona un feedback para actualizar.');
      return;
    }
    const feedback = { testimonial, name, designation, company, image };

    try {
      const response = await axios.patch(`http://localhost:3001/feedbacks/${selectedFeedbackId}`, feedback);
      if (response.status === 200) {
        alert('Feedback actualizado con éxito');
        fetchFeedbacks();
        resetForm();
      }
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert('Error al actualizar el feedback');
    }
  };

  const handleDelete = async () => {
    if (!selectedFeedbackId) {
      alert('Por favor, selecciona un feedback para eliminar.');
      return;
    }

    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este feedback?');
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3001/feedbacks/${selectedFeedbackId}`);
        if (response.status === 200) {
          alert('Feedback eliminado con éxito');
          fetchFeedbacks();
          resetForm();
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        alert('Error al eliminar el feedback');
      }
    }
  };

  const resetForm = () => {
    setSelectedFeedbackId('');
    setTestimonial('');
    setName('');
    setDesignation('');
    setCompany('');
    setImage('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={`${styles.header} ${styles.textBlack}`}>Gestión de Feedbacks</h2>
        
        <select value={selectedFeedbackId} onChange={(e) => setSelectedFeedbackId(e.target.value)} className={styles.input}>
          <option value="">Selecciona un feedback</option>
          {feedbacks.map((feedback) => (
            <option key={feedback._id} value={feedback._id}>{feedback.name}</option>
          ))}
        </select>

        <form>
          <div>
            <label className={styles.textBlack}>Testimonio</label>
            <textarea className={styles.input} value={testimonial} onChange={(e) => setTestimonial(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Nombre</label>
            <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Cargo</label>
            <input className={styles.input} type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Compañía</label>
            <input className={styles.input} type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div>
            <label className={styles.textBlack}>Imagen (URL)</label>
            <input className={styles.input} type="url" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          
          <div className={styles.buttonsContainer}>
            <input type="button" value="Añadir" className={`${styles.button} ${styles.input}`} onClick={handleAdd} />
            <input type="button" value="Actualizar" className={`${styles.button} ${styles.input}`} onClick={handleUpdate} />
            <input type="button" value="Borrar" className={`${styles.button} ${styles.input} ${styles.buttonDelete}`} onClick={handleDelete} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFeedbacks;
