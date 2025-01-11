import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Home = () => {

const [data, setdata] = useState([])

const [Name, setname] = useState('')

const [Password, setpassword] = useState('')

const [id , setid] = useState('')

const [dlt, setdlt] = useState(null) 

const [update, setupdate] = useState (false)

useEffect(() => {
    fatch();
},[])

const fatch = async () => {
    await axios.get('https://67172ffdb910c6a6e026df54.mockapi.io/Crudoperation')
    .then((response)=>{
        setdata(response.data)
    })
}

const insert = async () => {
    const credit = { Name: Name , Password: Password}

    await axios.post ('https://67172ffdb910c6a6e026df54.mockapi.io/Crudoperation',credit)
    .then((response)=>{
        setname('');
        setpassword('');
        fatch();
    })
}

const delet = async (id) => {
    setdlt(id)
    let a  = confirm("Are you sure you want to delete this data")
    if(a==true){
        await axios.delete (`https://67172ffdb910c6a6e026df54.mockapi.io/Crudoperation/${id}`) 
.then((response) => {
    alert('Data Deleted Successfully')
    setdlt(null)
    fatch();
    }

)
}
    }

const isEdit = async() => {
    setupdate(true)

}

const edit = async () => {

   const credit = { Name: Name, Password: Password} 
await axios.put (`https://67172ffdb910c6a6e026df54.mockapi.io/Crudoperation/${id}`,credit)
.then ((response) => {
setname('')
setpassword('')
fatch();
})
} 



  return (
   <>
   <form>
   Please fill the form <br /> <br />
 Enter Your Name :<input type="text" value={Name} onChange={(e)=> setname(e.target.value)}/> <br /> <br />

 Enter Your Password :<input type="password" value={Password} onChange={(e)=> setpassword(e.target.value)} /> <br /> <br />
 
 <button type='button' onClick={()=>{
    if(update){
        edit();
    }
    else{
        insert();
    }
 }}>{update ?"Edit": "Submit" }</button>

   </form>

   <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th> 
            <th> Password </th>
            <th>Action</th>
        </tr>
        </thead>
<tbody>
    {data.map((items)=> {
        return(
            <tr key = {items.id}>
            <td>{items.id}</td>
            <td>{items.Name}</td>
            <td>{items.Password}</td>
            <td> 
                <button onClick={ () => { isEdit(); setid(items.id); setname(items.Name) ; setpassword(items.Password) }}>Edit</button>
                <button onClick={() => {delet(items.id);} }>Delete</button>
                </td>
            </tr>
        )
    }

    )}
</tbody>
        
   </table>

   </> 
)
}

export default Home
