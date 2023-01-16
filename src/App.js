import React, { useState, useEffect } from 'react';
import CreateMap from './Utils/parser'
import MyModel from './Component/myModel'           
import Draw from './Component/drawAirPlan'

function App() {
  const [ShowModel, setShowModel] = useState(false);
  const [ShowAirPlan, setShowAirPlan] = useState(false);
  const [Obj, setObj] = useState({})

  const handleSubmit = (dataForm) => {
    setShowModel(false)
    var newObj = CreateMap(dataForm)
    setObj(newObj)
  }

  useEffect(() => {
    if (Obj) setShowAirPlan(true)
  },[Obj])
  return (
    <div>
      <div className="flex justify-center items-center ml-sm">
        <div className=' m-10'>
          {/* ? Title */}
          <p className="text-xl text-gray-500 p-3 border-b border-color-500 "> Airplane	seating	algorithm </p>
          <button
            type='submit'
            onClick={() => (setShowModel(true))}
            className='mt-10 ml-10 bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm rounded-md font-semibold text-white'
          > 
            Create New Airplane
          </button>

          {/* ? Create new plan Model */}
          <MyModel visible={ShowModel} onClose={() => setShowModel(false)} onSubmit={(data) => handleSubmit(data)}/>
        </div>
      </div>
      {/* ? Draw new plan Model */}
      {(ShowAirPlan) ? <Draw Obj={Obj} Arr3D={Obj.arr}/> :""}
    </div>
  ); 
}

export default App;
