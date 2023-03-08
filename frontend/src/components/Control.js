import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import Status from "./Status";

const RecordView = () => {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [visible, setVisible] = useState(false);
    
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

    const startVisible = () => {
        if (!visible) {
            setIsActive(false);
            setCounter(0);
            setSecond("00");
            setMinute("00");
        }
        setVisible(!visible);
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
            <div className="control__content">
                <h1 className="control__heading">Статус: <Status status={status}/></h1>

                <div className="block">

                    <div className="control__video">
                    <video   src={mediaBlobUrl} controls />
                    </div>

                    <div className="control__panel">
                        <button
                        className="button"
                        onClick={() => {
                        if (!isActive) {
                            startRecording();
                        } else {
                            pauseRecording();
                        }
                        setIsActive(!isActive);
                        }}
                        >
                        {isActive ? "Пауза" : "Начать записть"}
                        </button>

                        <button
                        className="button"
                        onClick={() => {
                            stopRecording();
                            pauseRecording();
                            startVisible();
                        }}
                        >
                            Стоп
                        </button>

                        <button className="button" onClick={stopTimer}>
                        Очистить
                        </button>
                    </div>

                    <div className="control__time">
                    <span className="minute">{minute}</span>
                    <span>:</span>
                    <span className="second">{second}</span>
                    </div>

                </div>
            </div>
        </div>
);
};
export default RecordView;
