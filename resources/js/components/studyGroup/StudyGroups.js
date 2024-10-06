import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListFullGroup from './ListFullGroup';
import CreateGroups from './CreateGroups';
import EditGroups from './EditGroups';
import DeleteGroups from './DeleteGroups';
import './studyGroups.css';

const StudyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [creatingNewGroup, setCreatingNewGroup] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroup, setDeletingGroup] = useState(null);

  const handleCreateGroup = () => {
    setCreatingNewGroup(true);
  };

  const handleCreateSuccess = (message) => {
    console.log(message);
    setCreatingNewGroup(false);
    fetchData();
  };

  const handleCreateCancel = () => {
    setCreatingNewGroup(false);
  };

  const handleEditGroup = (group) => {
   
    setEditingGroup(group);
  };

  const handleEditSuccess = () => {
    axios
      .get('/api/studygroups')
      .then((response) => {
        setGroups(response.data);
        setEditingGroup(null);
      })
      .catch((error) => console.error(error));
  };

  const handleEditCancel = () => {
    setEditingGroup(null);
  };

  const handleDeleteGroup = (group) => {
    setDeletingGroup(group);
  };

  const handleDeleteSuccess = () => {
    setDeletingGroup(null);
    fetchData();
  };

  const fetchData = () => {
    axios
      .get('/api/studygroups')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-center">
      <h2>Study Groups</h2>
      <div className="col-4">
        <h5 className="mt-5">
          <i className="bi bi-person"></i> <b>{groups.length} groups</b>
        </h5>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-5"
          style={{ width: '150px', height: '30px' }}
          onClick={handleCreateGroup}
        >
          New Group
        </button>
      </div>

      <div className="col mt-5">
        <ListFullGroup
          groups={groups}
          onEdit={handleEditGroup}
          onDelete={handleDeleteGroup}
        />
      </div>

      {creatingNewGroup && (
        <CreateGroups
          onSuccess={handleCreateSuccess}
          onCancel={handleCreateCancel}
          creatingNewGroup={creatingNewGroup}
        />
      )}

      {editingGroup && (
        <EditGroups
          groupId={editingGroup.id}
          onEditSuccess={handleEditSuccess}
          onClose={handleEditCancel}
        />
      )}

      {deletingGroup && (
        <DeleteGroups
          group={deletingGroup}
          onDeleteSuccess={handleDeleteSuccess}
          onCancel={() => setDeletingGroup(null)}
        />
      )}
    </div>
  );
};

export default StudyGroups;
