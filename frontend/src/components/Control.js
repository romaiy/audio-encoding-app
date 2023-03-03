import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";

const RecordView = (props) => {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);

            let computedSecond =
                String(secondCounter).length === 1
                ? `0${secondCounter}`
                : secondCounter;
            let computedMinute =
                String(minuteCounter).length === 1
                ? `0${minuteCounter}`
                : minuteCounter;

            setSecond(computedSecond);
            setMinute(computedMinute);

            setCounter((counter) => counter + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    const stopTimer = () => {
        setIsActive(false);
        setCounter(0);
        setSecond("00");
        setMinute("00");
    }

    const { status, startRecording, stopRecording, pauseRecording, mediaBlobUrl
    } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
    });

    console.log("url", mediaBlobUrl);

    return (
        <div className="control">
            <div className="control__content container">
                <h1 className="control__heading">{status}</h1>
                <div>
                <video src={mediaBlobUrl} controls loop />
                </div>

                <div>
                <button
                    onClick={stopTimer}
                >
                    Clear
                </button>
                <div>
                    <span className="minute">{minute}</span>
                    <span>:</span>
                    <span className="second">{second}</span>
                </div>

                <div>
                    <label
                    htmlFor="icon-button-file"
                    >
                    <h3>
                        Press the Start to record
                    </h3>

                    <div>
                        <button
                        onClick={() => {
                        if (!isActive) {
                            startRecording();
                        } else {
                            pauseRecording();
                        }

                        setIsActive(!isActive);
                        }}
                    >
                        {isActive ? "Pause" : "Start"}
                        </button>
                        <button
                        onClick={() => {
                            stopRecording();
                            pauseRecording();
                        }}
                        >
                        Stop
                        </button>
                    </div>
                    </label>
                </div>
                <b></b>
            </div>
            </div>
        </div>
);
};
export default RecordView;
