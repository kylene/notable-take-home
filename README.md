# Book A Doc API
## Getting Started
### Installation
Clone repository and run `npm install` to install all dependencies.

To run the server locally, run `node server.js` on the command line.

## Available API Routes

### GET /doctors
Lists all doctors.

### GET /doctors/{id}
Gets a doctor by ID.

### GET /doctors/{id}/appointments
Lists all appointments for a specific doctor ID. Accepts a date query param for filtering.

**Sample URL with Date Query**
`http://localhost:3000/doctors/1/appointments?date=2018-05-09`

### POST /appointments
Creates an appointment from a JSON request body. Returns the created appointment ID.

**Sample Request Body**
```JSON
{
    "patientFirstName": "George",
    "patientLastName": "Pup",
    "startTime": 1671031800000,
    "kind": "Follow-up",
    "doctorId": 3
}
```

### DELETE /appointments/{id}
Deletes a specific appointment. Returns the deleted appointment ID.
