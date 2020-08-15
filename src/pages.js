const Database = require('./database/db')
const { subjects, weekdays, convertHoursToMinutes } = require('./utils/format')
const { getClasses } = require('./classes/getClasses')
const { getAllClasses } = require('./classes/getAllClasses')

function pageLanding(req, res) {
    return res.render("index.html") // render == setFile
}

async function pageStudy(req, res) { // Req.query gera um objeto com name e value dos inputs enviados(ex: subject=2 & weekday=1 & time=04%3A04){subject:2. weekday:1, time:a4}
    const filters = req.query
    let proffys = []
    if (filters.subject && filters.weekday && filters.time) { // Se algum campo estiver vazio ele continua na página, só mostra a pagina sem os proffys
        proffys = await getClasses(filters.time, filters.weekday, filters.subject)
    } else {
        const LIMIT = 10
        proffys = await getAllClasses(LIMIT)
    }

    return res.render('study.html', { proffys, subjects, filters, weekdays })
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
    (weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    // const data = req.body // Req.query(body - dados não aparece na url quando enviados) gera um objeto com name e value dos dados enviados na pagina give-classes
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}