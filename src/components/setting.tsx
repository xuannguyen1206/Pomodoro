
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { timeSetting } from '../pages';
function Setting({selected,toggle,updateTimeSettings}:{selected:boolean,toggle:()=>void,updateTimeSettings:(data:timeSetting)=>void}) {
  const [errorMessage,setErrorMessage] = useState('');
  const {register,handleSubmit} = useForm({defaultValues:{
    pomodoro:'25',
    shortBreak:'5',
    longBreak:'30',
    darkMode:false
  }});
  function collectInput(data:timeSetting){
    updateTimeSettings(data);
    toggle();
    setErrorMessage('');
  }
  function onError(errors:any){
    console.log(Object.keys(errors)[0],':',errors[Object.keys(errors)[0]].message)
    setErrorMessage(`${Object.keys(errors)[0]}: ${errors[Object.keys(errors)[0]].message}`)
  }
  return ( 
    <section className={`bg-white w-11/12 h-[90%] absolute rounded-2xl md:h-[70%] md:w-[60%] xl:w-[50%] xl:h-[65%] xl:max-w-[700px] short:h-[95%] ${selected ? 'block': 'hidden'}`} >
      <div className=" h-[12%] p-4 py-3 border-b-2 border-solid border-black, border-opacity-50 flex items-center justify-between md:p-10 short:p-2">
        <span className="font-semibold text-lg">Settings</span>
        <span className=" text-4xl cursor-pointer select-none" onClick={toggle}>&#215;</span>
      </div>
      <div>
        <form className=' flex flex-col items-center' onSubmit={handleSubmit(collectInput,onError)}>
          <h1 className=' text-center my-4 text-sm tracking-[0.25rem] short:my-2'>TIME (MINUTES)</h1>
          <div className='flex flex-col xl:flex-row'>
            <label className='w-full px-5 flex items-center text-xs justify-between text-gray-400 xl:flex-col xl:my-2 xl:text-base' htmlFor="pomodoro">pomodoro
              <input className='w-1/2 bg-gray-200 p-2 rounded-lg text-xl text-black font-medium xl:mt-3 xl:px-5 xl:w-32' id='pomodoro' type='number' {...register('pomodoro',{required:true,max:{value:99,message:'max is 99'},min:{value:25,message:'min is 25'}})}/>
            </label>
            <label className='my-2 w-full px-5 flex items-center text-xs justify-between text-gray-400 xl:flex-col xl:my-2 xl:text-base' htmlFor="shortBreak">short break
              <input className='w-1/2 bg-gray-200 p-2 rounded-lg text-xl text-black font-medium xl:mt-3 xl:px-5 xl:w-32' id='shortBreak' type='number' {...register('shortBreak',{required:true,max:{value:99,message:'max is 99'},min:{value:1,message:'min is 1'}})}/>
            </label>
            <label className='w-full px-5 flex items-center text-xs justify-between text-gray-400 xl:flex-col xl:my-2 xl:text-base' htmlFor="longBreak">long break
              <input className='w-1/2 bg-gray-200 p-2 rounded-lg text-xl text-black font-medium xl:mt-3 xl:px-5 xl:w-32' id='longBreak'type='number' {...register('longBreak',{required:true,max:{value:99,message:'max is 99'},min:{value:10,message:'min is 10'}})}/>        
            </label>
          </div>
          <div className='w-full mt-6 px-5 short:mt-2'>
            <div className='py-7 border-y-2 border-solid border-opacity-50 short:p-0'>
              <div className='flex flex-col items-center justify-center md:flex-row md:justify-around'>
                <h1 className='text-center pb-5 text-sm tracking-[0.25rem] short:pb-2'>DARK MODE</h1>
                <label className=' relative w-24 h-12 flex inline-block'>
                  <input type='checkbox' className=' opacity-0 w-0 h-0 checked:slide' {...register('darkMode')}/>
                  <span className=' absolute cursor-pointer top-0 bottom-0 left-0 right-0 bg-gray-700 transition-property-[transform] duration-75 rounded-full 
                  before:absolute before:w-[40px] before:h-5/6 before:bg-white before:left-1 before:bottom-1 before:rounded-full before:transition-property-[transform] before:duration-500 '></span>
                </label>
              </div>
            </div>
          </div>
          <div>
          </div>
         
          {errorMessage && <p className=' text-red-500 text text-xs text-center md:text-base'>{errorMessage}</p>}
          <span className=' font-xs'>made by</span>
          <span className=' font-Amatic text-4xl text-red-500'>HXN</span>
          <button type='submit' className='absolute -bottom-6  p-11 py-3 rounded-full bg-red-400' >Apply</button>
          
        </form>
      </div>
    </section>
   );
}

export default Setting;