import {useState,useEffect} from 'react'
import car from "./car.png"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles'
import { Tab } from '@material-ui/core';


const App = () => {
  const useStyles = makeStyles((theme) => ({
    TextField:{
      margin: "10px 0",
      width: "30%",
      height: "50px",
    },
    app:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },  
    button:{
      margin:"10px 0"
    },
    table:{
      width:"50%"
    } 
  }))
  const classes = useStyles()
  const [cars,setCars] = useState([])
  const [brand,setBranch] = useState("")
  const [model,setModel] = useState("")
  const [year,setYear] = useState("")
  const [horsepower,setHorsePower] = useState("")
  const [isValid, setIsValid] = useState(false)

  
  
  const addCarHandler = () => {
    const oldCars = [...cars]
    const newCar = {brand, model, year, horsepower, id:Math.floor(Math.random()*1000)}
    if(brand === "" || model === "" || year === "" || horsepower === "")
    {
      alert("Fields cannot be blank")
      setIsValid(true)
    }
    else{
      const newCars = oldCars.concat(newCar)      
      setCars(newCars)
      localStorage.setItem("cars", JSON.stringify(newCars))
      setIsValid(false)
      setBranch("")
      setModel("")
      setYear("")
      setHorsePower("")     
    }
  }
 
  const deleteCarHandler = (id) =>{
    const oldCars = [...cars]
    const newCars = oldCars.filter((car)=>car.id !== id)
    setCars(newCars)
    localStorage.setItem("cars", JSON.stringify(newCars))
  }
  useEffect(()=>{
    if(localStorage.getItem("cars") !== null) {
      const localStorageCars = JSON.parse(localStorage.getItem("cars"))
      setCars(localStorageCars)
    }
    
  }, [setCars])
  return (
    <div className={classes.app}>
      <img src={car} style={{width: "300px"}}></img>
      <h1>ReactJS car Registation app</h1>
      <TextField id="outlined-basic" label="Brand" variant="outlined" className={classes.TextField} onChange={(e)=>setBranch(e.target.value)} value={brand} error={isValid}/>
      <TextField id="outlined-basic" label="Model" variant="outlined" className={classes.TextField} onChange={(e)=>setModel(e.target.value)} value={model} error={isValid}/>
      <TextField id="outlined-basic" label="Year" variant="outlined" className={classes.TextField} onChange={(e)=>setYear(e.target.value)} value={year} error={isValid}/>
      <TextField id="outlined-basic" label="HorsePower" variant="outlined" className={classes.TextField} onChange={(e)=>setHorsePower(e.target.value)} value={horsepower} error={isValid}/>
      <Button variant="contained" color="secondary" className={classes.button} onClick={addCarHandler}>
        Add Car
      </Button>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Branch</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">HoursPower</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car,index)=>
            <TableRow key={index} > 
              <TableCell align="center">{car.brand}</TableCell>
              <TableCell align="center">{car.model}</TableCell>
              <TableCell align="center">{car.year}</TableCell>
              <TableCell align="center">{car.horsepower}</TableCell>
              <TableCell align="center">   
                <Button variant="contained" color="secondary" onClick={() => deleteCarHandler(car.id)}>Delete</Button>        
              </TableCell>
            </TableRow>           
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
