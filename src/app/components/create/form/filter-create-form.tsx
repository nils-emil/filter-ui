"use client";
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {When} from "react-if";
import {createFilter, Filter, FilterCriteria} from "@/lib/features/filter";
import {useAppDispatch} from "@/lib/hooks";

const initialCriterion = {type: 'Amount', comparisonOperator: 'equals', value: ''} as FilterCriteria;

export default function FilterCreateForm({onSubmit}: { onSubmit: () => void }) {
  const dispatch = useAppDispatch();
  const [formName, setFormName] = useState('');
  const [criteria, setCriteria] = useState([initialCriterion]);

  const handleAddCriteria = () => {
    setCriteria([...criteria, initialCriterion]);
  };

  const handleRemoveCriteria = (index) => {
    const newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    setCriteria(newCriteria);
  };

  const handleChange = (index, field, value) => {
    const newCriteria = criteria.map((crit, i) => {
      if (i === index) {
        return {...crit, [field]: value};
      }
      return crit;
    });
    setCriteria(newCriteria);
  };

  const handleSubmit = (event) => {
    const filter: Filter = {name: formName, criteria: criteria};
    dispatch(createFilter(filter));
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="filter-name" label="Filter name"
                 onChange={(event) => setFormName(event.target.value)}
                 variant="standard" fullWidth margin="normal"/>
      {criteria.map((criterion, index) => (
        <div key={`${criteria.length}${index}`} className="flex gap-5">
          <TextField label="Value"
                     variant="standard"
                     fullWidth
                     margin="normal"
                     defaultValue={criterion.type}
                     onChange={(e) => handleChange(index, 'type', e.target.value)}/>
          <TextField label="Value"
                     variant="standard"
                     fullWidth
                     margin="normal"
                     defaultValue={criterion.comparisonOperator}
                     onChange={(e) => handleChange(index, 'comparisonOperator', e.target.value)}/>
          <TextField label="Value"
                     variant="standard"
                     fullWidth
                     margin="normal"
                     defaultValue={criterion.value}
                     onChange={(e) => handleChange(index, 'value', e.target.value)}/>
          <When condition={criteria.length > 1}>
            <Button variant="outlined" onClick={() => handleRemoveCriteria(index)}>
              <RemoveIcon onClick={() => handleRemoveCriteria(index)}/>
            </Button>
          </When>
        </div>
      ))}
      <div>
        <IconButton onClick={handleAddCriteria}>
          <AddIcon/>
        </IconButton>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}