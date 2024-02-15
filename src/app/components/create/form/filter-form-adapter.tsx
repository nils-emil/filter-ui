"use client";
import {Case, Switch} from "react-if";
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
  border: '2px solid #000',
  boxShadow: 24,
  zIndex: 2,
  p: 4,
};

export default function FilterFormAdapter({closeForm, type}: { closeForm: () => void, type: "modal" | "block" }) {
  return <div>
    <Switch>
      <Case condition={type === "modal"}>
        <>
          <Backdrop open={true} sx={{backgroundColor: 'rgba(0, 0, 0, 0.25)', zIndex: 1}} onClick={closeForm}/>
          <Modal
            BackdropProps={{style: {backgroundColor: 'rgba(0, 0, 0, 0.25)'}}} // Customize backdrop style
            center
            backdrop
            open={true}
            onClose={closeForm}>
            <Box sx={style}>
              <FilterCreateForm onSubmit={closeForm}></FilterCreateForm>
            </Box>
          </Modal>
        </>
      </Case>
      <Case condition={type === "block"}>
        <FilterCreateForm onSubmit={closeForm}></FilterCreateForm>
      </Case>
    </Switch>
  </div>
}