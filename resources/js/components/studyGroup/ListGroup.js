import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListGroup = ({ selectedGroups, onGroupChange }) => {
    const [listStudyGroups, setListStudyGroups] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/studygroups');
                if (isMounted) {
                    setListStudyGroups(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            setIsMounted(false);
           
        };
    }, [isMounted]);

    const handleChange = (groupId) => {
        const updatedGroups = selectedGroups.includes(groupId)
            ? selectedGroups.filter((id) => id !== groupId)
            : [...selectedGroups, groupId];
        onGroupChange(updatedGroups);
    };

    return (
        <>
            <h6 className="mt-3">FILTERS OF STUDY GROUPS</h6>
            {listStudyGroups.map((group) => (
                <div className="form-check" key={group.id}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={group.id}
                        id={`groupCheckbox${group.id}`}
                        onChange={() => handleChange(group.id)}
                        checked={selectedGroups.includes(group.id)}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`groupCheckbox${group.id}`}
                    >
                        {group.name}
                    </label>
                </div>
            ))}
        </>
    );
};

export default ListGroup;
