import { useEffect, useState } from "react";

const BusinessHours = ({hours}) => {
    const DAYS = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"]
    const [businessHoursState, setBusinessHoursState] = useState({})
    
    const convertTime = (timeStr) => {
        if (timeStr) {
            let hour = (parseInt(timeStr.substring(0, 2))) % 12
            if (hour === 0) hour = 12
            let min = timeStr.substring(2)
            let ampm;
            parseInt(timeStr.substring(0, 2)) < 12 ? ampm = "am" : ampm = "pm"
            return hour.toString() + ":" + min + ampm
        }
    }
    
    let businessHours = {}
    const parseHours = () => {
        DAYS.forEach((day, i) => {
            let open = convertTime(hours?.open[i]?.start) 
            let end = convertTime(hours?.open[i]?.end) 
            if (open && end) {
                return businessHours[day] = `${open} - ${end}`
            } else {
                return businessHours[day] = "closed"
            }
        })
    }

    useEffect(() => {
        if (hours && Object?.keys(hours).length > 0) parseHours();
        setBusinessHoursState(businessHours)
    }, [hours])

    return (
        <>
        {DAYS.map((day, i) => (
            <li key={i}>
                <p className="bold-and-uppercased">{day}</p>: {businessHoursState[day] ? businessHoursState[day] : "-"}
            </li>
        ))}
        </>
    );
};

export default BusinessHours;