
import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "../layouts/Header";
import Tab from "../layouts/Tab";
import Students from "../student/Student";
import StudyGroups from "../studyGroup/StudyGroups";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Main() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);
  const [totalStudentsInGroups, setTotalStudentsInGroups] = useState(0);

  useEffect(() => {
    
    axios.get('/api/students')
      .then(response => {
        setTotalStudents(response.data.total);
      })
      .catch(error => console.error(error));

    
    axios.get('/api/studygroups')
      .then(response => {
        setTotalGroups(response.data.length);
      })
      .catch(error => console.error(error));

   
    axios.get('/api/total-students-in-groups')
      .then(response => {
        setTotalStudentsInGroups(response.data.total_students_in_groups);
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <Router>
      <Header />
      <div className="container mt-5">
      <Tab totalStudents={totalStudents}
        totalGroups={totalGroups}
        totalStudentsInGroups={totalStudentsInGroups} />

        <Routes>
  <Route index element={<Students />} />
  <Route path="/students" element={<Students  />} />
  <Route path="/studygroups" element={<StudyGroups />} />
</Routes>
      </div>
    </Router>
  );
}

export default Main;

if (document.getElementById("main")) {
  ReactDOM.render(<Main />, document.getElementById("main"));
}
