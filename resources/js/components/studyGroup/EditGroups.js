import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditGroups = ({ groupId, onClose, onEditSuccess }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axios.get(`/api/studygroups/${groupId}`)
      .then(response => {
        setGroup(response.data);
      })
      .catch(error => console.error(error));
  }, [groupId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroup(prevGroup => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put(`/api/studygroups/${groupId}`, group)
      .then(response => {
        onEditSuccess(response.data);
        onClose();
      })
      .catch(error => console.error(error));
  };

  if (!group) {
    return null;
  }

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Group</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={group.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="leader" className="form-label">
                  Leader
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="leader"
                  value={group.leader}
                  onChange={handleInputChange}
                  name="leader"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={group.subject}
                  onChange={handleInputChange}
                  name="subject"
                />
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

export default EditGroups;
