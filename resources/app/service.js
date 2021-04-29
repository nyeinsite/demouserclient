const REGISTER_API_ENDPOINT = 'http://localhost:8080/user'
const SCHEDULE_API_ENDPOINT = 'http://localhost:8080/schedule'
const APPOINTMENT_API_ENDPOINT = 'http://localhost:8080/appointment'
const REPORT_API_ENDPOINT = 'http://localhost:8080/report'
const UserService = {
    saveUser: async(user) => await axios.post(`${REGISTER_API_ENDPOINT}/POST`, user),

    getCards: async(useroleid) => await axios.get(`${REGISTER_API_ENDPOINT}/GET/useroleid/${useroleid}`),

    getUserByRole: async(useroleid) => await axios.get(`${REGISTER_API_ENDPOINT}/GET/useroleid/${useroleid}`),

    getUserById: async(id) => await axios.get(`${REGISTER_API_ENDPOINT}/GET/id/${id}`),

    getScheduleByDoctor: async(doctorid) => await axios.get(`${SCHEDULE_API_ENDPOINT}/GET/doctorid/${doctorid}`),

    getAppointByDoctor: async(doctorid) => await axios.get(`${SCHEDULE_API_ENDPOINT}/GET/doctorid/${doctorid}`),

    updateSchedule: async(id, schedule) => await axios.put(`${SCHEDULE_API_ENDPOINT}/PUT/id/${id}`, schedule),

    deleteSchedule: async(id) => await axios.delete(`${SCHEDULE_API_ENDPOINT}/DELETE/id/${id}`),

    getScheduleById: async(id) => await axios.get(`${SCHEDULE_API_ENDPOINT}/GET/id/${id}`),

    saveAppointment: async(appointment) => await axios.post(`${APPOINTMENT_API_ENDPOINT}/POST`, appointment),

    getAppointByDoctorName: async(doctorname) => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/doctorname/${doctorname}`),

    getAppointTreatmented: async(appoint) => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/appoint/${appoint}`),

    getAppointByDoctorId: async(doctorid) => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/doctorid/${doctorid}`),

    getAppointByUserId: async(userid) => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/userid/${userid}`),

    getAppointById: async(id) => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/id/${id}`),


    maketreatment: async(id, appointment) => await axios.put(`${APPOINTMENT_API_ENDPOINT}/PUT/id/${id}`, appointment),

    makeReport: async(report) => await axios.post(`${REPORT_API_ENDPOINT}/POST`, report),

    viewReport: async() => await axios.get(`${APPOINTMENT_API_ENDPOINT}/GET/all`),

    viewCompleteReport: async() => await axios.get(`${REPORT_API_ENDPOINT}/GET/all`)
}

export { UserService }