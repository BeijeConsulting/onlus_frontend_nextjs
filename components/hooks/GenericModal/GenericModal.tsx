import { FC } from "react"

// mui
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

interface GenericModalProps {
  open: boolean
  children: JSX.Element
  callback: Function
}

const GenericModal: FC<GenericModalProps> = (props) => {
  const handleClose = (): void => {
    if (!!props.callback) {
      props.callback()
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>{props.children}</Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default GenericModal
