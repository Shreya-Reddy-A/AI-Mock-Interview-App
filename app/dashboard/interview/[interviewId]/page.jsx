"use client"
// import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
// import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
//import { Button } from "../../../ui/button";
import { MockInterview } from "../../../../utils/schema";
import { db } from "../../../../utils/db";
import { Button } from "/components/ui/button";
import Link from "next/link";


function Interview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        setInterviewData(result[0])
    }   
  return (
    <div className="my-6 ">
<h2 className="font-bold text-2xl text-[#dc1a1a]">Let's Get Started</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

<div className="flex flex-col my-5 gap-5">
    <div className="flex flex-col p-5 border rounded-lg border-[white] gap-5">
    <h2 className="text-lg w-full" ><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
    <h2 className="text-lg w-full"><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDescription}</h2>
    <h2 className="text-lg w-full"><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
    </div>
    <div className="p-5 border rounded-lg border-[#dc1a1a] bg-[#9a8e8e36]">
        <h2 className="flex gap-2 items-center text-[#dc1a1a] "><Lightbulb /><strong>Information</strong></h2>
        <h2 className="mt-3 text-justify text-md font-medium text-white">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
    </div>
</div>
<div>
{webCamEnabled? <Webcam
onUserMedia={()=>setWebCamEnabled(true)}
onUserMediaError={()=>setWebCamEnabled(false)}
mirrored={true}
style={{
    height:300,
    width:300
}}
/>
:
<>
<WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border"></WebcamIcon>
<Button variant="ghost" className='bg-[#dc1a1a] w-full text-md font-semibold' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
</>
}

</div>

</div>
<div className="flex justify-end items-end w-full">
<Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
    <Button variant='ghost' className=" text-md font-semibold bg-white text-black">Start Interview</Button>
</Link>
</div>
</div>
  )
}

export default Interview