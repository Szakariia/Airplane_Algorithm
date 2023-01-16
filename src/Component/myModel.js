import React, { useState } from 'react';
import Inputvalidator from '../Utils/inputValidator';

function MyModel({ visible, onClose, onSubmit }) {

    const intialForm = {
        Seats : "",
        Passengers : ""
    }

    const [formValues, setFormValues] = useState(intialForm);
    const [formValuesError, setFormValuesError] = useState(intialForm);

    // check
    if (!visible) return ""

    const HandlingOnchangeValue = (e) => {
        const { name, value } = e.target;
        setFormValues(formValues => ({
          ...formValues, [name] : value
        }));
        const validatorResult = Inputvalidator(value, name)
        setFormValuesError({...formValuesError, [name] : validatorResult})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formValuesError.Passengers && !formValuesError.Seats && formValues.Passengers && formValues.Seats)
            onSubmit(formValues)
    }

    return (
        <div className='z-10 fixed inset-0 ml-sm bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className="m-10 p-12 bg-white broder rounded-lg drop-shadow-lg font-mono text-gray-500">
            {/* ? Title */}
            <p className="text-xl text-gray-500 p-3 border-b border-color-500"> Create New Airplane </p>
  
           {/* ? Rules */}
            <div className="mt-4">
              <p className='text-l font-semibold text-red-500'>Rules : </p>
              <p className='text-sm'>   <br/> Col = must be below 50 <br/>Row =  must be below 5</p>
            </div>
  
            {/* ? Form */}
          <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <p className='mt-4 text-l font-semibold text-green-500'>Input : </p>
              <div className='mt-4'>
                <p className='text-sm'>Seats [row, col] </p>
                <input
                  type="text"
                  name="Seats"
                  className={`mt-1 w-full px-3 py-2 bg-white border shadow-sm rounded-md focus:outline-none  ${!formValuesError.Seats ? 'border-slate-300 focus:border-gray-600' : 'border-red-500'}`}
                  placeholder="[3,2],[4,2]"
                  onChange={(e) => (HandlingOnchangeValue(e))}
                ></input>
                    {formValuesError?.Seats ? <p className="mt-2  text-red-500 text-sm">
                    {formValuesError.Seats}
                   </p> : ""}
              </div>
              <div className='mt-3'>
                <p className='text-sm'>Number of Passengers </p>
                <input 
                  type="number"
                  name="Passengers"
                  min="0"
                  className={`mt-1 w-full px-3 py-2 bg-white border shadow-sm rounded-md focus:outline-none  ${!formValuesError.Passengers ? 'border-slate-300 focus:border-gray-600' : 'border-red-500'}`}
                  placeholder="30"
                  onChange={(e) => (HandlingOnchangeValue(e))}
                  ></input>
                  {formValuesError?.Passengers ? <p className="mt-2  text-red-500 text-sm">
                    {formValuesError.Passengers}
                   </p> : ""}
              
              </div>
              <button
                type="submit"
                className='mt-5 bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm rounded-md font-semibold text-white'
              > 
                Create Airplane
              </button>
              <button
                onClick={() => onClose()}
                className='mt-5 ml-3 bg-rose-500 hover:bg-rose-700 px-5 py-2.5 text-sm rounded-md font-semibold text-white'
              > 
                Close
              </button>
            </div>
          </form>
          </div>
      </div>
    );
}

export default MyModel;