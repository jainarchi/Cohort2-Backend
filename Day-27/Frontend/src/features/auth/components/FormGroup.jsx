import {RiEyeLine} from "@remixicon/react"

const formGroup = ({label , type , onChange , value , name}) => {

  return (
    <div className='formGroup'>
        <label className='label'>{label}</label>

       <div className="inp-div">
         <input className='input'
         name={name}
         value={value}
         onChange={onChange}
         type={type} 
         placeholder={label} 
         
         />

         {type === "password" && 
         <span >
            <RiEyeLine 
             size="1.2rem" 
             className="eye-icon"
            />

          </span>}
        </div> 
       
      
    </div>
  )
}

export default formGroup
