"use client";

import { Button } from "/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "/utils/GeminiAIModel";


function RecordAnswerSection(mockInterviewQuestion, activeQuestionIndex) {
  const [userAnswer, setuserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setuserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving your answer, Please record again");
        return;
      }
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for given interview question" +
        "Please give us a rating for the answer and feedback as area of improvement if any " +
        " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(mockJsonResp);
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-[#83838345]">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />

        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        className="shadow-lg my-5   text-[white] bg-[#dc1a1a] text-lg font-bold"
        variant="outline"
        onClick={SaveUserAnswer}
      >
        {isRecording ? (
          <h2 className="flex gap-2 animate-pulse">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-2">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>

      <Button className='bg-[white] text-[black] text-lg font-bold' variant="outline" onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;