import React from 'react';

const ProgressStatistic=(props)=>{

    const {max, min, actual, percentage, showLabels} = props;
    let Rmax, Rmin, Ractual, remain,progressClassName;
    remain = max - actual;
    if (percentage) {
        Rmax = '100 %';
        Ractual = String((actual / max).toFixed(2) * 100) + ' %';
        Rmin = 0 + '%';
    }
    else {
        Rmax = max;
        Rmin = min;
        Ractual = actual;
    }
    console.log(remain);

    const style = {
        width: String((actual / max).toFixed(2) * 100) + '%'
    };
    progressClassName='progress-bar progress-bar-info';
    progressClassName = ((actual / max) > 0.5) ?  'progress-bar progress-bar-warning' : progressClassName;
    progressClassName = ((actual / max) > 0.75) ?  'progress-bar progress-bar-danger' : progressClassName;
    let LabelClassName = showLabels ? '' : 'sr-only';

    return (
        <div className="progress">
            <div className={progressClassName} role="progressbar" aria-valuenow={actual} aria-valuemin="0" aria-valuemax={100} style={style}>
                <span className={LabelClassName}>{Ractual}</span>
            </div>
        </div>
    );

};


export default ProgressStatistic;
