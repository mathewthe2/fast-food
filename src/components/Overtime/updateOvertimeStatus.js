import client from '../../Client';

export const updateOvertimeStatus = (id, status, callback) => {

    var params = new URLSearchParams();
    params.append('id', id);
    params.append('status', status);

    client.post(`/update_overtime_status?${params.toString()}`)
    .then(()=> {
    callback();
    });

}
