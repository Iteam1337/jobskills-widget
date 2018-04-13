<style scoped src="./style.css">
</style>

<template>
  <div class="container">
    <Logo class="logo" />
    <div v-if="loading" class="loading">
      Laddar...
    </div>

    <ul v-for="skill in skills" v-if="!loading">
      <span class="list-header">
        Jobskills matchar <strong>{{matches}}</strong> kandidater för {{skill.name}}
      </span>
      <a v-for="municipality in municipalities"
        class="list-item"
        v-bind:href="getLink(skill, municipality)"
        target="_blank">
        <span>
          <strong>{{municipality.name}}</strong> {{municipality.matches.length}} kandidater
        </span>
        <br>
        <span>{{municipality.averageYears}} års erfarenhet</span>
      </a>
    </ul>

    <div class="info-area">
      <h4>Letar du efter nya medarbetare?</h4>
      <span>
        Använd Jobskills sökverktyg för arbetsgivare för att rekrytera ny personal till ditt företag.
      </span>

      <a href="https://jobskills.se/" target="_blank">
        <i class="fa fa-chevron-right" /> Sök kompetens i Jobskills
      </a>
    </div>
  </div>
</template>

<script>
import Logo from './static/af_logo.svg'
import { lookupSkills, getMunicipalities } from './helpers/apiRequests'

export default {
  el: '#jobskills-widget',
  data: () => ({
    meta: {
      title: ''
    },
    loading: false,
    skills: [],
    matches: 0,
    municipalities: []
  }),
  created: function() {
    this.loading = true
    this.meta.title = document.title

    lookupSkills(this.meta.title).then(skills => {
      this.skills = skills
      getMunicipalities(this.skills).then(({ municipalities, matches }) => {
        this.loading = false
        this.matches = matches
        this.municipalities = municipalities
      })
    })
  },
  methods: {
    getLink: (skill, municipality) =>
      `https://search.jobskills.se?q${skill.name}&municipality=${
        municipality.name
      }`
  },
  components: {
    Logo
  }
}
</script>
