module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
     // Inserir dados na tabela proffys
     // Aguardar a ser concluido para ir pra próxima linha, só funciona se o async estiver na função
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    
    const proffy_id = insertedProffy.lastID // Id do professor está no insertedProffy
    
    // Inserir dados na tabela classes
    const InsertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = InsertedClass.lastID

    // Inserir dados na tabela class_schedule
    // O map retorna um array com os db.runs()
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })
    // Executar todos os db.runs das class_schedules
    // O promise all vai aguardar todos os arrays, juntamentr do await que vai esperar tudo ser finalizasdo
    await Promise.all(insertedAllClassScheduleValues)
}