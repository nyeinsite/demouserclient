import { UserService } from './service.js'

function ReportForm() {
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
</li> <li class="nav-item active"><a class="nav-link" href="treatments.html">Doctor Lists <span class="sr-only">(current)</span></a>
</li>
`

        } else {
            document.querySelector('#user').innerHTML = ` <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li> <li class="nav-item active">
        <a class="nav-link" href="viewreport.html">Report List <span class="sr-only">(current)</span></a>
    </li><li class="nav-item active">
    <a class="nav-link" href="completereportview.html">Complete Report <span class="sr-only">(current)</span></a>
</li><li class="nav-item active"> <a class="nav-link" href="treatments.html">Doctor Lists <span class="sr-only">(current)</span></a>
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

    const reportid = sessionStorage.getItem('reportid')
    const customername = document.getElementById('username')
    const doctorname = document.getElementById('doctorname')
    document.getElementById('reportdate').value = Date();
    console.log("Name:" + reportid)

    UserService.getAppointById(reportid).then((res) => {

        doctorname.value = res.data.doctorname
        customername.value = res.data.username
    })
    const reportbtn = document.getElementById('reportbtn')
    reportbtn.addEventListener("click", () => {
        const cname = document.getElementById("username").value
        const dname = document.getElementById("doctorname").value
        const description = document.getElementById("description").value
        const reportdate = document.getElementById('reportdate').value
        const report = 'yes'
        if (cname.length != 0 && dname.length != 0 && description.length != 0 && reportdate.length != 0) {
            UserService.getAppointById(reportid).then((res) => {
                UserService.maketreatment(res.data.id, { id: res.data.id, appointmentdate: res.data.appointmentdate, appointmentime: res.data.appointmentime, username: res.data.username, doctorname: res.data.doctorname, petname: res.data.petname, age: res.data.age, type: res.data.type, bloodtype: res.data.bloodtype, species: res.data.species, appoint: 'make', report: 'yes', doctorid: res.data.doctorid, userid: res.data.userid })
            })
            UserService.makeReport({ customername: `${cname}`, description: `${dname}<br>${description}`, report: report, reportdate: `${reportdate}`, treatmentid: reportid })
                .then((res) => {
                    alert("Successfuly Done Report!")
                    location.replace('reportlist.html')
                })
                .catch((err) => {
                    alert(err)
                })
        } else {
            alert("Required All Fileds")
        }


    })

}





function __init__() {
    ReportForm()
}
document.onreadystatechange = () => {
    document.readyState == "complete" && __init__()
}