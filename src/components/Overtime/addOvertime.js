import client from '../../Client';
import moment from 'moment';

// const ot = {
//     employee: 2,
//     date: new Date(),
//     startTime: '',
//     duration: '1 hour',
//     type: 'cleaning',
//     status: 'pending'
//   }

export const addOvertime = (ot, callback) => {

    const {employee, date, startTime, duration, type, remarks} = ot;

    const day = moment(date).format('DD/MM/YYYY');
    const dateAndTime = moment(day + ' ' + startTime, 'DD/MM/YYYY HH:mm');

    var params = new URLSearchParams();
    params.append('employee', employee);
    params.append('date', dateAndTime.format('YYYY-MM-DD HH:mm:ssZZ'));
    params.append('duration', duration);
    params.append('type', type + remarks);

  console.log(params.toString());
// console.log(moment(date).format('YYYY-MM-DD HH:mm:ssZZ'))

    client.post(`/addovertime?${params.toString()}`)
    .then(()=> {
    callback();
    });

}
