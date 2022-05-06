const inquirer = require('inquirer')
const pregunta = [
    {
        type:'list',
        name:'opcion',
        message:'¿Que opcion desea realizar?',
        choices : [
            {
                value: 1,
                name : '1. Buscar Pais'
            },
            {
                value: 2,
                name:'2. Mostrar Historial'
            },
            {
                value:0,
                name:'3. Salir'
            }
        ]

    }
]

const menuInquirer = async() =>{
    console.log('==================')
    console.log('Busqueda de paises')
    console.log('==================')

    const {opcion} = await inquirer.prompt(pregunta)
    
    return opcion

}


const pausa = async() => {
    const question = [
        {
            type : 'input',
            name : 'pause',
            message : 'Press ENTER to continue'
        }
    ]

    await inquirer.prompt(question)
}


const searchCountry = async() =>{

    const question = [
        {
            type : 'input',
            name : 'country',
            message :'¿Que pais desea buscar?',
            validate(value){
                if(!value){
                    throw 'No puede ingresar un pais vacio'
                }
                return true
            }
        }
    ]


    const {country}= await inquirer.prompt(question)
    return country
}


const paisInquire = async(responseAxios) => {
   
    
    const choices = responseAxios.map((p,i) => {
        const idx = `${i + 1}`
        return {
            value : p.id,
            name : `${idx}. ${p.nombre} `
        }
    })

    choices.unshift({
        value : 0,
        name : '0. Atras'
    })
    const question = [
        {
            type :'list',
            name : 'id',
            message : '5 answers found',
            choices
        }
    ]

    const {id} = await inquirer.prompt(question)
    return id
    
}


module.exports = {
    menuInquirer,
    pausa,
    searchCountry,
    paisInquire
}