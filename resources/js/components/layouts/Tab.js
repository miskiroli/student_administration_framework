import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ totalStudents, totalGroups, totalStudentsInGroups }) => {
    return (
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link
                    to="/students"
                    className="nav-link"
                    style={{ paddingRight: "200px" }}
                >
                    <h3>STUDENTS</h3>
                    <br />
                    <p>{totalStudents} registered</p>
                </Link>
                <Link
                    to="/studygroups"
                    className="nav-link"
                    style={{ paddingRight: "200px" }}
                >
                    <h3>STUDY Groups</h3>
                    <br />
                    <p>
                        {totalGroups} groups with {totalStudentsInGroups}{" "}
                        students
                    </p>
                </Link>
            </div>
        </nav>
    );
};

export default Tab;
