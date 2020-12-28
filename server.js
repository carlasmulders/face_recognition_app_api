const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
	{
		id: '123',
		name: 'John',
		password: 'cookies',
		email: 'john@gmail.com',
		entries: 0,
		joined: new Date(),
	},
	{
		id: '124',
		name: 'Sally',
		password: 'bananas',
		email: 'sally@gmail.com', 
		entries: 0,
		joined: new Date(),
	}
	],
	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}
	]
}

app.get('/', (req, res) => {
	res.json(database.users);
})

app.post('/signin', (req, res) => {
	bcrypt.compare(req.body.password, database.login[0].hash, function(err, res) {

	})
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}
	else{
		res.status(400).json('error loggin in');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    	console.log(hash);
	});	
	database.users.push({
		id: '125',
		name: name,
		email: email, 
		entries: 0,
		joined: new Date(),
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.users.forEach(user => {
		if (user.id === id){
			return res.json(user);
		}
	})
	res.status(400).json("no such user");
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	database.users.forEach(user => {
		if (user.id === id){
			user.entries++
			return res.json(user.entries);
		}
	})
	res.status(400).json('no such user');
})

app.listen(3000,() => {
	console.log('app is running on port 3000');
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });