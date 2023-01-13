import { useSessionStorage } from 'usehooks-ts';
import { IUserInfo } from '../components/Chat';
import { LOCAL_KEY } from '../consts';

export const useUser = () => {
    const [user, setUser] = useSessionStorage<Partial<IUserInfo>>(
        LOCAL_KEY.user,
        {}
    );
    return { user, setUser };
};
