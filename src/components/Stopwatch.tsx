import { CSSProperties, FC, useState } from "react"
import { TimeDisplay } from "./TimeDisplay";
import { TimerStatus } from "./timerStatus";
import { Laps } from "./LapsList";
import { buttonsStyles, buttonStyle } from "./styles";

const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '20px',
    width: '100%',
}

export const Stopwatch:FC = () => {
    const [time, setTime] = useState(0);
    const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.PAUSE);
    const [stopTime, setStopTime] = useState(0);

    const startTime = () => {
        if (timerStatus === TimerStatus.START) {
            return;
        }

        const currentDate = TimerStatus.PAUSE && time ? time + (Date.now() - stopTime) : Date.now();
        setTime(currentDate);
        setTimerStatus(TimerStatus.START);
    };

    const pauseTime = () => {
        setStopTime(Date.now());
        setTimerStatus(TimerStatus.PAUSE)
    }

    const resetTime = () => {
        setTime(0);
        setTimerStatus(TimerStatus.RESET);
    };

    return (
        <div style={containerStyles}>
            <TimeDisplay status={timerStatus}/>
            <div style={buttonsStyles}>
                <button
                    style={{
                        ...buttonStyle,
                        background: '#4caf50'
                    }}
                    onClick={startTime}
                >
                    Старт
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        background: '#ef5350'
                    }}
                    onClick={pauseTime}
                >
                    Пауза
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        background: '#03a9f4'
                    }}
                    onClick={resetTime}
                >
                    Сбросить
                </button>
            </div>
            <Laps time={time} status={timerStatus}/>
        </div>
    )
}