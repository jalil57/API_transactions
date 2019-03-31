import mongoose from 'mongoose'

var schema_transaction = mongoose.Schema(
	{
		"issuer_name": String,
		"created_at": String,
		"amount": Number,
		"card_type": String,
		"card_number": String
	}
);

schema_transaction.methods.print = (transac) => {
	console.log(transac);
}

export default mongoose.model('transaction', schema_transaction);