import { CSSProperties, FC, useEffect, useState } from 'react';
import { TimerStatus } from './timerStatus';

type TimeDisplayProps = {
    status: TimerStatus;
}

const styles: CSSProperties = {
    color: '#fff',
    fontSize: '70px',
    border: '1px solid green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '400px',
    height: '400px',
    margin: '0 auto',
}

export const TimeDisplay:FC<TimeDisplayProps> = ({status}) => {
    const [stopwatchTime, setStopwatchTime] = useState(0);

    useEffect(() => {
        let stopwatch = 0;
        if (status === TimerStatus.START) {
            stopwatch = window.setInterval(() => {
                setStopwatchTime((prev) => prev + 1);
            }, 30)
        }

        if (status === TimerStatus.RESET) {
            setStopwatchTime(0);
            clearInterval(stopwatch);
        }

        return () => clearInterval(stopwatch);

    }, [status]);

    return (
        <div style={styles}>
           {new Date(stopwatchTime * 30).toISOString().slice(11, 22)}
        </div>
    )
}