import { UserService } from './service.js'

function show() {
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

    const input = document.createElement('div');
    input.setAttribute("class", "row")
    let count = 1;
    UserService.getCards('1').then((res) => {
        res.data.forEach((obj) => {

            input.innerHTML += `<div class="card" style="width: 18rem;margin-left:40px;margin-top:30px;margin-bottom:20px;box-shadow: 0 5px 15px rgba(0, 0, 0, .5) ;">
            <img src="./resources/img/doctor${count}.jpg" class="card-img-top" alt="..."> 
             <div class="card-body"><h5 class="card-title">${obj['username']}</h5>
             <p class="card-text"> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
             <input type='hidden' id="appoint" value='${obj['username']}'>
             <a href="#" class="btn btn-primary" onclick="appoint(${obj['id']})" >Appoint Me</a> </div></div>`
            console.log('doctorid' + obj['id'])
            count++;
        })

    })
    document.querySelector('#card').appendChild(input)


}

function __init__() {

    show()
}
document.onreadystatechange = () => {
    document.readyState === 'complete' && __init__()
}