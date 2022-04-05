import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const LeaderBoard = () => {

    const { auth } = useAuth(); 

    const getLeaderBoard = async () => {
        const response = await fetch('http://127.0.0.1:8000/game/completed/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${auth.token}`
            },
        })
        if(!response.ok){
            console.log(response);
        }
        const result = await response.json();

        console.log(result); 
    }

    useEffect(() => {
        getLeaderBoard(); 
    }, [])

    return(

        <div>Leader Board</div>
        
    )
}
export default LeaderBoard;