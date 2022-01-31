function Taskbar({taskTab,setTaskTab,color}:{taskTab:number,setTaskTab:(tab:number)=>void,color:string}) {
  function tabSwitch(e:any){
    if(e.target.childElementCount === 0)
    setTaskTab(Array.from(e.target.parentNode.children).indexOf(e.target));
  }
  return ( 
    <section style={{backgroundColor:`${color}`}} className="bg-test-bar p-1 w-11/12 flex justify-around mt-7 rounded-full md:w-auto" onClick={tabSwitch}>
      <span className={`select-none p-[1.6em] px-[1.4rem] flex items-center ${taskTab === 0 ? ' bg-[#f87070]' : 'bg-transparent text-white'} transition-property-[transform] duration-150 hover:scale-125 cursor-pointer text-xs font-semibold rounded-full lg:px-[2rem] lg:p-[2.4] lg:text-sm`}>pomodoro</span>
      <span className={`select-none p-[1.6em] px-[1.4rem] flex items-center ${taskTab === 1 ? ' bg-[#f87070]' : 'bg-transparent text-white'} transition-property-[transform] duration-150 hover:scale-125 cursor-pointer text-xs font-semibold rounded-full lg:px-[2rem] lg:p-[2.4] lg:text-sm`}>short break</span>
      <span className={`select-none p-[1.6em] px-[1.4rem] flex items-center ${taskTab === 2 ? ' bg-[#f87070]' : 'bg-transparent text-white'} transition-property-[transform] duration-150 hover:scale-125 cursor-pointer text-xs font-semibold rounded-full lg:px-[2rem] lg:p-[2.4] lg:text-sm`}>long break</span>
    </section>
  );
}

export default Taskbar;