import { Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { MessageLeft, MessageRight } from './Message';
import TextInput from './TextInput';
import ModalFillName from './ModalFillName';
import useState from 'react-usestateref';
import { useUser } from '../hooks/useUser';
import { isEmpty } from '../helpers/isEmpty';
import { useUsers } from '../hooks/useUsers';
import { clone } from '../helpers/clone';

interface IChatProps {}

export interface IUserInfo {
    id: string;
    name: string | null;
    message: string;
}

const Chat: React.FunctionComponent<IChatProps> = (props) => {
    const classes = useStyles();

    const { users, setUsers } = useUsers();
    const { user, setUser } = useUser();

    const getUserInfo = () => {
        if (!isEmpty(user)) {
            return user;
        } else {
            return {
                id: '',
                name: '',
                message: '',
            };
        }
    };

    const [, setUserInfo, userInfoRef] = useState<IUserInfo>(
        getUserInfo() as IUserInfo
    );

    const [openFillName, setOpenFillName] = useState(true);

    const handleSubmit = () => {
		console.log('existingUserIndex');

        const existingUserIndex = users.findIndex(
            (user) => user.id === userInfoRef.current.id
        );

		if(existingUserIndex === -1) {
			setUsers([...users, userInfoRef.current]);
			setUser(prev => ({...prev, message: ''}));
			return;
		}


        if (
            users[existingUserIndex].name &&
            !users[existingUserIndex].message
        ) {
            const newUsers = clone(users);
            newUsers[existingUserIndex].message = userInfoRef.current.message;
             setUsers(newUsers);
			 setUser(prev => ({...prev, message: ''}));
			 setUserInfo(prev => ({...prev, message: ''}));

        } else {
             setUsers([...users, userInfoRef.current]);
			 setUser(prev => ({...prev, message: ''}));
			 setUserInfo(prev => ({...prev, message: ''}));

        }

    };

    return (
        <>
            {!user.name && (
                <ModalFillName
                    open={openFillName}
                    setOpen={setOpenFillName}
                    setUserInfo={setUserInfo}
                    userInfo={userInfoRef}
                />
            )}
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Paper id="style-1" className={classes.messagesBody}>
                        {users.filter(user => user.message).map((user: any) => {
                            if (user.id === userInfoRef.current.id) {
                                return (
                                    <MessageRight
										key={user.id}
                                        message={user.message}
                                        displayName={user.name}
                                        avatarDisp={true}
                                    />
                                );
                            } else {
                                return (
                                    <MessageLeft
										key={user.id}
                                        message={user.message}
                                        displayName={user.name}
                                        avatarDisp={true}
                                    />
                                );
                            }
                        })}
                    </Paper>
                    <TextInput
                        setUserInfo={setUserInfo}
                        handleSubmit={handleSubmit}
						userInfoRef={userInfoRef}
                    />
                </Paper>
            </div>
        </>
    );
};

export default Chat;

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        width: '80vw',
        height: '80vh',
        maxWidth: '500px',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    paper2: {
        width: '80vw',
        maxWidth: '500px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messagesBody: {
        width: 'calc( 100% - 20px )',
        margin: 10,
        overflowY: 'scroll',
        height: 'calc( 100% - 80px )',
    },
}));
