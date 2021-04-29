import { UserService } from './service.js'

function appointmentlist() {
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

    console.log("Name" + sessionStorage.getItem('doctorname'))

    const table = document.createElement('table'),
        thead = table.createTHead(),
        tbody = table.createTBody()
    table.setAttribute('class', 'table')
    thead.setAttribute('class', 'thead-dark')
    UserService.getAppointByDoctorId(`${sessionStorage.getItem('userid')}`).then((res) => {
        const row = thead.insertRow()
        const keys = ['APPOINTMENT DATE', 'APPOINTMENT TIME', 'DOCTOR NAME', 'PET NAME', 'TYPE', 'SPECIES']
        keys.forEach((key) => {
            const td = document.createElement('td')
            td.setAttribute('scope', 'col')
            td.appendChild(document.createTextNode(key))
            row.appendChild(td)
        })

        const td = document.createElement('td')
        td.appendChild(document.createTextNode('Treatment'))
        row.appendChild(td)
        res.data.forEach((obj) => {
            const row = tbody.insertRow()
            row.setAttribute('key', obj['id'])
            for (let key in obj) {
                if (key !== 'id' && key !== 'userid' && key !== 'username' && key !== 'doctorid' && key !== 'report' && key !== 'appoint' && key !== 'age' && key !== 'bloodtype') {
                    const td = document.createElement('td'),
                        input = document.createElement('span')
                    td.setAttribute('scope', 'row')
                        /* input.setAttribute('type', 'text')
                         input.setAttribute('name', key)
                         input.setAttribute('value', obj[key])
                         input.setAttribute('readonly', 'true')*/
                    input.innerHTML = `${obj[key]}`
                    td.appendChild(input)
                    row.appendChild(td)
                }
            }
            const treatment_btn = document.createElement('button'),
                td = document.createElement('td')
            if (obj['appoint'] === 'yes') {
                treatment_btn.setAttribute('class', 'btn btn-primary')
                treatment_btn.innerHTML = "Treatment"
            } else {
                treatment_btn.setAttribute('class', 'btn btn-info')
                treatment_btn.innerHTML = "Complete"
            }

            treatment_btn.onclick = (e) => Treament(obj)
            td.appendChild(treatment_btn)
            row.appendChild(td)
        })
    });
    document.querySelector('#treatmentlist').appendChild(table)

    function Treament(e) {

        sessionStorage.setItem('doctortreatment', e['doctorname'])
        UserService.maketreatment(e['id'], { id: e['id'], appointmentdate: e['appointmentdate'], appointmentime: e['appointmentime'], username: e['username'], doctorname: e['doctorname'], petname: e['petname'], age: e['age'], type: e['type'], bloodtype: e['bloodtype'], species: e['species'], appoint: 'make', report: e['report'], doctorid: e['doctorid'], userid: e['userid'] }).then((res) => {
            alert("Treatment Successful")

            location.reload()

        })
    }

}

function __init__() {
    appointmentlist()
}

document.onreadystatechange = () => {
    document.readyState == 'complete' && __init__()
}