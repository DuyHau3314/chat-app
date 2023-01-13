import { Button, Modal, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { IUserInfo } from './Chat';
import { v4 as uuidv4 } from 'uuid';
import { useUsers } from '../hooks/useUsers';
import { useUser } from '../hooks/useUser';



interface IModalFillNameProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setUserInfo: (value: any) => void;
    userInfo: any;
}

const ModalFillName: React.FunctionComponent<IModalFillNameProps> = (props) => {
    const { open, setOpen, setUserInfo, userInfo } = props;
	const { setUsers} = useUsers();
	const {setUser} = useUser();

    const classes = useStyles();

	console.log(userInfo.current);


    const handleSubmit = () => {
		const id = uuidv4();
        setUserInfo((prev: IUserInfo) => ({
			...prev,
			id,
		}));

		setUsers((prev: any) => [...prev, userInfo.current]);
		setUser(userInfo.current);
		setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.overall}>
                <Box className={classes.popup}>
                    <TextField
                        label="Enter name"
                        variant="outlined"
                        name="name"
                        onChange={(e) =>
                            setUserInfo((prev: IUserInfo) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <Button
                        disabled={!userInfo.current.name}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalFillName;

const useStyles = makeStyles((theme: Theme) => ({
    overall: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: '300px',
        height: 'auto',
        background: 'white',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px',
    },
}));
