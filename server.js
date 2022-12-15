let express = require('express');
let app = express();
const port = 3000
const {data, APPOINTMENT_STATUS_ACTIVE, APPOINTMENT_STATUS_INACTIVE} = require("./utils/utils");

app.use(express.json());

app.get('/doctors', (req, res) => {
    res.send( data["doctors"] );
});

app.get('/doctors/:id', (req, res) => {
    res.send( data["doctors"].find(doctor => {
        return doctor["id"] === Number(req.params.id);
    }) );
});

app.get('/doctors/:id/appointments', (req, res) => {
    let matchingAppointments = data["appointments"].filter(appointment => {
        return appointment["doctorId"] === Number(req.params.id) && appointment.status === APPOINTMENT_STATUS_ACTIVE;
    });

    if(req.query.date) {
        const startDate = new Date(req.query.date);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        matchingAppointments = matchingAppointments.filter(appointment => {
            return new Date(appointment.startTime) > startDate && new Date(appointment.startTime) < endDate
        })
    }

    res.send( matchingAppointments );
});

app.post('/appointments', (req, res) => {
    let appointments = data["appointments"];
    let newAppointment = req.body;

    // TODO: data validation

    let newAppointmentId = Math.max(...appointments.map(o => o.id)) + 1
    newAppointment.id = newAppointmentId;
    newAppointment.status = APPOINTMENT_STATUS_ACTIVE;
    data["appointments"].push(newAppointment);

    res.send({ id: newAppointmentId} );
});

app.delete('/appointments/:id', (req, res) => {
    let appointments = data["appointments"];

    data["appointments"] = appointments.map(appointment => {
        return appointment.id === Number(req.params.id) ? {...appointment, status: APPOINTMENT_STATUS_INACTIVE} : appointment
    })

    res.send({ id: req.params.id} );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
