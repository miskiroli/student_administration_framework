import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ studentId, onClose, onEditSuccess }) => {
  const [student, setStudent] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/students/${studentId}`)
      .then(response => {
        setStudent(response.data);
        setSelectedGroups(response.data.groups.map(group => group.id));
      })
      .catch(error => console.error(error));

    axios.get('/api/studygroups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => console.error(error));
  }, [studentId]);

  const handleGroupChange = (e) => {
    const groupId = parseInt(e.target.value, 10);
    if (e.target.checked) {
      if (selectedGroups.length < 4) {
        setSelectedGroups(prevGroups => [...prevGroups, groupId]);
      } else {
        console.log("Maximum 4 csoport lehet egy diákhoz hozzáadva!");
      }
    } else {
      setSelectedGroups(prevGroups => prevGroups.filter(id => id !== groupId));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewImage(imageFile);
};

const handleSave = () => {
  // Elküldjük a többi adatot
  const studentData = {
      name: student.name,
      sex: student.sex,
      birth_place: student.birth_place,
      birth_date: student.birth_date,
      groups: selectedGroups,
  };

  axios.put(`/api/students/${studentId}`, studentData)
  .then(response => {
      if (response.status === 200) {
          // Ha a többi adat sikeresen elküldésre került
          const imageUrl = response.data.image ? response.data.image.url : null;
          setStudent(prevStudent => ({
              ...prevStudent,
              image_url: imageUrl || prevStudent.image_url,
          }));
         
          onEditSuccess(response.data);
          onClose();
      } else {
          console.error('Invalid response from server:', response);
      }
  })
  .catch(error => {
      console.error('Hiba történt a PUT kérés során:', error);
  });

  // Küldjük el a képet külön POST kéréssel
  if (newImage) {
      const formData = new FormData();
      formData.append('image', newImage);

      axios.post(`/api/students/${studentId}/image`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      .then(imageResponse => {
          // Ha a kép sikeresen elküldésre került, frissítjük a student állapotot
          setStudent(prevStudent => ({
              ...prevStudent,
              image_url: imageResponse.data.image.url,
          }));
          console.log('Kép sikeresen elküldve:', imageResponse);
      })
      .catch(imageError => {
          console.error('Hiba történt a kép elküldésekor:', imageError);
      });
  }
};





  useEffect(() => {
    if (newImage) {
      setStudent(prevStudent => ({
        ...prevStudent,
        image_url: URL.createObjectURL(newImage),
      }));
      
    }
  }, [newImage]);

  if (!student) {
    return null; 
  }

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Student</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3  ">
             
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="mb-3 ">
                  <img 
                    src={newImage ? URL.createObjectURL(newImage) : (student.image_url ? student.image_url : '')} 
                    className="circular-image" 
                    alt="Student" 
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={student.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sex" className="form-label">
                  Sex
                </label>
                <select
                  className="form-select"
                  id="sex"
                  value={student.sex || ""}
                  onChange={handleInputChange}
                  name="sex"
                >
                  <option value="" disabled>
                    Select sex
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="birthPlace" className="form-label">
                  Birthplace
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="birthPlace"
                  value={student.birth_place}
                  onChange={handleInputChange}
                  name="birth_place"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthDate" className="form-label">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  value={student.birth_date}
                  onChange={handleInputChange}
                  name="birth_date"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Groups</label>
                {groups.map(group => (
                  <div key={group.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={group.id}
                      checked={selectedGroups.includes(group.id)}
                      onChange={handleGroupChange}
                    />
                    <label className="form-check-label">{group.name}</label>
                  </div>
                ))}
                {selectedGroups.length >= 4 && (
                  <p style={{ color: 'red' }}>A diák maximum négy csoportba lehet beillesztve!</p>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href='#' className="btn btn-secondary" onClick={onClose}>
              Cancel
            </a>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
