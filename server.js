let express = require('express');
let app = express();
const port = 3000
const { data, APPOINTMENT_STATUS_ACTIVE, APPOINTMENT_STATUS_INACTIVE } = require("./utils/utils");

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

app.get('/appointments', (req, res) => {
    res.send( data["appointments"] );
});

app.post('/appointments', (req, res) => {
    const appointments = data["appointments"];
    const newAppointment = req.body;

    // check that appointment is at a 15-minute interval
    const date = new Date(newAppointment["startTime"]);
    if(date.getMinutes() % 15 !== 0) {
        res.status(400);
        res.send({
            "message": "Appointment validation failed.",
            "error": "Appointments must be on 15 minute intervals."
        });
    }

    // check that doctor has less than 2 existing appointments scheduled at the requested time
    // (doctor can have max 3 appointments for a given appointment time)
    const existingAppointments = appointments.filter(appointment => {
        return appointment.startTime === newAppointment.startTime && appointment.doctorId === newAppointment.doctorId;
    })

    if(existingAppointments.length > 2) {
        res.status(400);
        res.send({
            "message": "Appointment validation failed.",
            "error": "Doctor already has maximum number of appointments for requested appointment time."
        });
    }

    let newAppointmentId = Math.max(...appointments.map(o => o.id)) + 1
    newAppointment.id = newAppointmentId;
    newAppointment.status = APPOINTMENT_STATUS_ACTIVE;
    data["appointments"].push(newAppointment);

    res.send({ appointmentId: newAppointmentId} );
});

app.delete('/appointments/:id', (req, res) => {
    let appointments = data["appointments"];

    data["appointments"] = appointments.map(appointment => {
        return appointment.id === Number(req.params.id) ? {...appointment, status: APPOINTMENT_STATUS_INACTIVE} : appointment
    })

    res.send({ deletedAppointmentId: req.params.id} );
});

app.listen(port, () => {
    console.log(`Book A Doc API listening on port ${port}`)
})
