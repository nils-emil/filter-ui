"use client";

import Button from '@mui/material/Button';
import {useState} from "react";
import {Else, If, Then} from "react-if";
import FilterFormAdapter from "@/app/components/create/form/filter-form-adapter";

export default function FilterCreator() {
  const [formOpen, setFormOpen] = useState(false);
  return <div className="my-5">
    <If condition={formOpen}>
      <Then>
        <FilterFormAdapter closeForm={() => setFormOpen(false)} type="modal"></FilterFormAdapter>
      </Then>
      <Else>
        <Button variant="contained" onClick={() => setFormOpen(true)}>Add filter</Button>
      </Else>
    </If>
  </div>
};

