import type { NextPage } from 'next'
import Head from 'next/head'
import Taskbar from '../components/taskbar'
import Clock from '../components/clock'
import AppleCounter from '../components/appleCounter'
import Setting from '../components/setting'
import {  useEffect, useRef, useState } from 'react'
import axios from 'axios'

type ObjectKeys<T> = 
  T extends object ? (keyof T)[] :
  T extends number ? [] :
  T extends Array<any> | string ? string[] :
  never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}

export interface timeSetting{
  pomodoro: string;
  shortBreak: string;
  longBreak: string;
  darkMode: boolean;
}

const Home: NextPage = () => {
  const [settingOn,setSettingOn] = useState(false);
  const [taskTab,setTaskTab] = useState(0);
  const [timeSetting,SetTimeSetting] = useState<timeSetting>({pomodoro:'1',shortBreak:'1',longBreak:'30',darkMode:false});
  const [clockTime,setClockTime] = useState(1);
  const [clockdone,setclockdone] = useState(false);
  const [appleNum,setAppleNum] = useState(1);
  const [keeptab,setKeepTab] = useState(false); /* check if tab just got changed in the loop between setTaskTab and clockdone */
  const [circleColors,setCircleColor] = useState([]);
  const [barColor,setBarColor] = useState('');
  const [background,setBackground] = useState('');
  const [isLoadingColor,setIsLoadingColor] = useState(true);
  const colorInUse = useRef<Array<string>>([]);
  const darkColor = useRef([]);
  const lightColor = useRef([])
  const alarm = useRef<HTMLAudioElement>(null);

  function updateTimeSettings(settings : timeSetting ){
    SetTimeSetting(settings);
  }
  function toggleSetting(){
    settingOn ? setSettingOn(false) : setSettingOn(true);
  }
  function resetClock(taskTab:number){ 
    setClockTime(parseInt((timeSetting as any)[Object.keys(timeSetting)[taskTab]])*60);
  }
  function changeClockDoneStatus(){
    clockdone ? setclockdone(false) : setclockdone(true);
  }
  function updateApple(){
    if(taskTab === 0){
      if(appleNum === 4 ) setAppleNum(0); else setAppleNum(appleNum+1);
    } else if(taskTab === 2){
      setAppleNum(0);
    }
  }
  function updateTaskbar(){
    setKeepTab(true);
    if(taskTab === 0){
      if(appleNum !== 4){
        setTaskTab(1)
      } 
      else {
        setTaskTab(2);
    }
    } 
    else setTaskTab(0);
  }
  function shuffleAndSetColor(){
    colorInUse.current = shuffle(colorInUse.current as any); 
    setCircleColor([colorInUse.current[2],colorInUse.current[3]] as never);
    setBarColor(colorInUse.current[2]);
    setBackground(`linear-gradient(${Math.floor(Math.random() * 365+1)}deg,${colorInUse.current[0]},${Math.floor(Math.random() * (70 - 50)+50)}%,${colorInUse.current[1]})`);
 }
  function shuffle(array:[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  function changeColor(){
    if(!timeSetting.darkMode){
      colorInUse.current = lightColor.current[Math.floor(Math.random()*lightColor.current.length)];
    } else {
      colorInUse.current = darkColor.current[Math.floor(Math.random()*darkColor.current.length)];
    }
    shuffleAndSetColor();
    
  }
  function stopAlarm(){
    alarm.current?.pause();
  }
  useEffect(()=>{
    updateApple();
    updateTaskbar();
    if(alarm.current){
      if(alarm.current.muted){
        alarm.current.muted = false;
      } else {
        alarm.current.play()
      }
    }
    },[clockdone])

  useEffect(()=>{
    resetClock(taskTab);
  },[taskTab,timeSetting]); 
  useEffect(()=>{    
    colorInUse.current = ['#301B3F','#B4A5A5','#3C415C','#151515'];
    const getDarkColor = axios.get('/api/dark');
    const getLightColor = axios.get('/api/light');
    Promise.all([getDarkColor,getLightColor]).then((result)=>{
      darkColor.current = result[0].data;      
      lightColor.current = result[1].data;
      setIsLoadingColor(false);
    }).then(()=>{
      const getNightColor = axios.get('/api/night');
      const getNeonColor = axios.get('/api/spring');
      Promise.all([getNightColor,getNeonColor]).then((result)=>{
        darkColor.current = [...darkColor.current,...result[0].data] as never;
        lightColor.current = [...lightColor.current,...result[1].data] as never;        
      }).then(()=>{
        const getWarmColor = axios.get('/api/warm');
        const getRainbowColor = axios.get('/api/rainbow')
        Promise.all([getWarmColor,getRainbowColor]).then((result)=>{
          darkColor.current = [...darkColor.current,...result[0].data] as never;
          lightColor.current = [...lightColor.current,...result[1].data] as never;        
        })
      })
    })
  },[])

  return (
    <>
     <Head>
       <title>Pomodoro</title>
       <link rel="icon" href="./apple.png" />
       <link href="./all.css" rel="stylesheet"></link>
       <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap" rel="stylesheet"/> 
     </Head>
     <main onClick={stopAlarm} style={{backgroundImage:background}} className='bg-gradient h-screen flex flex-col items-center justify-evenly'>
        <h1 style={{color :`${colorInUse.current[3]}`}} className=' select-none text-3xl pt-7 text-center text-test-circle short transition-property-[color] duration-1000 lg:text-4xl xl:text-5xl'>pomodoro</h1>
        <div className=' w-full flex flex-col items-center'>
          <Taskbar color={barColor} taskTab={taskTab} setTaskTab={setTaskTab} />
          <AppleCounter color={barColor} setAppleNum = {setAppleNum} appleNum = {appleNum}/>
        </div>
        <Clock changeColor={changeColor} isLoadingColor={isLoadingColor} keepTab={keeptab} shuffleColor={shuffleAndSetColor} colors={circleColors} setKeepTab={setKeepTab} taskTab={taskTab} clockTime = {clockTime} changeClockDoneStatus = {changeClockDoneStatus} clockdone={clockdone}/>
        <audio ref={alarm}  muted={true} className='hidden' src='./ringtone.mp3'/>
        <i style={{color :`${colorInUse.current[3]}`}} className="fas fa-cog mt-4 text-test-circle text-4xl lg:text-5xl" onClick={toggleSetting}></i>
        <Setting selected={settingOn} updateTimeSettings = {updateTimeSettings} toggle={toggleSetting}/>
     </main>
    </>
  )
}

export default Home
