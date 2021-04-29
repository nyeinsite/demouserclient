import { UserService } from './service.js'




function start() {
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


    var register = document.getElementById("register")
    register.addEventListener("click", () => {
        console.log("click")
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const company = document.getElementById("company").value
        const address = document.getElementById("address").value
        if (username.length != 0 && password.length != 0 && email.length != 0 && phone.length != 0 && company.length != 0 && address.length != 0) {
            console.log(`name:${username} password:${password} email:${email} phone:${phone} company:${company}`)
            const useroleid = '2'
            const softdelete = 'no'
            UserService.saveUser({ username: `${username}`, password: `${password}`, email: `${email}`, address: `${address}`, phone: `${phone}`, company: `${company}`, useroleid: useroleid, softdelete: softdelete })
                .then((res) => {
                    alert("Customer Is Sucessfully Save")
                    if (res.status === 200) {

                        alert("Customer Is Sucessfully Save")
                    }
                }).catch((err) => alert(err))
        } else {
            alert("Required All Fields!")
        }
    })

}

function __init__() {
    start()
}
document.onreadystatechange = () => {
    document.readyState === 'complete' && __init__()
}