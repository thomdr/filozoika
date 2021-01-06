import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import RouteComponent from './minor/RouteComponent';
import Stay from './unique/Stay';
import config from '../config.json';

export default function Vandaag({ alert }) {
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
    const [stays, setStays] = useState(null);
    // JSON.parse is used because booleans are actually stored as string
    // This information is stored in localStorage for the convenience of the user
    const [showStays, setShowStays] = useState([
        localStorage.getItem('ends') == null ? true : JSON.parse(localStorage.getItem('ends')),
        JSON.parse(localStorage.getItem('starts')),
        localStorage.getItem('now') == null ? true : JSON.parse(localStorage.getItem('now')),
        JSON.parse(localStorage.getItem('future'))
    ]);

    // Increase or decrease current day by 1
    const changeDay = increment => {
        const _day = new Date(day);
        _day.setDate(_day.getDate() + (increment ? 1 : -1));
        setDay(_day.toISOString().slice(0, 10));
    };

    // Load stays
    useEffect(() => {
        // Remove all stays to guarantee an update
        setStays(null);
        // This unmounted stuff is needed to prevent an error
        let isMounted = true;
        const getStays = async () => await axios.post(config.url + 'api/reserveringen/today', { day });
        getStays().then(({ data }) => {
            if (isMounted && _.isArray(data)) {
                // Update stay display, type, and increase count
                const updateStay = (stay, num, type) => {
                    stay.display = showStays[num];
                    stay.type = type;
                    _counts[num]++;
                };
                const _counts = [0, 0, 0, 0];
                // Do a bunch of stuff for each stay depending on start date, end date and current day
                data.map(stay => {
                    if (new Date(day) - new Date(stay.end_date) == 0) {
                        updateStay(stay, 0, 'ends'); // Stays that almost end (end today)
                    } else if (new Date(day).getTime() == new Date(stay.start_date).getTime()) {
                        updateStay(stay, 1, 'starts'); // Stays that start today
                    } else if (new Date(day) - new Date(stay.start_date) < 0) {
                        updateStay(stay, 3, 'future'); // Stays that will start in 7 days or less
                    } else {
                        updateStay(stay, 2, 'now'); // Stays that are currently active
                    }
                });
                setCounts(_counts);
                setStays(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [day]);

    // Toggle stay.display based on type
    const toggleStay = (num, type) => {
        const _showStays = showStays;
        _showStays[num] = !_showStays[num];
        localStorage.setItem(type, _showStays[num]);
        setShowStays(_showStays);
        setStays([...stays].map(stay => ({ ...stay, display: stay.type == type ? !stay.display : stay.display })));
    };

    return (
        <RouteComponent name="Vandaag">
            <h1>Vandaag</h1>
            <div className="container">
                <div className="day-picker">
                    <div>
                        <button className="btn btn-primary" onClick={() => changeDay(false)}>
                            -1 dag
                        </button>
                        <input className="form-control" type="text" type="date" value={day} onChange={ev => setDay(ev.target.value)} />
                        <button className="btn btn-primary" onClick={() => changeDay(true)}>
                            +1 dag
                        </button>
                    </div>
                    <div>
                        <span className={showStays[0] ? 'active' : 'inactive'} onClick={() => toggleStay(0, 'ends')}>
                            {counts[0]} {counts[0] == 1 ? 'eindigt' : 'eindigen'} vandaag
                        </span>
                        <span className={showStays[1] ? 'active' : 'inactive'} onClick={() => toggleStay(1, 'starts')}>
                            {counts[1]} {counts[1] == 1 ? 'start' : 'starten'} vandaag
                        </span>
                        <span className={showStays[2] ? 'active' : 'inactive'} onClick={() => toggleStay(2, 'now')}>
                            {counts[2]} gaande
                        </span>
                        <span className={showStays[3] ? 'active' : 'inactive'} onClick={() => toggleStay(3, 'future')}>
                            {counts[3]} toekomstige
                        </span>
                    </div>
                </div>
            </div>
            <div className="today-stays">
                {_.isArray(stays) && stays.map(stay => stay.display && <Stay {...{ day, stay, alert }} key={stay.id + '161215'} />)}
            </div>
        </RouteComponent>
    );
}
