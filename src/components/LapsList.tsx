import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { buttonStyle, buttonsStyles } from "./styles";
import { TimerStatus } from "./timerStatus";

type LapsProps = {
    time: number;
    status: TimerStatus
}

type Lap = {
    result: number,
    time: number,
}

const listStyle :CSSProperties = {
    padding: '0 20px',
    border: '1px solid #fff',
    color: '#fff',
    borderColor: '#fff',
    fontSize: '20px',
    borderRadius: '8px',
    maxHeight: '25vh',
    overflowY: 'auto',
}

const liStyle:CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
}

export const Laps: FC<LapsProps> = ({time, status}) => {
    const [laps, setLaps] = useState<Lap[]>([]);

    useEffect(() => {
        if (!time) {
            setLaps([]);
        }
    }, [time]);

    const addLap = useCallback(() => {
        if(!time || status === TimerStatus.PAUSE) {
            return;
        }

        setLaps((prev) => [
            ...prev,
            {
                time: Date.now() - time,
                result: prev.length
                    ? (Date.now() - time) - prev[prev.length - 1].time
                    : 0
            }
        ]);
    }, [status, time])

    const clearLaps = () => {
        setLaps([]);
    };

    return (
        <>
            <div
                style={{
                    ...buttonsStyles,
                    marginTop: '40px'
                }}
            >
                <button
                    onClick={addLap}
                    style={{
                        ...buttonStyle,
                        background: '#ff9800'
                    }}
                >
                    Круг
                </button>
                {laps.length
                    ? <button onClick={clearLaps} style={{...buttonStyle, background: '#ef5350'}}>Очистить</button>
                    : ''
                }
            </div>
            {!!laps.length &&
               <div style={listStyle}>
                     <ol>
                        {laps && laps.map((lap) => (
                            <li key={`${lap.time}`}>
                                <div style={liStyle}>
                                    <span>+ {new Date(lap.result).toISOString().slice(11, 22)}</span>
                                    <span>{new Date(lap.time).toISOString().slice(11, 22)}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
               </div>
            }
        </>
    )
}
