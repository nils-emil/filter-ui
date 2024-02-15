"use client";
import FilterCreateForm from "@/app/components/create/form/filter-create-form";
import {Box} from "@mui/system";
import {Modal} from "@mui/base";
import {Backdrop} from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50rem",
  bgcolor: 'white',
  borderRadius: "1rem",
  height: "30rem",
  overflow: "auto",
  minHeight: "20rem",
  maxHeight: "90vh",
  maxWidth: "100vw",
  border: '2px solid #000',
  boxShadow: 24,
  zIndex: 2,
  p: 4,
};

export default function FilterCreateFormModalWrapper({closeForm}: { closeForm: () => void }) {
  return <div>
    <Backdrop open={true} sx={{backgroundColor: 'rgba(0, 0, 0, 0.25)', zIndex: 1}} onClick={closeForm}/>
    <Modal open={true}
           onClose={closeForm}>
      <Box className="resize-y" sx={style}>
        <FilterCreateForm closeForm={closeForm}></FilterCreateForm>
      </Box>
    </Modal>
  </div>
}