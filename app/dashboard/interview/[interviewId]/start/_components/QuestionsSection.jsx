import { index } from "drizzle-orm/pg-core";
import { Lightbulb, Volume, LightbulbIcon,Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

    const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry, Your browser does not support text to speech')
        }
    }
  return mockInterviewQuestion&&(
    <div className="p-4 border rounded-lg my-10 border-[#9a8e8e36]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2 key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center font-bold cursor-pointer ${
                activeQuestionIndex === index ? 'bg-[#dc1a1a] text-[#ffffff]' : 'bg-[#9a8e8e36] text-[white] '
            }`}
            >
            Question {index + 1}.
            </h2>
          ))}
          
      </div>
      <h2 className="my-7 text-justify text-md md:text-lg font-semibold">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className="cursor-pointer text-[#dc1a1a]" onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} />
        


      <div className="border rounded-lg p-5 bg-[#9a8e8e36] mt-5">
        <h2 className="flex gap-2 items-center font-bold text-[#dc1a1a]">
            <Lightbulb />
            <strong>Note</strong>
        </h2>
        <h2 className="font-bold text-base text-justify text-[white]  my-4">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>

      </div>
    </div>
  );
}

export default QuestionsSection;
