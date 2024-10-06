import React, { useState, useEffect } from "react";
import axios from "axios";
import ListStudent from "./ListStudent";
import CreateStudent from "./CreateStudent";
import EditStudent from "./EditStudent";
import ListGroup from "../studyGroup/ListGroup"; 
import DeleteStudent from "./DeleteStudent";
import Paginate from "../main/Paginate";
import './student.css';

const Student = () => {
  
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(1);
  const [creatingNewStudent, setCreatingNewStudent] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    sex: null,
    birth_place: "",
    birth_date: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSearchChange = (e) => {
    setSearchStudent(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateStudent = () => {
    setCreatingNewStudent(true);
  };

  const handleCreateSuccess = (message, createdStudent) => {
   
    setCreatingNewStudent(false);
    setStudents([...students, createdStudent]);
    setSelectedGroups([]); 
    fetchData();
    setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);
};

  const handleCreateCancel = () => {
    setCreatingNewStudent(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleEditSuccess = (updatedData) => {
   
   
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedData.id ? updatedData : student
      )
    );
    setEditingStudent(null);
    if (updatedData.message) {
        setSuccessMessage(updatedData.message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);
    }
  };

  const handleEditCancel = () => {
    setEditingStudent(null);
  };

  const [deleteStudent, setDeleteStudent] = useState(null);

  const handleDeleteStudent = (student) => {
    setDeleteStudent(student);
  };

  const handleDeleteSuccess = () => {
    setDeleteStudent(null);
    setSuccessMessage('Student deleted successfully');
    fetchData();
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  const handleGroupChange = (groupIds) => {
    setSelectedGroups(groupIds);
  };

  const fetchData = () => {
    axios
      .get(`/api/students?page=${currentPage}&search=${searchStudent}`)
      .then((response) => {
        setStudents(response.data.data);
        setTotalPages(response.data.last_page);
        setTotalStudents(response.data.total);
        setSelectedGroups([]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchStudent]);

  if (!students.length && !successMessage) {
    return <div className="text-center">
    <h5>No students found</h5>
    <a href="/students" className="btn btn-primary">Back</a>
</div>
}

  return (
    <>
     <div className="container mt-5">
  <div className="row row-container"> {/* Add hozzá a "row-container" osztályt */}
    <div className="col-4">
      <div className="d-flex flex-column" style={{ marginTop: '43px' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchStudent}
          onChange={handleSearchChange}
          className="orange-border"
        />
      </div>
    </div>
    {successMessage && (
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    )}
    <div className="row col-4">
      <div className="col d-flex justify-content-between">
        <h6 className="mt-5">
          <i className="bi bi-person"></i> <b>{totalStudents} students</b>
        </h6>
      </div>
      <div className="col">
        <button
          type="button"
          className="btn btn-primary btn-sm mt-5"
          style={{ width: '150px', height: '30px' }}
          onClick={handleCreateStudent}
        >
          New
        </button>
      </div>
    </div>

    <div className="col-4 text-end mt-5">
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  </div>

  <div className="col mt-5">
    <div className="row">
      <div className="col-3">
        <ListGroup
          selectedGroups={selectedGroups}
          onGroupChange={handleGroupChange}
        />
      </div>
      <div className="col-9">
        <ListStudent
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          onEditSuccess={handleEditSuccess}
          selectedGroups={selectedGroups}
        />
      </div>
    </div>
  </div>
</div>

      {creatingNewStudent && (
        <CreateStudent
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          onSuccess={handleCreateSuccess}
          onCancel={handleCreateCancel}
        />
      )}

      {editingStudent && (
        <EditStudent
          studentId={editingStudent.id}
          onClose={handleEditCancel}
          
          onEditSuccess={(updatedData) => {
            handleEditSuccess(updatedData);
            fetchData();
          }}
        />
      )}
   {deleteStudent && (
        <DeleteStudent
          student={deleteStudent}
          onDeleteSuccess={(message) => {
            handleDeleteSuccess(message);
            fetchData();
          }}
          onCancel={() => setDeleteStudent(null)}
        />
      )}
    </>
  );
};

export default Student;
