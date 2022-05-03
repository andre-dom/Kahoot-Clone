import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts"

const CompletedView = () => {

  const { slug } = useParams(); 
  const { auth } = useAuth(); 

  const [data, setData] = useState([]);
  const [meanScore, setMeanScore] = useState();
  const [medianScore, setMedianScore] = useState();


  /**
   * Uses quiz slug to fetch data
   */
  const gameCompleted = async () => {
    
    const response = await fetch(`http://127.0.0.1:8000/game/completed/${slug}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${auth.token}`
      },
    })

    if(!response.ok){
      console.log('error' + response);
    }
    const result = await response.json();
  
    setData(result.data);
    setMeanScore(result.mean_score);
    setMedianScore(result.median_score);

  }; 

  useEffect(() => {

    gameCompleted(); 


  }, [])


  return(
    <div>

        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis allowDecimals = {false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        <div>
          <h4>{meanScore}</h4>
          <h4>{medianScore}</h4>
        </div>

    </div>

  )
}

export default CompletedView;