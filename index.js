const express = require('express');

// const db = require('./data/posts.js');

const server = express();
// server.use(express.json());

server.get('/', (req, res) => {
    res.send('The Express Server for the posts Project is running!');
});


server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            // 200-299 = success
            // 300-399 = rediret
            // 400-499 = client error
            // 500-599 = server error
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});


// server.get('/api/posts/:id', (req, res) => {
//     const id = req.params.id;
//     db.findById(id)
//         .then(user => {
//             // 200-299 = success
//             // 300-399 = rediret
//             // 400-499 = client error
//             // 500-599 = server error
//             res.status(200).json(user);
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error returning user with matching id' });
//         });
// });


// server.post('/api/posts', (req, res) => {
// 	const { name, bio, created_at, updated_at } = req.body;
// 	const user = req.body;

//     if (!name || !bio) {
//         res.status(400).json({ 
//             errorMessage: "Please provide name and bio for the user." 
//         });
// 		return;
// 	}
	
// 	db.insert(user)
// 	.then(user => {
// 		res.status(201).json(user);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 		res.status(500).json({ 
// 			error: "There was an error while saving the user to the database." 
// 		});
// 	});
// });


// server.put('/api/posts/:id', (req, res) => {
//     const { name, bio, id } = req.params;
// 	const user = req.body;

//     db.update(id, user)
//         .then(user => {
//             if (!id) {
// 				res.status(404).json({ message: 'user with that id was not found' });
// 				return;
//             } else {
//                 db.findById(id)
//         			.then(updated => {
// 						if(user.length === 0) {
// 							res.status(404).json({ message: 'Error looking up user' });
// 							return;
// 						}
// 						res.status(200).json({ message: 'User information was successfully updated.' });
// 					})
// 					.catch(error => {
// 						res.status(500).json({ message: 'Error updating user' });
// 					});   
// 			}
// 		})
// 		.catch(error => {
// 			res.status(500).json({ message: 'Error looking up user' });
// 		});
// });

// server.delete('/api/posts/:id', (req, res) => {
// 	const { id } = req.params;
// 	console.log(id);
	
// 	if (id === 0) {
// 		res.status(404).json({ message: 'The user with that ID does not exist.' });
// 		return;
// 	} else {
// 		db
// 		.remove(id)
// 		.then(res => {
// 			  res.status(204).end();
// 		})
// 		.catch(error => {
// 			  res.status(500).json({ message: 'The user could not be removed.' });
// 		});
// 	}
// });

server.listen(5000, () => {
    console.log('API up and running on port 5000');
});