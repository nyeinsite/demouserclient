import { UserService } from './service.js'

function AppointDoctor() {
    if (sessionStorage.getItem('loginsuccess') === '1') {
        const logout = document.createElement('div')
        logout.innerHTML = `  <div class="nav-item">
        <a class="nav-link" href="login.html" id="logout" onclick="logout()">Logout</a>
    </div>`
        document.querySelector('#login').appendChild(logout)
        if (sessionStorage.getItem('useroleid') == 1) {

            document.querySelector('#user').innerHTML = ` <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li> <li class="nav-item active">
        <a class="nav-link" href="schedule.html">Schedule <span class="sr-only">(current)</span></a>
    </li><li class="nav-item active">
    <a class="nav-link" href="treatment.html">Treatment <span class="sr-only">(current)</span></a>
</li></li><li class="nav-item active">
<a class="nav-link" href="schedulelist.html">Schedule List <span class="sr-only">(current)</span></a>
</li>
`
        } else if (sessionStorage.getItem('useroleid') == 2) {
            document.querySelector('#user').innerHTML = ` <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li> <li class="nav-item active">
        <a class="nav-link" href="treatments.html">Doctor Lists <span class="sr-only">(current)</span></a>
    </li><li class="nav-item active">
    <a class="nav-link" href="myappointment.html">My Appointments <span class="sr-only">(current)</span></a>
</li></li>
`
        } else if (sessionStorage.getItem('useroleid') == 3) {
            document.querySelector('#user').innerHTML = ` <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li> <li class="nav-item active">
        <a class="nav-link" href="reportlist.html">Report List <span class="sr-only">(current)</span></a>
    </li><li class="nav-item active">
    <a class="nav-link" href="myappointment.html">My Appointments <span class="sr-only">(current)</span></a>
</li><li class="nav-item active"> <a class="nav-link" href="treatments.html">Doctor Lists <span class="sr-only">(current)</span></a>
</li>
`

        } else {
            document.querySelector('#user').innerHTML = ` <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li> <li class="nav-item active">
        <a class="nav-link" href="viewreport.html">Report List <span class="sr-only">(current)</span></a>
    </li><li class="nav-item active">
    <a class="nav-link" href="completereportview.html">Complete Report <span class="sr-only">(current)</span></a>
</li> <li class="nav-item active"><a class="nav-link" href="treatments.html">Doctor Lists <span class="sr-only">(current)</span></a>
</li>`
        }
    } else {

        document.querySelector('#login').innerHTML = ` <div class="nav-item">
        <a class="nav-link" href="login.html">Login</a></div><div class="nav-item">
        <a class="nav-link" href="register.html">Register</a>
    </div>`
        document.querySelector('#user').innerHTML = `<li class="nav-item active">
        <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
    </li>`
    }

    // const appointmentdate, appointmenttime, doctor
    const doctorname = document.getElementById('doctorname')
    const starttime = document.getElementById('appointmenttime')
    const dayname = document.getElementById('appointmentdate')
    doctorname.setAttribute("readonly", "true")
    starttime.setAttribute("readonly", "true")
    dayname.setAttribute("readonly", "true")
    UserService.getScheduleById(sessionStorage.getItem('scheduleid')).then((res) => {

        console.log("Start Time" + res.data.starttime + "Day Name" + res.data.dayname)

        starttime.value = res.data.starttime
        dayname.value = res.data.dayname
        sessionStorage.setItem("apdate", res.data.dayname)
        sessionStorage.setItem("aptime", res.data.starttime)
        sessionStorage.setItem("did", res.data.doctorid)

    })

    UserService.getUserById(sessionStorage.getItem('did')).then((res) => {
        doctorname.value = res.data.username
        sessionStorage.setItem('dname', res.data.username)
        console.log(res.data.username)
    })

    const appointbtn = document.getElementById("appointbtn")
    appointbtn.addEventListener("click", () => {
        const username = document.getElementById("username").value
        const petname = document.getElementById("petname").value
        const age = document.getElementById("age").value
        const type = document.getElementById("type").value
        const bloodtype = document.getElementById("bloodtype").value
        const species = document.getElementById("species").value
        sessionStorage.setItem('appointcustomer', username)
        const dname = sessionStorage.getItem('dname');
        if (dname.length != 0 && username.length != 0 && petname.length != 0 && age.length != 0 && type.length != 0 && bloodtype.length != 0 && species.length != 0) {
            console.log("Time" + sessionStorage.getItem("aptime"))
            UserService.saveAppointment({ appointmentdate: `${sessionStorage.getItem('apdate')}`, appointmentime: `${sessionStorage.getItem('aptime')}`, username: `${username}`, doctorname: dname, petname: `${petname}`, age: `${age}`, type: `${type}`, bloodtype: `${bloodtype}`, species: `${species}`, appoint: 'yes', report: 'no', doctorid: sessionStorage.getItem('appointdoctor'), userid: sessionStorage.getItem('userid') })
                .then(alert("Appointment is Successfuly Save!"))
                .catch((err) => {
                    alert(err)
                })
        } else {
            alert("Required All Fields !")
        }
    })

}

function __init__() {
    AppointDoctor()
}

document.onreadystatechange = () => {
    document.readyState == 'complete' && __init__()
}