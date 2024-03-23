import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateStudent = ({ onSuccess, onCancel }) => {
    const [newStudent, setNewStudent] = useState({
        name: "",
        sex: "",
        birth_place: "",
        birth_date: "",
        study_group_id: [],
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [studyGroups, setStudyGroups] = useState([]);
    const [imageSelected, setImageSelected] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const cancelToken = axios.CancelToken.source();

    useEffect(() => {
        axios
            .get("/api/studygroups", { cancelToken: cancelToken.token })
            .then((response) => {
                setStudyGroups(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.status === 422) {
                        setErrors(error.response.data.errors);
                    }
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
            });

        return () => {
            cancelToken.cancel("Component unmounted");
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleGroupChange = (e) => {
        const groupId = parseInt(e.target.value, 10);
        if (e.target.checked) {
            if (selectedGroups.length < 4) {
                setSelectedGroups((prevGroups) => [...prevGroups, groupId]);
            } else {
                console.log(
                    "The student can be added to a maximum of four groups!"
                );
            }
        } else {
            setSelectedGroups((prevGroups) =>
                prevGroups.filter((id) => id !== groupId)
            );
        }
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setNewStudent((prevStudent) => ({
            ...prevStudent,
            image: imageFile,
        }));
        if (imageFile) {
            setImageSelected(true);
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: undefined,
            }));
        } else {
            setImageSelected(false);
        }
    };

    const createNewStudent = () => {
        const formData = new FormData();
        formData.append("name", newStudent.name);
        formData.append("sex", newStudent.sex);
        formData.append("birth_place", newStudent.birth_place);
        formData.append("birth_date", newStudent.birth_date);
        selectedGroups.forEach((groupId) => {
            formData.append("study_group_id[]", groupId);
        });
        formData.append("image", newStudent.image);

        axios
            .post("/api/students/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                const studentId = response.data.student_id;
                onSuccess(response.data.message, response.data.student);
                const imageUrl = response.data.image.url;
                setNewStudent((prevStudent) => ({
                    ...prevStudent,
                    image: imageUrl || prevStudent.image,
                }));
                
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            });
    };

    return (
        <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Student</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onCancel}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className={`form-control ${
                                        errors.image && "is-invalid"
                                    }`}
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    name="image"
                                />
                                {errors.image && (
                                    <p className="error-message">
                                        {errors.image[0]}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3 circular-image">
                                <img
                                    src={
                                        newStudent.image
                                            ? URL.createObjectURL(
                                                  newStudent.image
                                              )
                                            : ""
                                    }
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.name && "is-invalid"
                                    }`}
                                    id="name"
                                    value={newStudent.name}
                                    onChange={handleInputChange}
                                    name="name"
                                />
                                {errors.name && (
                                    <p className="error-message">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sex" className="form-label">
                                    Sex
                                </label>
                                <select
                                    className={`form-select ${
                                        errors.sex && "is-invalid"
                                    }`}
                                    id="sex"
                                    value={newStudent.sex || ""}
                                    onChange={handleInputChange}
                                    name="sex"
                                >
                                    <option value="" disabled>
                                        Select sex
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.sex && (
                                    <p className="error-message">
                                        {errors.sex[0]}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="birthPlace"
                                    className="form-label"
                                >
                                    Birthplace
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.birth_place && "is-invalid"
                                    }`}
                                    id="birthPlace"
                                    value={newStudent.birth_place}
                                    onChange={handleInputChange}
                                    name="birth_place"
                                />
                                {errors.birth_place && (
                                    <p className="error-message">
                                        {errors.birth_place[0]}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="birthDate"
                                    className="form-label"
                                >
                                    Birthdate
                                </label>
                                <input
                                    type="date"
                                    className={`form-control ${
                                        errors.birth_date && "is-invalid"
                                    }`}
                                    id="birthDate"
                                    value={newStudent.birth_date}
                                    onChange={handleInputChange}
                                    name="birth_date"
                                />
                                {errors.birth_date && (
                                    <p className="error-message">
                                        {errors.birth_date[0]}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Groups</label>
                                {studyGroups.map((group) => (
                                    <div key={group.id} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={group.id}
                                            checked={selectedGroups.includes(
                                                group.id
                                            )}
                                            onChange={handleGroupChange}
                                        />
                                        <label className="form-check-label">
                                            {group.name}
                                        </label>
                                    </div>
                                ))}
                                {errors.study_group_id && (
                                    <p className="error-message">
                                        {errors.study_group_id[0]}
                                    </p>
                                )}
                                {selectedGroups.length >= 4 && (
                                    <p style={{ color: "red" }}>
                                        "The student can be added to a maximum
                                        of four groups!"
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a
                            href="#"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </a>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={createNewStudent}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStudent;
