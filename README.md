# Jobskills widget

A POC for a jobskills widget that shows potential candidates from the [Jobskills](jobskills.se) API based on metadata from the site the widget is placed.

### How it works

The widget works by: 
- Reading metadata from the site where it's placed ( currently just taking document.title )
- Sending that value to [Ontologi /text-to-structure](http://ontologi.arbetsformedlingen.se/ontology/v1/?url=swagger.json#!/Ontology/analyzeText)
- Fetching candidates from a mocked jobskills api search endpoint
- Showing the candidates by location with a packaged Vue component embeddable to any site

### Whats next?

This is only a POC to show what could be possible with an open Jobskills API, with that in place this widget could easily be modified to use the real enpoint. Then anyone could easily embed this widget on their site or use this as an example to implement their own solutions.

# Using the widget

To use the widget include the following code to your html

```
<div id="jobskills-widget"></div>
<script src="https://s3-eu-west-1.amazonaws.com/seband/widget.js"></script>
```


# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/en/download/)

### Installing / Running

To test the widget locally follow these steps:

- `npm install`
- `npm run dev`
- open `index.html` in the root folder

The widget will be rebuilt on save to `dist/widget.js`.

### Building

Run `npm run build` to create a production build of the widget.

### Technologies used

- [Vue](https://vuejs.org)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io)
- [axios](https://github.com/axios/axios)
- [Arbetsförmedlingen Ontology REST API](http://ontologi.arbetsformedlingen.se/)
