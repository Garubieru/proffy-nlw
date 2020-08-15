const Database = require('../database/db')
const { getSubject, convertHoursToMinutes } = require('../utils/format')

const getClasses = async (timeInHours, weekday, subject) => {
    const timeInMinutes = convertHoursToMinutes(timeInHours)
    const query = `
        SELECT *
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT *
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to >= ${timeInMinutes}
        )
        AND classes.subject = '${subject}'
    `

    const db = await Database
    proffys = await db.all(query)

    proffys.map((proffy) => {
        proffy.subject = getSubject(proffy.subject)
    })

    return proffys
}

module.exports = {
    getClasses
}