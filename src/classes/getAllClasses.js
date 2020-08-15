const Database = require('../database/db')
const { getSubject } = require('../utils/format')

const getAllClasses = async (limit) => {
    const query = `
        SELECT *
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        LIMIT ${limit};
    `

    const db = await Database
    proffys = await db.all(query)

    proffys.map((proffy) => {
        proffy.subject = getSubject(proffy.subject)
    })

    return proffys
}

module.exports = {getAllClasses}