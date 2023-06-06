const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes settings
app.get('/', (req, res) => {
	res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
	const movies = movieList.results.filter(movie => {
		return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
	})
	res.render('index', { movies: movies, keyword: req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) => {
	console.log('movie_id', req.params.movie_id)
	const movie = movieList.results.find(
		movie => movie.id.toString() === req.params.movie_id
	)
	res.render('show', { movie: movie })
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on port: ${port}`)
})
