import { useMemo, useState } from 'react';
import { useUsers } from './useUsers';

export const usePagination = () => {
	const {users} = useUsers();
	const totalMessages = users.length;
    const [messagesPerPage] = useState(25);

	const totalPages = useMemo(() =>
		 Math.ceil(totalMessages / messagesPerPage)
	,[users.length]);

    const [currentPage, setCurrentPage] = useState(totalPages);

	const indexOfLastMessage = currentPage * messagesPerPage;
	console.warn('indexOfLastMessage', indexOfLastMessage);
	const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
	console.log('indexOfFirstMessage', indexOfFirstMessage)
	const currentMessages = users.slice(indexOfFirstMessage, indexOfLastMessage);



    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return { currentMessages, messagesPerPage, paginate, currentPage };
};
