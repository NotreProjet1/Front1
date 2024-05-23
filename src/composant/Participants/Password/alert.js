import React from "react";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default function Alert({
  handleClose,
  isOpen,
  title,
  text,
  submitButtonText
}) {
  return (
    <Dialog
      open={isOpen}
      transition={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs" // Largeur maximale
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="raised" color="primary">
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
