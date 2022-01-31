import {  useEffect, useRef, useState } from "react";
import ReactLoading from 'react-loading'
interface clockProp {
  keepTab:boolean,
  setKeepTab:(keeptab:boolean)=>void,
  taskTab:number,
  clockTime:number,
  changeClockDoneStatus:()=>void,
  clockdone:boolean,
  colors:Array<string>,
  shuffleColor:()=>void,
  isLoadingColor:Boolean,
  changeColor:()=>void,
}

function Clock({keepTab,setKeepTab,taskTab,clockTime,changeClockDoneStatus,isLoadingColor,colors,shuffleColor,changeColor,clockdone}:clockProp) {
  const [time,setTime] = useState(10)
  const [minute,setMinute] = useState(0);
  const [second,setSecond] = useState(0);
  const [clockRunning,setClockRunning] = useState(false);
  const [outsideColor,setOutsideColor] = useState('');
  const [circleColor,setCircleColor] = useState('');
  const intervalID = useRef<NodeJS.Timer | number>(0)
  const strokeOffset = useRef(0);

  function timeUpdate(){
    setTime((prevTime) => {
      if(prevTime !== -1 ) return prevTime - 1
      else return prevTime
    });
  }
  function updateClockStatus(){
    clockRunning ? setClockRunning(false) : setClockRunning(true);
  }
  function resetClock(){ /* even if the clock is not done, thus clockdone is not changed in this function */
    clearInterval(intervalID.current as number);
    setClockRunning(false);
    setTime(clockTime);
    if(time === 1  && !keepTab) {
      changeClockDoneStatus();
      setKeepTab(false);
    } 
  }


  useEffect(()=>{
    strokeOffset.current = 351.68-(351.68 /*circumference of circle */ * (time/clockTime)) ;
    setMinute(Math.floor(time/60));
    setSecond(time % 60);
    if(time === -1) {
      changeClockDoneStatus();
      setClockRunning(false);
      clearInterval(intervalID.current as number);
    };
  },[time])
  useEffect(()=>{ /* reset the CLOCK when clock is done ticking or switch tab */
    resetClock();
    
  },[clockTime,taskTab]);
  useEffect(()=>{
    setOutsideColor(colors[0]);
    setCircleColor(colors[1]);
  },[colors])
  
  return (
    <section style={{backgroundColor:`${outsideColor}`}}  className="w-[21.5rem] h-[21.5rem] bg-test-bar rounded-full flex items-center justify-center 
     md:w-[26rem] md:h-[26rem]">
      <div className="w-[19.8rem] h-[19.8rem] rounded-full relative  flex items-center justify-center md:w-[23rem] md:h-[23rem]">
        <figure className=" absolute w-full h-full">{/* progress circle */}
          <div className=' relative w-full h-full flex items-center justify-center'> 
            <svg className=' absolute w-full h-full stroke-test-circle' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox='0 0 120 120' width="300px" height="300px">
              <circle stroke={`${circleColor}`} strokeDashoffset={strokeOffset.current} className='circle transition-property-[ stroke-dashoffset] duration-1000 fill-[none] stroke-[8px]  ' cx="60" cy="60" r='56' strokeLinecap="round" />
            </svg>
            <div className=" w-[17rem] h-[17rem] bg-white rounded-full relative flex flex-col items-center justify-center text-black md:w-[20rem] md:h-[20rem]">
                <div className="absolute w-9/12 top-12 flex justify-between md:justify-around">
                  <button onClick={changeColor} className=" p-2 px-6 rounded-full text-white bg-gray-600 text-center">
                    {isLoadingColor ? <ReactLoading type={"spin"} color="white" height={'20px'} width={'20px'} /> : 'Color' }
                  </button>
                  <button onClick={shuffleColor} className=" p-2 px-4 rounded-full text-white bg-gray-600 top-12">Shuffle</button>
                </div>
                <div className="relative text-7xl select-none">
                  <span>{minute !== -1 ? minute : 0}</span>
                  <span>:</span>
                  <span>{second !== -1 ? second : 0}</span>
                </div>
                <div className="absolute bottom-16 w-1/2 flex justify-around">
                  <i className={`fas fa-play cursor-pointer ${clockRunning ? 'pointer-events-none' : ''}`}onClick={()=>{intervalID.current = setInterval(timeUpdate,1000);updateClockStatus()}}></i>
                  <i className={`fas fa-pause cursor-pointer ${!clockRunning ? 'pointer-events-none' : ''}`} onClick={()=>{clearInterval(intervalID.current as number); updateClockStatus()}}></i>
                </div>
              </div>
          </div>
        </figure>
      </div>

        
       
    </section>
  );
}

export default Clock;