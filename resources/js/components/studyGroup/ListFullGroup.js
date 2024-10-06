import React from 'react';
import './listFullGroup.css';
const ListFullGroup = ({ groups, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Leader</th>
          <th>Subject</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <tr key={group.id}>
            <td>{group.name}</td>
            <td>{group.leader}</td>
            <td>{group.subject}</td>
            <td> 
              <button className="btn btn-primary btn-sm" onClick={() => onEdit(group)}>Edit</button> 
              <button className="btn btn-danger btn-sm ms-1" onClick={() => onDelete(group)}>Delete</button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListFullGroup;
