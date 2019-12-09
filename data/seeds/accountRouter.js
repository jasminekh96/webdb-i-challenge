const express = require('express');

const knex = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
	knex
		.select('*')
		.from('accounts')
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error getting accounts' });
		});
});

router.get('/:id', (req, res) => {
	knex
		.select('*')
		.from('accounts')
		.where({ id: req.params.id })
		.first()
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error getting accounts by ID' });
		});
});

router.post('/', (req, res) => {
	const accountData = req.body;
	knex('accounts')
		.insert(accountData, 'id')
		.then((ids) => {
			const id = ids[0];
			return knex('accounts').select('id', 'name', 'budget').where({ id }).then((accounts) => {
				res.status(201).json(accounts);
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error adding account' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	knex('accounts')
		.where({ id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ message: `${count} record(s) updated` });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error updating the post' });
		});
});

router.delete('/:id', (req, res) => {
	knex('accounts')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: `${count} record(s) deleted` });
			} else {
				res.status(404).json({ message: 'id not found' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error deleting the account' });
		});
});

module.exports = router;
