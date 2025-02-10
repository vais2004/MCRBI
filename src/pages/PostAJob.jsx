import { useState } from "react";
import Header from "../components/Header";

const PostAJob = () => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        companyDetails: {
            companyName: "",
            location: "",
            salary: "",
            jobType: ""
        },
        jobDescription: "",
        qualifications: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["companyName", "location", "salary", "jobType"].includes(name)) {
            setFormData((prevState) => ({
                ...prevState,
                companyDetails: {
                    ...prevState.companyDetails,
                    [name]: name === "salary" ? parseInt(value) || "" : value
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://ophiuchus.vercel.app/details', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to add job detail.");
            }

            const data = await response.json();
            console.log("Added Job Detail:", data);
            window.location.reload()

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Header />
            <main className="container mt-3">
                <h1>Post a Job</h1>

                <form onSubmit={handleSubmit}>
                    <label>Job Title:</label>
                    <input className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} type="text" />
                    <br />
                    <label>Company Name:</label>
                    <input className="form-control" name="companyName" value={formData.companyDetails.companyName} onChange={handleChange} type="text" />
                    <br />
                    <label>Location:</label>
                    <input className="form-control" name="location" value={formData.companyDetails.location} onChange={handleChange} type="text" />
                    <br />
                    <label>Salary:</label>
                    <input className="form-control" name="salary" value={formData.companyDetails.salary} onChange={handleChange} type="text" />
                    <br />
                    <label>Job Type:</label>
                    <input className="form-control" name="jobType" value={formData.companyDetails.jobType} onChange={handleChange} type="text" />
                    <br />
                    <label>Job Description:</label>
                    <textarea className="form-control" name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea>
                    <br />
                    <label>Job Qualifications:</label>
                    <textarea className="form-control" name="qualifications" value={formData.qualifications} onChange={handleChange}></textarea>
                    <br />
                    <button className="btn btn-primary col-3 mb-5" type="submit">Post Job</button>
                </form>
            </main>
        </>
    );
};

export default PostAJob;
