import { Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MessageLeft, MessageRight } from './Message';
import TextInput from './TextInput';
import ModalFillName from './ModalFillName';
import useState from 'react-usestateref';
import { useUser } from '../hooks/useUser';
import { isEmpty } from '../helpers/isEmpty';
import { useUsers } from '../hooks/useUsers';
import { clone } from '../helpers/clone';
import { usePagination } from '../hooks/usePagination';
import { v4 as uuidv4 } from 'uuid';

interface IChatProps {}

export interface IUserInfo {
    id: string;
    name: string | null;
    message: string;
}

const Chat: React.FunctionComponent<IChatProps> = (props) => {
    const classes = useStyles();

    const messageEl = useRef(null);
    const scrollTop = useRef(null);

    const { users, setUsers } = useUsers();
    const { user, setUser } = useUser();

    const [paginateUsers, setPaginateUsers] = useState<any>([]);

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

    const { currentMessages, paginate, currentPage } =
        usePagination();

    useLayoutEffect(() => {
        (messageEl.current as any).scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    useEffect(() => {
        // setPaginateUsers(currentMessages);

        if (currentMessages.length) {
            setPaginateUsers((prev: any) => {
                const newArray = clone(currentMessages);

                const filteredArr = newArray.reduce(
                    (acc: any, current: any) => {
                        const x = acc.find(
                            (item: any) => item.id === current.id
                        );
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    },
                    []
                );

                console.warn('filteredArr', filteredArr);
                return newArray;
            });
        }
    }, [currentPage]);

    console.warn('paginateUsers', paginateUsers);

    const handleSubmit = () => {
        const existingUserIndex = users.findIndex(
            (user) => user.id === userInfoRef.current.id
        );

        if (existingUserIndex === -1) {
            setUsers([...users, userInfoRef.current]);
            setUser((prev) => ({ ...prev, message: '' }));
            return;
        }

        if (
            users[existingUserIndex].name &&
            !users[existingUserIndex].message
        ) {
            const newUsers = clone(users);
            newUsers[existingUserIndex].message = userInfoRef.current.message;
            setUsers(newUsers);
            setUser((prev) => ({ ...prev, message: '' }));
            setUserInfo((prev) => ({ ...prev, message: '' }));
        } else {
            setUsers([...users, userInfoRef.current]);
            setUser((prev) => ({ ...prev, message: '' }));
            setUserInfo((prev) => ({ ...prev, message: '' }));
        }
    };

    const handleScroll = () => {
        if ((scrollTop.current as any).scrollTop === 0) {
            if(currentMessages.length <= 0) return;
            paginate(currentPage - 1);
            setPaginateUsers((prev: any) => [...prev, ...currentMessages]);
        }
        else {
            const scrollTopCal = (scrollTop.current as any).scrollTop;
            const offsetHeight = (scrollTop.current as any).offsetHeight;
            const scrollHeight = (scrollTop.current as any).scrollHeight;

            const contentHeight = scrollHeight - offsetHeight;

            if (contentHeight <= scrollTopCal) {
                // paginate(currentPage + 1);
                paginate(currentPage + 1);
                if(currentMessages.length){
                    setPaginateUsers((prev: any) => [...prev, ...currentMessages]);
                }
            }
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
                    <div
                        id="style-1"
                        className={classes.messagesBody}
                        onScroll={handleScroll}
                        ref={scrollTop}
                    >
                        {users
                            .filter((user: any) => user.message)
                            .map((user: any) => {
                                if (user.id === userInfoRef.current.id) {
                                    return (
                                        <MessageRight
                                            key={user.id + uuidv4()}
                                            message={user.message}
                                            displayName={user.name}
                                            avatarDisp={true}
                                        />
                                    );
                                } else {
                                    return (
                                        <MessageLeft
                                            key={user.id + uuidv4()}
                                            message={user.message}
                                            displayName={user.name}
                                            avatarDisp={true}
                                        />
                                    );
                                }
                            })}
                        <div ref={messageEl} />
                    </div>

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
