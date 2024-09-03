"use client"
import React, { useState } from 'react'
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Textarea } from "/components/ui/textarea";
import { chatSession } from '/utils/GeminiAIModel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "/components/ui/dialog"
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '/utils/db';
import { useRouter } from 'next/navigation';



function AddNewInterview() {
    const [openDialog, setOpenDialog]=useState(false)
    const [jobPosition, setjobPosition] = useState();
    const [jobDescription, setjobDescription] = useState();
    const [jobExperience, setjobExperience] = useState();
    const [loading, setLoading]=useState(false);
    const [JsonResponse, setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();

    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition,jobDescription,jobExperience)
        const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDescription+", Years of Experience : "+jobExperience+", Depends on Job Position, Job Description & Years of Experience give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" technical and behavioural HR Interview question along with Answer in JSON format. Give us question and answer field on JSON"

        const result=await chatSession.sendMessage(InputPrompt)
        
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        if(MockJsonResp)
        {

        const resp=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDescription:jobDescription,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')

        }).returning({mockId:MockInterview.mockId})
        console.log("Inserted ID:",resp)
        if(resp)
        {
            setOpenDialog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)

        }
        }
        else{
            console.log("ERROR");
        }
        setLoading(false)
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-[#9a8e8e36] hover:scale-105
        hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
        >
            <h2 className='font-bold text-white text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
        
        <DialogContent className='max-w-2xl bg-secondary'>
            <DialogHeader>
            <DialogTitle className='font-extrabold text-2xl text-white mt-2'>Give us a brief overview of the position you are seeking?<br /></DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    
                    <h2 className="text-lg font-bold  mt-3 text-white">Provide information about your job position, role, job description, and years of experience. <br /> </h2>
                    <div className='mt-6 my-2'>
                        <label className='font-bold text-lg text-gray-300'>Job Role</label>
                        <Input placeholder="Ex. Full Stack Developer" required 
                        onChange={(event)=>setjobPosition(event.target.value)} />
                    </div>
                    <div className=' my-2'>
                        <label className='font-bold text-lg text-gray-300'>Job Description / Tech Stack</label>
                        <Textarea placeholder="Ex. React, Angular, NodeJs, Mysql etc" required
                        onChange={(event)=>setjobDescription(event.target.value)} />
                    </div>
                    <div className=' my-2'>
                        <label className='font-bold text-lg text-gray-300'>Years of Experience</label>
                        <Input placeholder="Ex. 5" type="number" max="50" required
                        onChange={(event)=>setjobExperience(event.target.value)} />
                    </div>
                </div>
                
                <div className='flex gap-5 justify-end '> 
                    <Button type="submit" variant=""  disabled={loading} >
                        {loading?
                        <>
                        <LoaderCircle className='animate-spin'/>'Generating Interview Questions..'
                        </>:'Start Interview'
                        }

                       </Button>
                    <Button type="button" variant="destructive" onClick={() => setOpenDialog(false)}>Cancel</Button>
                    
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

      
    </div>
  )
}

export default AddNewInterview

