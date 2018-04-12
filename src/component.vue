<style scoped>
.container {
  width: 100%;
  max-width: 300px;
  padding: 5px;
  font-family: Open Sans, sans-serif;

  display: flex;
  flex-direction: column;
}
.logo {
  align-self: center;
  width: 80%;
}
.city-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.city {
  margin-top: 5px;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  padding: 15px 10px 15px 15px;

  color: black;
  text-decoration: none;
}
</style>

<template>
  <div class="container">
    <Logo class="logo" />
    <div v-if="loading">
      Loading...
    </div>

    <ul class="city-list" v-for="skill in skills">
      Jobskills matchar {{skill.name.toLowerCase()}} i nedanstående städer:
      <a v-for="city in cities" class="city" href="https://jobskills.se/" target="_blank">
        {{city.city}} - {{city.matches.length}}
      </a>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
import Logo from './static/af_logo.svg'

const lookupSkills = body =>
  axios
    .post(
      'http://ontologi.arbetsformedlingen.se/ontology/v1/text-to-structure',
      { body }
    )
    .then(response => response.data)

const getCities = skills =>
  axios
    .get('http://s3-eu-west-1.amazonaws.com/seband/skills.json')
    .then(response => response.data)
    .then(cities =>
      cities
        .filter(city => city.city)
        .map(city => {
          city.matches = city.matches.filter(
            person => !!skills.find(skill => skill.name === person.text)
          )
          return city
        })
        .filter(city => city.matches.length > 0)
    )

export default {
  el: '#jobskills-widget',
  data: () => ({
    meta: {
      title: ''
    },
    loading: false,
    skills: [],
    places: []
  }),
  created: function() {
    this.loading = true
    this.meta.title = document.title

    lookupSkills(this.meta.title).then(skills => {
      this.skills = skills
      getCities(this.skills).then(cities => {
        this.loading = false
        this.cities = cities
      })
    })
  },
  components: {
    Logo
  }
}
</script>
