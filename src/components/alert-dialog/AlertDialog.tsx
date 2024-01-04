import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export interface Props {
  showAlert: boolean;
  alertTitle: string;
  alertMessage: string;
}

export const AlertDialog = (props: Props) => {
  return (
    <Dialog
      open={props.showAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.alertTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.alertMessage}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
