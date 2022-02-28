import { useEffect, useState, useRef } from "react";
import './Home.css';

export default function Home({removeToken}){

    const [list,setList] = useState([]);

    let [page,setPage] = useState(0);
    let [loader,setLoader] = useState(false);

    //code for infinite scrolling
    useEffect(()=>{
      
      window.addEventListener("scroll",throttle());
        return () =>{
            window.removeEventListener("scroll",throttle());
        }
        
      },[])
    
    // throttling every 1 sec when user reaches to the bottom of screen

    function throttle(){
      let timer =  false;  
      console.log(timer);

        return function() {          
          const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight      
          if(bottom && !timer){            
            console.log('at the bottom');
            check_if_needs_more_content();
            timer = true;
            setTimeout(()=>{
              timer = false;
            },1000);
          }
       } 
      }
      
    // func to update page number

    function check_if_needs_more_content() {     
      console.log("firing");
      setPage((page) => page + 1);  
       
     }
    



    // to call getrecent api

    useEffect(()=>{
      setLoader(true);
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b198091c72f3e597f6b23555d221416b&per_page=10&page=${page}&format=json&nojsoncallback=1`)       
        .then((res) => res.json())
        .then((data) => {            
            if(data.length == 0){
                setList([]) 
            }
            else{
                const newList = list.concat(data.photos.photo);
                setList(newList)
            }
            setLoader(false);
        });        

    },[page])

    function handleLogout(){
      removeToken();
      window.history.replaceState(null, "Shaddi.com", "/")
    }
  
    return(
        <>
        
        
        <div className=" row header text-center">
          <div className=" col-lg-11 col-sm-11 col-md-11 col-xs-11  ">
            <label>List of Images</label>
            </div>
            <div className=" col-lg-1 col-sm-1 col-md-1 col-xs-1">
            <button className="btn btn-danger" onClick={handleLogout}> Logout </button></div>
        </div>

        <div className="row">
     
        {list && list.map((items,index)=>{
            return(
                <span key={index} className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                <img  src={`https://live.staticflickr.com/${items.server}/${items.id}_${items.secret}.jpg`}></img>
                </span>
            )
        })}
        
        </div>
        {/* To show loader when there is o data or when api is fetching more data */}
        
        {loader && <div className="loading">
                    <h2>Loading More.....</h2>
        </div>}
        
      </>
    )
}