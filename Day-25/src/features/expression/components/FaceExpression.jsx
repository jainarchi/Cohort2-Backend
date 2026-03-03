import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [mood, setMood] = useState("Click Detect Button");

  useEffect(() => {
    const initializeFaceLandmarker = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      faceLandmarkerRef.current =
        await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
          },
          
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1
        });

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = streamRef.current;
      await videoRef.current.play();
    };

    initializeFaceLandmarker();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Detect only when button clicked
  const detectExpression = () => {
    if (!faceLandmarkerRef.current || !videoRef.current) return;

    const results =
      faceLandmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

    if (results?.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

   

    // console.log(results.faceBlendshapes);

      const smile =
        getScore("mouthSmileLeft") > 0.04 &&
        getScore("mouthSmileRight") > 0.04;

      const surprised =
        getScore("jawOpen") > 0.4 &&
        getScore("browInnerUp") > 0.4;

      const angry =
        getScore("browDownLeft") > 0.04 &&
        getScore("browDownRight") > 0.04;

      const sad =
        getScore("mouthShrugLower") > 0.2 &&
        getScore("mouthShrugUpper") > 0.2

      let newMood = "😐 Neutral";

      if (surprised) newMood = "😲 Surprised";
      else if (angry) newMood = "😠 Angry";
      else if (smile) newMood = "😊 Happy";
      else if(sad) newMood = "😢 Sad";

      setMood(newMood);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
     

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "500px",
          borderRadius: "10px",
          border: "3px solid #333"
        }}
      />

       <h2>Current Mood: {mood}</h2>

      <div style={{ marginTop: "20px" }}>
        <button onClick={detectExpression}>
          Detect Expression
        </button>
      </div>
    </div>
  );
}