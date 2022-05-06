require('dotenv').config()
const {menuInquirer, pausa, searchCountry, paisInquire} = require('./helpers/menu_inquire')
const search = require('./models/search')

const main = async() => {
    let option;
    
    do {    
            console.clear()
           
            option = await menuInquirer()
            switch (option) {
                case 1:
                    country = await searchCountry()
                    const responseAxios = await search.searchCountryAxios(country)
                    const id = await paisInquire(responseAxios)      
                    if(id === 0) continue

                    const lugarEncontrado = responseAxios.find(p => {
                        return p.id === id
                    })
                    

                    const climaEncontrado = await search.searchWeather(lugarEncontrado.latitud, lugarEncontrado.longitud)
                    
                    console.log('\nResultado de la Busqueda\n')
                    console.log('Nombre ' , lugarEncontrado.nombre )
                    console.log('Latiud' , lugarEncontrado.latitud)
                    console.log('Longitud', lugarEncontrado.longitud )
                    console.log('Temperatura ' , climaEncontrado.temperatura )
                    console.log('Temperatura Minima ', climaEncontrado.temperatura_minima)
                    console.log('Temperatura Maxima ', climaEncontrado.temperatura_maxima)
                    console.log('Clima ', climaEncontrado.description)
                  break;
                case 2:
                    console.log('historial')
                    break;
                case 3:
                    console.log('salir')
                    break;
              default:
                  break;
          }




          await pausa()
    } while (option !== 0);
}


main()