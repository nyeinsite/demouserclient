import { UserService } from './service.js'

function Showlist() {
    console.log(sessionStorage.getItem("appointdoctor"))
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

    document.querySelector('#crud-table') && document.querySelector('#crud-table').remove()

    const table = document.createElement('table'),
        thead = table.createTHead(),
        tbody = table.createTBody(),
        tfoot = table.createTFoot()

    table.setAttribute('id', 'crud-table')
    table.setAttribute('border', 1)
    table.setAttribute('bordercolor', '#e8e8e8')

    UserService.getScheduleByDoctor(sessionStorage.getItem('userid')).then((res) => {
        const row = thead.insertRow()
        row.setAttribute('class', 'crud-table-row')

        const keys = ['ID', 'DAY NAME', 'START TIME', 'ENDTIME']

        keys.forEach((key) => {
            const td = document.createElement('td')
            td.appendChild(document.createTextNode(key))
            row.appendChild(td)
        })

        const td = document.createElement('td')
        td.appendChild(document.createTextNode('action'))
        row.appendChild(td)

        res.data.forEach((obj) => {
            const row = tbody.insertRow()
            row.setAttribute('class', 'crud-table-row')
            row.setAttribute('key', obj['id'])

            for (let key in obj) {
                if (key != 'doctorid') {
                    const td = document.createElement('td'),
                        input = document.createElement('input')

                    input.setAttribute('class', 'crud-table-input')
                    input.setAttribute('type', 'text')
                    input.setAttribute('name', key)
                    input.setAttribute('value', obj[key])
                    input.setAttribute('readonly', 'true')

                    td.appendChild(input)
                    row.appendChild(td)
                }
            }

            const edit_btn = document.createElement('button'),
                delete_btn = document.createElement('button'),
                td = document.createElement('td')

            edit_btn.setAttribute('class', 'action-btn edit')
            edit_btn.innerHTML = '&#x270e;'
            delete_btn.setAttribute('class', 'action-btn delete')
            delete_btn.innerHTML = '&#x2716;'

            edit_btn.onclick = (e) => updateRow(e)
            delete_btn.onclick = (e) => deleteRow(e)

            td.appendChild(edit_btn)
            td.appendChild(delete_btn)
            row.appendChild(td)
        })
    })

    const row = tfoot.insertRow(),
        td = document.createElement('td'),
        button = document.createElement('button')



    row.appendChild(td)
    document.querySelector('#schedulelist').appendChild(table)

    //Update Schedule

    function updateRow(e) {
        document.querySelector('.action-btn.update') && document.querySelector('.action-btn.update').remove()
        document.querySelectorAll('.action-btn.edit').forEach((el) => el.classList.remove('hide'))


        const rows = Array.from(document.querySelectorAll('.crud-table-row'))
        console.log(rows);
        rows.shift()

        rows.forEach((row) => {
            console.log(row);
            const columns = Array.from(row.children)
            console.log(columns);
            columns.forEach((column) => {
                console.log(column);
                column.children[0].setAttribute('readonly', 'true')
                column.children[0].classList.remove('active')
            })
        })

        const target_btn = e.target,
            target_row = target_btn.parentElement.parentElement
        console.log(target_btn);
        console.log(target_row)
        target_btn.classList.add('hide')

        const columns = Array.from(target_row.children)
        console.log(columns)
        columns.pop()
        console.log(columns)
        for (let i = 1; i < columns.length; i++) {
            columns[i].children[0].removeAttribute('readonly')
            columns[i].children[0].classList.add('active')
        }

        const update_btn = document.createElement('button')
        update_btn.setAttribute('class', 'action-btn update active')
        update_btn.innerHTML = '&#x2714;'
        e.target.parentElement.prepend(update_btn)
        update_btn.onclick = () => {
            const fields = []
            columns.forEach((column) => {
                column.children[0].setAttribute('readonly', 'true')
                column.children[0].classList.remove('active')
                target_btn.classList.remove('hide')

                fields.push(column.children[0])
                update_btn.remove()
            })

            const [id, dayname, starttime, endtime, doctorid] = fields

            UserService.updateSchedule(id.value, { id: id.value, dayname: dayname.value, starttime: starttime.value, endtime: endtime.value, doctorid: doctorid.value }).catch((err) => {
                window.location.reload()
                alert(err)
            })
        }


    }

    //Delete SChedule

    function deleteRow(e) {
        const target_row = e.target.parentElement.parentElement,
            key = target_row.getAttribute('key')

        if (window.confirm('Are you sure you want to delete?')) {
            UserService.deleteSchedule(key)
                .then((res) => {
                    res.status === 200 && target_row.remove()
                })
                .catch((err) => console.log(err))
        }
    }


}

function __init__() {
    Showlist()
}
document.onreadystatechange = () => {
    document.readyState == 'complete' && __init__()
}