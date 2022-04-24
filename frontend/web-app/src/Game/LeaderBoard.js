import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const LeaderBoard = () => {

    const { auth } = useAuth(); 

    const [histogram, setHistogram] = useState(''); 

    //getSlug async () http://127.0.0.1:8000/game/completed/
    // const getSlug = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/game/completed/',{
    //         method: 'GET'
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `token ${auth.token}`
    //         }
    //     })
    //     if(!response.ok){
    //         console.log(response);
    //     }
    //     const result = await response.json();

    //     console.log('result: '+ result[0].slug);

    //     const { slug } = result[0];
    //     console.log('slug: '+slug);
    //     return slug;
    // }

    // getData async () http://127.0.0.1:8000/game/completed/{slug}/
    // const getData = async(slug) => {
    //     const response = await fetch(`http://127.0.0.1:8000/game/completed/${slug}/`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `token ${auth.token}`
    //         }

    //     })
    //     if(!response.ok){
    //         console.log('an error has occured');
    //         return;
    //     }
    //     const result = await response.json();
    //     console.log(result);
    //     return result;
    // }

    // getLeaderBoard -> getSlug -> getData(slug) return obj -> console.log(variable)
    const getLeaderBoard =  async () => {
        // const slug =  await getSlug();
        // const data =  await getData(slug);

        // setHistogram(data.histogram)
        // console.log(data.histogram)
        // console.log('data:' +data);

    }

 
    useEffect(() => {
        //getLeaderBoard(); 
        
    }, [])

    return(

        <div>
            <h3>Leaderboard</h3>
            {/* <img src = {'data:image/jpeg;base64,'+histogram} ></img> */}


        </div>
        
    )
}
export default LeaderBoard;