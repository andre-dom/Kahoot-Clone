import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,

   
} from '@chakra-ui/react';

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts"

import {

  ip,  
  port
} from '../../ports'; 

const CompletedView = () => {

  const { slug } = useParams(); 
  const { auth } = useAuth(); 

  const [data, setData] = useState([]);
  const [meanScore, setMeanScore] = useState();
  const [medianScore, setMedianScore] = useState();
  const [name, setName] = useState();


  /**
   * Uses quiz slug to fetch data
   */
  const gameCompleted = async () => {
    
    const response = await fetch(ip + port + `/game/completed/${slug}/`, {
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
    setName(result.name);

  }; 

  useEffect(() => {

    gameCompleted(); 


  }, [])


  return(
    <div>
      
      <Center>
        <VStack mt={20} spacing={8}>
        <Box>
        <Heading as='h3' size='lg'>
          {name}
        </Heading>
        </Box>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis allowDecimals = {false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#72bcd4" />
        </BarChart>

          <HStack>
            <h4>Mean Score: {meanScore}</h4>
            <h4>Median Score: {medianScore}</h4>
          </HStack>
        </VStack>
      </Center>

    </div>

  )
}

export default CompletedView;