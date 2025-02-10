
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from './components/Header';
import useFetch from './useFetch';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"


function App() {
  const [successMessage,setSuccessMessage]=useState("")

const [jobDetails, setJobDetails]=useState()

const [search, setSearch] = useState('')

  const { data, loading, error } = useFetch('https://ophiuchus.vercel.app/detail/all');

  const handleDelete = async(detailId)=>{
    try{
      const response = await fetch(`https://ophiuchus.vercel.app/detail/${detailId}`,
        {method: 'DELETE',}
      )

      if(!response.ok){
        throw 'failed to delete movie.'
      }

      const data=await response.json()
      if(data){
        setSuccessMessage('Movie deleted successfully')
        window.location.reload()
      }

      }catch(error){
        console.log(error)
      }
  }

  // const handleDetails= async(detailId)=>{
  //   try{
  //     const response = await fetch(`https://ophiuchus.vercel.app/detail/${detailId}`,
  //       {method: 'GET',}
  //     )

  //     if(!response.ok){
  //       throw 'failed to fetch job details.'
  //     }

  //     const data=await response.json()
  //     setJobDetails(data)

  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  const navigate= useNavigate()
  const handleDetails=(detailId)=>{
    navigate(`/detial/${detailId}`)
  }

  const fileredData = data?.filter((detail)=> detail.jobTitle.toLowerCase().includes(search.toLowerCase())
)

  return (
    <>
      <Header />
      <br />
      <main className="container">
      <form class="col-md-4 my-3" role="search">
        <input class="form-control me-2" type="search" placeholder="Search job by title" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)}/>
      </form>
        <h1>All Jobs</h1>
        {loading&&<p className='alert alert-primary'>Loading...</p>}
         <div className="row">
          {fileredData?.map((detail) => (
            <div key={detail._id} className="col-md-4 mb-3">
              <div className="card py-3">
                <div className="card-body">
                  <h5 className="card-title">{detail.jobTitle}</h5>
                  <p className="card-text">
                    <strong>Company name:</strong> {detail.companyDetails.companyName}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {detail.companyDetails.location}
                  </p>
                  <p className="card-text">
                    <strong>Job Type:</strong> {detail.companyDetails.jobType}
                  </p>
                  <a  className="btn btn-primary col-4 me-2" onClick={()=>handleDetails(detail._id)}>
                    See Details
                  </a>
                  <a className="col-4 btn btn-danger" onClick={()=>handleDelete(detail._id)}>
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>{successMessage}</p>
      </main>
    </>
  );
}

export default App;

