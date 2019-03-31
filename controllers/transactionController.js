import transaction from '../models/transaction/transaction';
import bodyparser from 'body-parser';

const useTransactionController = (router) => {
	router.use(bodyparser.urlencoded({extended: true}));
	router.use(bodyparser.json());
	router.post('/search_transaction', transaction.search_transaction);
	router.post('/create_transaction', transaction.create_transaction);
	router.post('/delete_transaction', transaction.delete_transaction);
	router.post('/edit_transaction', transaction.edit_transaction);
	router.post('/upload_transaction', transaction.upload_transaction);
	router.post('/download_transaction', transaction.download_transaction);
};

export default useTransactionController;