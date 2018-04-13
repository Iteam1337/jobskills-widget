import axios from 'axios'

export function lookupSkills(body) {
  return axios
    .post(
      'http://ontologi.arbetsformedlingen.se/ontology/v1/text-to-structure',
      { body }
    )
    .then(response => response.data)
}

export function getMunicipalities(skills) {
  return axios
    .get('https://s3-eu-west-1.amazonaws.com/seband/municipalities.json')
    .then(response => response.data)
    .then(municipalities => {
      let matches = 0
      const filteredMunicipalities = municipalities
        .filter(municipality => municipality.name)
        .map(municipality => {
          municipality.matches = municipality.matches.filter(
            match => !!skills.find(skill => skill.name === match.name)
          )
          matches += municipality.matches.length
          municipality.averageYears = Math.floor(
            municipality.matches.reduce((years, match) => {
              return years + match.years
            }, 0) / municipality.matches.length
          )
          return municipality
        })
        .filter(municipality => municipality.matches.length > 0)
        .sort((a, b) => {
          return b.matches.length - a.matches.length
        })
        .splice(0, 5)

      return {
        municipalities: filteredMunicipalities,
        matches
      }
    })
}
