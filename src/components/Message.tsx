import { makeStyles } from "@mui/styles";

interface IMessage {
	message: string;
	timestamp?: string;
	photoURL?: string;
	displayName: string;
	avatarDisp: boolean;
}

export const MessageLeft = (props: IMessage) => {
	const message = props.message ? props.message : "no message";
	const timestamp = props.timestamp ? props.timestamp : "";
	const displayName = props.displayName ? props.displayName : "No Name";
	const classes = useStyles();

	return (
	  <>
		<div className={classes.messageRow}>
		  <img
			alt={displayName}
			className={classes.avatar}
			src={'/avatar-placeholder.jpg'}
		  ></img>
		  <div>
			<div className={classes.displayName}>{displayName}</div>
			<div className={classes.messageBlue}>
			  <div>
				<p className={classes.messageContent}>{message}</p>
			  </div>
			  <div className={classes.messageTimeStampRight}>{timestamp}</div>
			</div>
		  </div>
		</div>
	  </>
	);
  };

  export const MessageRight = (props: IMessage) => {
	const classes = useStyles();
	const message = props.message ? props.message : "https://www.milton.edu/wp-content/uploads/2019/11/avatar-placeholder-250x300.jpg";
	const timestamp = props.timestamp ? props.timestamp : "";
	return (
	  <div className={classes.messageRowRight}>
		<div className={classes.messageOrange}>
		  <p className={classes.messageContent}>{message}</p>
		  <div className={classes.messageTimeStampRight}>{timestamp}</div>
		</div>
	  </div>
	);
  };


  const useStyles = makeStyles((theme) => ({
	messageRow: {
		display: "flex"
	  },
	  messageRowRight: {
		display: "flex",
		justifyContent: "flex-end"
	  },
	  messageBlue: {
		position: "relative",
		marginLeft: "20px",
		marginBottom: "10px",
		padding: "10px",
		backgroundColor: "#A8DDFD",
		width: "80%",
		//height: "50px",
		textAlign: "left",
		font: "400 .9em 'Open Sans', sans-serif",
		border: "1px solid #97C6E3",
		borderRadius: "10px",
		"&:after": {
		  content: "''",
		  position: "absolute",
		  width: "0",
		  height: "0",
		  borderTop: "15px solid #A8DDFD",
		  borderLeft: "15px solid transparent",
		  borderRight: "15px solid transparent",
		  top: "0",
		  left: "-15px"
		},
		"&:before": {
		  content: "''",
		  position: "absolute",
		  width: "0",
		  height: "0",
		  borderTop: "17px solid #97C6E3",
		  borderLeft: "16px solid transparent",
		  borderRight: "16px solid transparent",
		  top: "-1px",
		  left: "-17px"
		}
	  },
	  messageOrange: {
		position: "relative",
		marginRight: "20px",
		marginBottom: "10px",
		padding: "10px",
		backgroundColor: "#f8e896",
		width: "60%",
		//height: "50px",
		textAlign: "left",
		font: "400 .9em 'Open Sans', sans-serif",
		border: "1px solid #dfd087",
		borderRadius: "10px",
		"&:after": {
		  content: "''",
		  position: "absolute",
		  width: "0",
		  height: "0",
		  borderTop: "15px solid #f8e896",
		  borderLeft: "15px solid transparent",
		  borderRight: "15px solid transparent",
		  top: "0",
		  right: "-15px"
		},
		"&:before": {
		  content: "''",
		  position: "absolute",
		  width: "0",
		  height: "0",
		  borderTop: "17px solid #dfd087",
		  borderLeft: "16px solid transparent",
		  borderRight: "16px solid transparent",
		  top: "-1px",
		  right: "-17px"
		}
	  },

	  messageContent: {
		padding: 0,
		margin: 0
	  },
	  messageTimeStampRight: {
		position: "absolute",
		fontSize: ".85em",
		fontWeight: "300",
		marginTop: "10px",
		bottom: "-3px",
		right: "5px"
	  },

	  avatar: {
		width: '40px',
		height: '40px',
		borderRadius: '50%',
	  },
	  avatarNothing: {
		color: "transparent",
		backgroundColor: "transparent",
		width: '16px',
		height: '16px'
	  },
	  displayName: {
		marginLeft: "20px"
	  }
  }))