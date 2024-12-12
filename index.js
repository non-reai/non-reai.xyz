import express from 'express';
import fs from 'fs';
import showdown from 'showdown'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'

dotenv.config()

const converter = new showdown.Converter()

const app = express();

app.set('view engine', 'ejs')

app.use("/", express.static('public'));

app.use("/assets", express.static('assets'));

app.use(express.json())
app.use(cookieParser())

app.get('/password/:password', (req, res)=>{
	res.cookie('password', req.params.password)
	res.redirect('/')
})

app.post("/set-motd", (req, res)=>{
	if (req.cookies.password != process.env.PASSWORD) {
		res.statusCode = 401
		res.end("Unauthorized")
		return
	}
	fs.writeFileSync("./assets/json/MOTD.json", JSON.stringify(req.body))
	res.end("Changed")
})

app.get('/portfolio', (req, res)=>{	
	function crawlTree(startPoint) {
		const tree = {}
		const items = fs.readdirSync(startPoint)
		items.forEach((name, index)=>{
			if (fs.lstatSync(path.join(startPoint, name)).isDirectory()) {
				tree[name] = crawlTree(path.join(startPoint, name))
				
			} else {
				tree[name] = path.join(startPoint, name)
			}
		})

		return tree
	}

	res.render('portfolio.ejs', {
		"tree": crawlTree("portfolio")
	})
})

app.get('/portfolio/write', (req, res)=>{
	if (req.cookies.password != process.env.PASSWORD) {
		res.statusCode = 401
		res.end("Unauthorized")
		return
	}
	res.render('write-project.ejs')
})

app.post('/portfolio/write', (req, res)=>{
	if (req.cookies.password != process.env.PASSWORD) {
		res.statusCode = 401
		res.end("Unauthorized")
		return
	}
	fs.mkdirSync(path.join('portfolio', req.body.path), { recursive: true })
	fs.writeFileSync(path.join('portfolio', req.body.path, req.body.title.toLowerCase().replaceAll(' ','-'))+'.json', JSON.stringify({
		title: req.body.title,
		date: Date.now(),
		content: req.body.content
	}))
	res.end('wrote')
})

app.get('/portfolio/*', (req, res, next)=>{
	const path = req.url.substring(1,10000) + ((req.url.split('').pop() == '/') ? '' : '/')
	
	try {
		const project = JSON.parse(fs.readFileSync(path.substring(0,path.length - 1) + '.json'))
		res.render('project.ejs', {
			title: project.title,
			content: converter.makeHtml(project.content),
			date: project.date
		})
	} catch (err) {
		next()
	}
})

app.use((req, res)=>{
	res.setHeader('content-type','text/html')
	res.end(fs.readFileSync("public/not-found/index.html"))
})

app.listen(5230);
