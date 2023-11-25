import React, { Component, useEffect, useState } from 'react';
import "./App.css"

const Home = () => {

  const [show, setShow] =useState(false);
  const [data, setData] =useState([
    {
        "isRated": true,
        "isApplied": true,
        "noOfRatings": 15,
        "rating": 4.5,
        "_id": "6561e372bc2daa4b14c9891f",
        "courseName": "Node.js",
        "courseDept": "WD",
        "description": "Node.js is used to create back-end services",
        "duration": 10,
        "__v": 0
    },
    {
        "isRated": true,
        "isApplied": true,
        "noOfRatings": 145,
        "rating": 4.3,
        "_id": "6561e372bc2daa4b14c98920",
        "courseName": "React.js",
        "courseDept": "WD",
        "description": "React.js is used to create front-end services",
        "duration": 14,
        "__v": 0
    },
    {
        "isRated": false,
        "isApplied": false,
        "noOfRatings": 10,
        "rating": 4.1,
        "_id": "6561e372bc2daa4b14c98921",
        "courseName": "Angular",
        "courseDept": "WD",
        "description": "Angular is used to create front-end services",
        "duration": 18,
        "__v": 0
    },
    {
        "isRated": false,
        "isApplied": true,
        "noOfRatings": 9,
        "rating": 4.2,
        "_id": "6561e372bc2daa4b14c98922",
        "courseName": "Machine Learning",
        "courseDept": "AI",
        "description": "ML is used in AI",
        "duration": 20,
        "__v": 0
    },
    {
        "isRated": false,
        "isApplied": false,
        "noOfRatings": 6,
        "rating": 4.4,
        "_id": "6561e372bc2daa4b14c98923",
        "courseName": "Springboot",
        "courseDept": "WD",
        "description": "Springboot is used to create back-end services",
        "duration": 12,
        "__v": 0
    }
]);
  const [rating, setRating] =useState(1);
  const [ q, setQ] = useState([1,2,3,4,5])

  useEffect(() => {
    handleGetData()
  },[])

  const componentDidMount = () => {
    // Write your code here
  }

  const handleGetData = async() => {
    // Write your code here
    const response = await fetch("http://localhost:8001/courses/get");
    const movies = await response.json();
    setData(movies)
  }

  const handleApply = async (id) => {
    // Write your code here
    const response = await fetch(`http://localhost:8001/courses/enroll/${id}`, { method : 'POST'});
    const val = await response.json();
    if(val.message) {
      alert('you have successfuly enrolled to the course')
    } else {
      alert('you have failed to enrolled')
    }
  };

  const handleRating = (e) => {
    // Write your code here
    setRating(e.target.value)
  }

  const handleAddRating = async (e, id) => {
    // Write your code here
    e.preventDefault()
    const response = await fetch(`http://localhost:8001/courses/rating/${id}`, { method : 'PATCH', body: JSON.stringify({"rating" : rating})});
    const val = await response.json();
    if( val.message) {
      setShow(true)
    }
  }

  const handleDrop = async (e, id) => {
    // Write your code here
    e.preventDefault()
    const response = await fetch(`http://localhost:8001/courses/drop/${id}`, { method : 'DELETE'});
    const val = await response.json();
    if( val.message) {
      setShow(true)
    }

  }

  return(
    <div className="home">
      <header>
          <h2>ABC Learning</h2>
      </header>
      {/* write your code here */}
      <div className="cardContainer" >
        { (data.map( (val, index) => {
          console.log(val);
          return(
              <div className="card" key={val._id}>
                <ul>
                  <div className="header">
                    <li>{val.courseName}</li>
                    <li>{val.courseDept}</li>
                    <li>{val.description}</li>                        
                    <li>
                      {!show && (
                        <li>Rate: 
                          <select className="rating" name="rating" value={rating} onChange={e => handleRating(e)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <button className="rate" onClick={e => handleAddRating(e, val._id )}>Add</button>
                        </li>
                      )}
                      
                      { !val.isApplied && (<button className="drop" onClick={ e => handleDrop(e, val._id)}>Drop Course</button>)}
                    </li>
                    <li>{val.isApplied && (<button className="btn">Apply</button>)}</li>
                  </div>
                  <div className="footer">
                    <li> {`${val.duration} hrs ${val.noOfRatings} Ratting. ${val.rating}/5`}</li>
                  </div>
                </ul>
              </div>
          )
        })) }
      </div>
    </div>
  )
}



// class Home extends Component {
  
//   state = {
//     show: false,
//     data: [],
//     rating: 1,
//   }
//   componentDidMount = async() => {
//     // Write your code here
//     const response = await fetch("http://localhost:8001/courses/get");
//     const movies = await response.json();
//     this.setState({ data : movies })
//   }
    
//   handleGetData = async() => {
//     // Write your code here
//     const response = await fetch("http://localhost:8001/courses/get");
//     const movies = await response.json();
//     this.setState({ data : movies })
//   }

//   handleApply = async (id) => {
//     // Write your code here
//     const response = await fetch(`http://localhost:8001/courses/enroll/${id}`, { method : 'POST'});
//     const val = await response.json();
//     if(val.message) {
//       alert('you have successfuly enrolled to the course')
//     } else {
//       alert('you have failed to enrolled')
//     }
//   };

//   handleRating = (e) => {
//     // Write your code here
//     this.setState({ rating : e.target.value })
//   }

  
//   handleAddRating = async (e, id) => {
//     // Write your code here
//     e.preventDefault()
//     const response = await fetch(`http://localhost:8001/courses/rating/${id}`, { method : 'PATCH', body: JSON.stringify({"rating" : this.state.rating})});
//     const val = await response.json();
//     if( val.message) {
//       this.setState({ show : true })
//     }
//   }

//   handleDrop = async (e, id) => {
//     // Write your code here
//     e.preventDefault()
//     const response = await fetch(`http://localhost:8001/courses/drop/${id}`, { method : 'DELETE'});
//     const val = await response.json();
//     if( val.message) {
//       this.setState({show : true})
//     }
//   }

//   render() {
//       return(
//     <div className="home">
//       <header>
//           <h2>ABC Learning</h2>
//       </header>
//       {/* write your code here */}
//       <div>
//         { (this.state.data.map( (val, index) => {
//           console.log(val);
//           return(
//             <div className="cardContainer" key={val._id}>
//               <div className="card">
//                 <ul>
//                   <div className="header">
//                     <li>{val.courseName}</li>
//                     <li>{val.courseDept}</li>
//                     <li>{val.description}</li>                        
//                     <li>
//                       {!this.state.show && (
//                         <li>Rate: 
//                           <select className="rating" name="rating" value={this.state.rating} onChange={e => this.handleRating(e)}>
//                             <option>1</option>
//                             <option>2</option>
//                             <option>3</option>
//                             <option>4</option>
//                             <option>5</option>
//                           </select>
//                           <button className="rate" onClick={e => this.handleAddRating(e, val._id )}>Add</button>
//                         </li>
//                       )}
                      
//                       { !val.isApplied && (<button className="drop" onClick={ e => this.handleDrop(e, val._id)}>Drop Course</button>)}
//                     </li>
//                     <li>{val.isApplied && (<button className="btn">Apply</button>)}</li>
//                   </div>
//                   <div className="footer">
//                     <li> {`${val.duration} hrs ${val.noOfRatings} Ratting. ${val.rating}/5`}</li>
//                   </div>
//                 </ul>
//               </div>
//             </div>
//           )
//         })) }
//       </div>
//     </div>
//   )
//   }
// }

export default Home;