const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('muista antaa salasana')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackHY:${password}@cluster0.wwc9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const tulostaKaikki = () => {

    console.log("phonebook:")

    Person
        .find({})
        .then(result => {
            result.forEach(entry => {
                console.log(`${entry.name} ${entry.number}`)
            })
            mongoose.connection.close()
        })
}

const lisääTauluun = (nimi, numero) => {
    const person = new Person({
        name: `${nimi}`,
        number: `${numero}`,
    })

    //console.log(person)

    person
        .save()
        .then(response => {
            console.log(`added ${nimi} number ${numero} to phonebook`)
            mongoose.connection.close()
        })
}

if (process.argv.length === 5) {
    //console.log(`nimi: ${process.argv[3]}`)
    //console.log(`numero: ${process.argv[4]}`)
    lisääTauluun(process.argv[3], process.argv[4])
} else {
    tulostaKaikki()
}