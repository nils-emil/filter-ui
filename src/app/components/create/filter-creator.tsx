"use client";

import Button from '@mui/material/Button';
import {useState} from "react";
import {Else, If, Then} from "react-if";
import {FormControlLabel, Switch} from "@mui/material";
import FilterCreateForm from "@/app/components/create/form/filter-create-form";
import FilterCreateFormModalWrapper from "@/app/components/create/form/filter-create-form-modal-wrapper";

export default function FilterCreator() {
  const [formOpen, setFormOpen] = useState(false);
  const [isModalMode, setIsModalMode] = useState(true);

  const toggleModalMode = () => {
    setFormOpen(false);
    setIsModalMode(e => !e)
  };

  return <div className="my-5">
    <If condition={formOpen}>
      <Then>
        <If condition={isModalMode}>
          <Then>
            <FilterCreateFormModalWrapper closeForm={() => setFormOpen(false)}/>
          </Then>
          <Else>
            <FilterCreateForm closeForm={() => setFormOpen(false)}/>
          </Else>
        </If>
      </Then>
      <Else>
        <div className="flex flex-col">
          <FormControlLabel label="Modal mode"
                            control={<Switch onChange={toggleModalMode} defaultChecked={isModalMode}/>}/>
          <Button variant="contained" onClick={() => setFormOpen(true)}>Add filter</Button>
        </div>
      </Else>
    </If>
  </div>
};

