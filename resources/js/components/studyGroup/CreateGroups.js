import React, { useState } from 'react';
import axios from 'axios';

const CreateGroups = ({ onSuccess, onCancel, creatingNewGroup }) => {
  const [newGroup, setNewGroup] = useState({
    name: '',
    leader: '',
    subject: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  const createNewGroup = () => {
    axios.post('/api/studygroups/create', newGroup)
      .then(response => {
        onSuccess(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`modal fade ${creatingNewGroup ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: creatingNewGroup ? 'block' : 'none' }}>
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Study Group</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="leader" className="form-label">Leader</label>
                <input
                type="text"
                  className="form-control"
                  id="leader"
                  value={newGroup.leader}
                  onChange={handleInputChange}
                  name="leader"
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                type="text"
                  className="form-control"
                  id="subject"
                  value={newGroup.subject}
                  onChange={handleInputChange}
                  name="subject"
                ></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href='#' className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </a>
            <button type="button" className="btn btn-primary" onClick={createNewGroup}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateGroups;
