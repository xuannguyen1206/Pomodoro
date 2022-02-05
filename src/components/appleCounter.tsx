import Image from "next/image";
import { useEffect, useState } from "react";

function AppleCounter({appleNum,setAppleNum,color}:{appleNum:number,setAppleNum:(apple:number)=>void,color:string}) {
  function addApple(){
    if(appleNum === 4 ) setAppleNum(0)
    else setAppleNum(appleNum+1);
  }
  function minusApple(){
    if(appleNum === 0) setAppleNum(4)
    else setAppleNum(appleNum-1);    
  }
  return ( 
    <section style={{backgroundColor:`${color}`}} className=" bg-test-bar p-2 w-11/12 flex items-center justify-around mt-4 rounded-full  md:w-96 lg:w-[30rem] lg:p-3 short:mt-2">
      <i className="fas fa-minus text-xl cursor-pointer text-white transition-property-[transform] duration-150 hover:scale-125" onClick={minusApple} />
        <div className="w-6 h-6 select-none lg:w-8 lg:h-8">
          <Image className={`${appleNum > 0 ? '' : 'black-out'}`} src='/apple.png' width={330} height={362} layout="intrinsic"/>
        </div>
        <div className="w-6 h-6 select-none lg:w-8 lg:h-8">
          <Image className={`${appleNum > 1 ? '' : 'black-out'}`} src='/apple.png' width={330} height={362} layout="intrinsic"/>
        </div>
        <div className="w-6 h-6 select-none lg:w-8 lg:h-8">
          <Image className={`${appleNum > 2 ? '' : 'black-out'}`} src='/apple.png' width={330} height={362} layout="intrinsic"/>
        </div>
        <div className="w-6 h-6 select-none lg:w-8 lg:h-8">
          <Image className={`${appleNum > 3 ? '' : 'black-out'}`} src='/apple.png' width={330} height={362} layout="intrinsic"/>
        </div>
      <i className="fas fa-plus text-xl cursor-pointer text-white transition-property-[transform] duration-150 hover:scale-125" onClick={addApple} />
    </section>
  );
}

export default AppleCounter