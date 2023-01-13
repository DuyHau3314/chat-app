import { Box, Button, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IUserInfo } from './Chat';

interface ITextInputProps {
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
    handleSubmit: () => void;
    userInfoRef: any
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({setUserInfo, handleSubmit, userInfoRef}) => {

	const classes = useStyles();

    return (
        <>
            <Box className={classes.wrapForm}>
            <TextField
                id="standard-text"
                label="Type something"
                className={classes.wrapText}
                onChange={(e) => setUserInfo((prev: IUserInfo) => ({
                    ...prev, message: e.target.value
                }))}
                value={userInfoRef.current.message}
            />
            <Button variant="contained" color="primary" className={classes.button} disabled={!userInfoRef.current.message} onClick={handleSubmit}>
                <SendIcon />
            </Button>
            </Box>
        </>
    )
};

export default TextInput;


const useStyles = makeStyles((theme: Theme) => ({
	wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  }));