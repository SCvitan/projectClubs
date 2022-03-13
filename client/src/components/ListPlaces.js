import React, {Fragment, useEffect, useState} from 'react'
import EditPlaces from './EditPlaces'

const ListPlaces = () => {

    const [places, setPlaces] = useState([])

    //delete place function
    const deletePlace = async id => {
        try {
            const deletePlace = await fetch(`http://localhost:5000/places/${id}`, {
                method:"DELETE"
            })

            setPlaces(places.filter(place => place.placeid !== id))

        } catch (err) {
            console.error(err.message)
        }
    }

//get places
    const getPlaces = async () => {
        try {
            const response = await fetch("http://localhost:5000/places/")
            const jsonData = await response.json()

            setPlaces(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=> {
        getPlaces();
    }, []);

    console.log(places)
  return (
    <Fragment><table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {places.map(place => (
          <tr key={place.placeid}>
              <td>{place.placename}</td>
              <td>
                  <EditPlaces/>
              </td>
              <td>
                  <button className="btn btn-danger" onClick={() => deletePlace(place.placeid)}>Delete</button>
              </td>
          </tr>
      ))}
    
    </tbody>
  </table></Fragment>
  )
}

export default ListPlaces