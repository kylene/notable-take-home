module.exports = {
    APPOINTMENT_STATUS_ACTIVE: "active",
    APPOINTMENT_STATUS_INACTIVE: "inactive",
    data: {
        "doctors":[
            {
                "id":1,
                "firstName":"Algernop",
                "lastName":"Krieger"
            },
            {
                "id":2,
                "firstName":"Julius",
                "lastName":"Hibbert"
            },
            {
                "id":3,
                "firstName":"Nick",
                "lastName":"Riviera"
            }
        ],
        "appointments":[
            {
                "id":1,
                "status": "active",
                "patientFirstName":"Sterling",
                "patientLastName":"Archer",
                "startTime":1525870800000,
                "kind":"New Patient",
                "doctorId":1
            },
            {
                "id":2,
                "status": "active",
                "patientFirstName":"Cyril",
                "patientLastName":"Figis",
                "startTime":1525872600000,
                "kind":"Follow-up",
                "doctorId":1
            },
            {
                "id":3,
                "status": "active",
                "patientFirstName":"Ray",
                "patientLastName":"Gillette",
                "startTime":1525874400000,
                "kind":"Follow-up",
                "doctorId":1
            },
            {
                "id":4,
                "status": "active",
                "patientFirstName":"Lana",
                "patientLastName":"Kane",
                "startTime":1525876200000,
                "kind":"New Patient",
                "doctorId":1
            },
            {
                "id":5,
                "status": "active",
                "patientFirstName":"Pam",
                "patientLastName":"Poovey",
                "startTime":1525878000000,
                "kind":"New Patient",
                "doctorId":1
            },
        ]
    }
}
