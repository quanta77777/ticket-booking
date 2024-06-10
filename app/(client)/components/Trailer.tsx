import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

const Trailer = (props: Props) => {
    const {open, setOpen} = props
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (  
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 sm:h-2/4 md:h-2/4 xl:h-3/4 mt-4  text-black shadow-md p-4">
                <iframe
                    title="YouTube video"
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/EX6clvId19s?si=rQeaWLiTlSY0XKVp"
                   
                    allowFullScreen
                  ></iframe>
        </Box>
      </Modal>
    </div>
  )
}

export default Trailer