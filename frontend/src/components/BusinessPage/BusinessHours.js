import { useEffect, useState } from "react";

const BusinessHours = ({hours}) => {
    const DAYS = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"]
    const [businessHoursState, setBusinessHoursState] = useState({})
    
    const convertTime = (timeStr) => {
        let hour = (parseInt(timeStr.substring(0, 2))) % 12
        let min = timeStr.substring(2)
        let ampm;
        parseInt(timeStr.substring(0, 2)) < 12 ? ampm = "am" : ampm = "pm"
        return hour.toString() + ":" + min + ampm
    }
    
    let businessHours = {}
    const parseHours = () => {
        DAYS.forEach((day, i) => {
            let open =  convertTime(hours.open[i].start);
            let end = convertTime(hours.open[i].end)
            // setBusinessHours(businessHours[day] = `${open} - ${end}`)
            console.log(businessHours)
            businessHours[day] = `${open} - ${end}`
        })
    }

    useEffect(() => {
        parseHours();
        setBusinessHoursState(businessHours)
        console.log(businessHours)
    }, [])

    return (
        <>
        {DAYS.map((day, i) => (
            <li key={i}>
                <p className="bold-and-uppercased">{day}</p>: {businessHoursState[day]}
            </li>
        ))}
        </>
    );
};

export default BusinessHours;