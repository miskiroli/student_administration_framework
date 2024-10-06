import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './listStudent.css';

const ListStudent = ({ students, onEdit, onDelete, selectedGroups }) => {
    const [moreGroupsData, setMoreGroupsData] = useState([]);
    const [hoveredStudent, setHoveredStudent] = useState(null);

    const handleMouseOverMore = (student) => {
        setMoreGroupsData(student.groups?.slice(2) || []); 
        setHoveredStudent(student);
    };

    const handleMouseLeaveMore = () => {
        setMoreGroupsData([]);
        setHoveredStudent(null);
    };

    const isStudentInSelectedGroups = (student) => {
        return Array.isArray(student.groups) && student.groups.map(group => group.id).some(id => selectedGroups.includes(id));
    };

    return (
        <>
            <table className="table list-student-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id="" /></th>
                        <th> </th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Birth Place</th>
                        <th>Birth Date</th>
                        <th>Groups</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name=""
                                    id=""
                                    checked={isStudentInSelectedGroups(student)}
                                    readOnly
                                />
                            </td>
                            <td>
                            
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' }}>
    {student.image_url ? (
        <img src={student.image_url} alt="Student Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
        <i className="bi bi-person-fill" style={{ color: '#fff', fontSize: '20px' }}></i>
    )}
</div>
</td>
                            <td>{student.name}</td>
                            <td>{student.sex}</td>
                            <td>{student.birth_place}</td>
                            <td>{student.birth_date}</td>
                            <td>
                            {student.groups?.slice(0, 2).map(group => ( 
        <span key={group.id}>{group.name}, </span>
    ))}
    
    
    {student.groups?.length > 2 && (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id={`tooltip-${student.id}`}>
                    {moreGroupsData.map(group => (
                        <div key={group.id}>{group.name}</div>
                    ))}
                </Tooltip>
            }
        >
            <span
                onMouseEnter={() => handleMouseOverMore(student)}
                onMouseLeave={handleMouseLeaveMore}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                {student.groups.length - 2} more
            </span>
        </OverlayTrigger>
    )}
</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button className="btn btn-primary btn-sm" onClick={() => onEdit(student)}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-1" onClick={() => onDelete(student)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListStudent;
