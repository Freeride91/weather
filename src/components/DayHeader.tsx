import React from 'react'
import 'moment/locale/hu';
import Moment from 'react-moment';

interface IProps {
    itemDate: Date;
}

const DayHeader: React.FC<IProps> = ({ itemDate }) => {
    return (
        <>
            <div className="date-header text-center">
                <b><Moment key={itemDate.toString()} locale="hu" date={itemDate} utc format="MMMM Do" /></b>
                &nbsp;&nbsp; <Moment key={itemDate.toString()} locale="hu" date={itemDate} utc format="dddd" />
            </div>
        </>
    );
}

export default DayHeader;