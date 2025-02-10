import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useState, useEffect } from "react"

const JobDetailsPage=()=>{

  const { detailId } = useParams();

  const[detail, setDetails] =useState()

  useEffect(()=>{
    const jobDetails= async()=>{
      try{
        const response = await fetch(`https://ophiuchus.vercel.app/detail/${detailId}`)

        if(!response.ok){
          throw 'failed to fetch job details.'
        }
        const data = await response.json()
        setDetails(data)

      }catch(error){
        console.log(error)
      }
    }
    jobDetails()
  },[detailId])

  
    return(
        <>
        <Header/>
        <main className="container my-5">
        {detail ? (
          
          <div className="row">
            <h2>{detail.jobTitle}</h2>
            <div key={detail._id} className="col-md-12 mt-2">
              <div className="card">
                <div className="card-body">
                  
                  <p><strong>Company Name:</strong> {detail.companyDetails.companyName}</p>
                  <p><strong>Location:</strong> {detail.companyDetails.location}</p>
                  <p><strong>Salary:</strong> {detail.companyDetails.salary}</p>
                  <p><strong>Job Type:</strong> {detail.companyDetails.jobType}</p>
                  <p><strong>Description:</strong> {detail.jobDescription}</p>
                  <p><strong>Qualifications:</strong></p>
                  <ul><li>{detail.qualifications}</li></ul>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <p>Loading job details...</p>
          )}
        </main> 
        </>
    )
}

export default JobDetailsPage