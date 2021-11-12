import React, { useState } from 'react';
import useToken from '../App/useToken';
import ConditionalButtons from '../res/ConditionalButtons'



export default function DashboardResults(searchquery) {

    const [data, SetData] = useState()
    const [currentpage, SetCurrentPage] = useState(0)
    const [quizcount, SetQuizCount] = useState()



    useEffect(() => {

        async function SetStatsfunc() {
          const StatsArray = []
    
       try {
            const userStats = await Fetch('http://localhost:8080/findquiz', { token, currentpage, searchquery })
    
    
            if (userStats.error) {
    
              alert("A server communication error has occurred")
    
            }
            else if (userStats.results) {
    
              //We destructure our array of objects into an 2d arraylist of values to be acceptable for a usestate hook
    
              const objectArray = (userStats.results)
              objectArray.forEach(value => {
    
                StatsArray.push(Object.values(value))
    
              });
    
    
              SetData(StatsArray)
              SetName(userStats.name[0].username)
              SetQuizCount(userStats.quizcount[0].count)
    
    
            }
    
          } catch {
    
            alert("A server error occurred")
    
          }
        }
    
    
    
        SetStatsfunc()
    
    
      }, [token, currentpage])
    
ConditionalButtons(6)




}
