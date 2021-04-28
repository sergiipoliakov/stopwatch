import React, { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function StopWatch() {
	const [time, setTime] = useState(0);
	const [btnDisabled, setBtnDisable] = useState(false);
	const [watchOn, setWatchOn] = useState(false);

	useEffect(() => {
		const unsubscribe$ = new Subject();
		interval(1000)
			.pipe(takeUntil(unsubscribe$))
			.subscribe(() => {
				if (watchOn) {
					setTime((val) => val + 10);
				}
			});
		return () => {
			unsubscribe$.next();
			unsubscribe$.complete();
		};
	}, [watchOn]);

	const handleStart = () => {
		setWatchOn((prevState) => !prevState);
		setBtnDisable((prevState) => !prevState);
		if (btnDisabled) {
			setTime(0);
		}
	};

	const handleStop = () => {
		setTime(0);
		setWatchOn(false);
		setBtnDisable(false);
	};

	const handleWait = () => {
		if (time !== 0) {
			setWatchOn(false);
		}
		setBtnDisable(false);
	};
	const handleReset = () => {
		setTime(0);
		setWatchOn(true);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>StopWatch</h1>
				<div className="stopwatch-container">
					<span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
					<span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
					<span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
				</div>
				<div className="btn-container">
					<div>
						<button
							onClick={handleStart}
							className="btn"
							disabled={btnDisabled}
						>
							Start
						</button>
						<button
							onClick={handleStop}
							className="btn"
							disabled={!btnDisabled}
						>
							Stop
						</button>
					</div>
					<div>
						<button onClick={handleWait} className="btn">
							Wait
						</button>
						<button onClick={handleReset} className="btn">
							Reset
						</button>
					</div>
				</div>
			</header>
		</div>
	);
}

export default StopWatch;
