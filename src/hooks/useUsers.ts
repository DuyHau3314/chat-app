import { useLocalStorage } from 'usehooks-ts';
import { IUserInfo } from '../components/Chat';
import { LOCAL_KEY } from '../consts';

export const useUsers = () => {
	const [users, setUsers] = useLocalStorage<IUserInfo[]>(LOCAL_KEY.users, []);
	return { users, setUsers };
}
