import transaction from '../../mongoose/models/model_transaction';
import fs from 'fs'

const search_transaction = (req, res) => {
	transaction.findOne({"_id": req.body.id_to_search}, (err, transac) => {
		if (!err && transac) {
			res.send("ID: " + transac['_id'] + "<br><br>" +
					 "issuer name: " + transac['issuer_name'] + "<br><br>" +
					 "created at: " + transac['created_at'] + "<br><br>" +
					 "amount: " + transac['amount'] + "<br><br>" +
					 "card type: " + transac['card_type'] + "<br><br>" +
					 "card number: " + transac['card_number']);
		} else {
			res.send('transaction not found');
		}
	})
};

const create_transaction = (req, res) => {
	if (req.body.issuer_name === "" ||
			req.body.create_date === "" ||
			req.body.amount === "" ||
			req.body.card_type === "" ||
			req.body.card_number === "") {
		res.send('Some informations are missing');
	} else {
		let transac = new transaction({
			"issuer_name": req.body.issuer_name,
			"created_at": req.body.create_date,
			"amount": req.body.amount,
			"card_type": req.body.card_type,
			"card_number": req.body.card_number
		});
		transac.save((err, transac) => {
			if (err) {
				res.json(err);
			} else {
				transac.print(transac);
				res.send('transaction successfull, id: ' + transac.id);
			}
		})
	}
};

const delete_transaction = (req, res) => {
	transaction.findOneAndDelete({"_id": req.body.id_to_delete}, (err, transac) => {
		if (err || !transac) {
			res.send('transaction not found');
		} else {
			res.send('transaction deleted')
		}
	});
};

const edit_transaction = (req, res) => {
	transaction.findOne({"_id": req.body.id_to_edit}, (err, transac) => {
		if (err || ! transac) {
			res.send('transaction not found');
		} else {
			transac.print(transac);
			if (req.body.issuer_name_to_edit != "") {
				transac.issuer_name = req.body.issuer_name_to_edit;
			}
			if (req.body.create_date_to_edit != "") {
				transac.create_date = req.body.create_date_to_edit;
			}
			if (req.body.amount_to_edit != "") {
				transac.amount = req.body.amount_to_edit;
			}
			if (req.body.card_type_to_edit != "") {
				transac.card_type = req.body.card_type_to_edit;
			}
			if (req.body.card_number_to_edit != "") {
				transac.card_number = req.body.card_number_to_edit;
			}
			transac.save((err) => {
				if (err) {
					res.json(err);
				} else {
					res.send('Transacton updated');
				}
			});
			transac.print(transac);
		}
	});
};

const upload_transaction = (req, res) => {
	let data = JSON.parse(fs.readFileSync(req.body.file_to_upload));
	if (data) {
		data.forEach(json => {
			let transac = new transaction(json);
			transac.save((err) => {
				if (err) {
					res.json(err);
				} else {
					res.send('transactions uploaded');
				}
			})
		});
	} else {
		res.send('Bad file');
	}
};

const download_transaction = (req, res) => {
	transaction.findOne({'_id': req.body.id_to_download}, (err, transac) => {
		if (err) {
			res.send('transaction not found');
		} else {
			res.setHeader('Content-disposition', 'attachment; filename=transaction.json');
			res.setHeader('Content-type', 'application/json');
			let data = JSON.stringify(transac);
			res.write(data, (err) => {
				if (err) {
					res.send('Can\'t download this transaction');
				} else {
					res.end();
				}
			})
		}
	});
};

export default {
	search_transaction,
	create_transaction,
	delete_transaction,
	edit_transaction,
	upload_transaction,
	download_transaction
}