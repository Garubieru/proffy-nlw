const Database = require('./db') // Retorna o datbase
const createProffy = require('./createProffy')
Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: "Alexis Penariol", 
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQEMzpCxuAVQrw/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=Ax1BIjBvl9v0GnUf-GZdPiWQ-rCvUxxGLIOKrrL-Vho",
        whatsapp: "1234567891" , 
        bio: "Melhor professor de matemática do mundo.", 
    }

    classValue = {
        subject: 7,
        cost: "40"
        // proffy_id virá pelo bando de dados
    }

    classScheduleValues = [ // Várias aulas, criar um array
        {
            weekday: 1,
            time_from: 720,
            time_to: 1360
        },
        {
            weekday: 0,
            time_from: 720,
            time_to: 1360
        }
        // class_id virá pelo banco de dados, após cadastrar a aula
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultador os dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)
    // Consultar as classes de um de determinado professor
    // e trazer junto os dados do professor

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    // console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // O horário do time_from (8h) precisa ser maior ou igual ao horário solicidade
    // O time_to precisa ser acima
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        from class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    // console.log(selectClassesSchedules)
})