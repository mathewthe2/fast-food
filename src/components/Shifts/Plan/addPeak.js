import client from '../../../Client';
import moment from 'moment';

// const peak = {
//   peakType: 3,
//   startDate: new Date(),
//   endDate: new Date(),
// }

export const addPeak = (peak) => {
  console.log(peak);
  const start = moment(peak.startDate);
  const end = moment(peak.endDate);
  const hourDifference = moment.duration(end.diff(start)).asHours();

  var params = new URLSearchParams();
  params.append('times', hourDifference);
  params.append('startTime', start.format('YYYY-MM-DD HH:mm:ss'));
  params.append('peakType', peak.peakType);

  // console.log(params.toString().replace('+', ' '))

  client.post(`/addpeak?${params.toString().replace('+', ' ')}`)
  .then(()=> {
    window.location.reload();
  });
  // client.post('/addpeak', params);
}
