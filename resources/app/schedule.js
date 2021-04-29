async function schedule() {

    const ROOT_API = 'http://localhost:8080',
        SCHEDULE_API = `${ROOT_API}/schedule`
    const dayname = `${document.getElementById("dayname").value}`
    const starttime = `${document.getElementById("starttime").value}`
    const endtime = `${document.getElementById("endtime").value}`
    const doctorid = sessionStorage.getItem("userid")
    if (dayname.length != 0 && starttime.length != 0 && endtime.length != 0) {

        console.log("Day Name:" + dayname + " Start Time: " + starttime + "End Time: " + endtime)
        await axios
            .post(`${SCHEDULE_API}/POST/`, { dayname: dayname, starttime: starttime, endtime: endtime, doctorid: doctorid })
            .then(alert("Save Your Schedule!"))
            .catch((err) => {
                alert(err)
            })
    } else {
        alert("Required All Fields!")
    }
}