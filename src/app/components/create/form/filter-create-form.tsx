"use client";
import {FormEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Case, Default, Switch, When} from "react-if";
import {createFilter, Filter, FilterCriteria} from "@/lib/features/filter";
import {useAppDispatch} from "@/lib/hooks";
import {MenuItem, Select} from "@mui/material";
import {filterCreateFormConfiguration} from "@/app/components/create/form/filter-create-form-configuration";

const initialCriterion = {
  type: filterCreateFormConfiguration[0].type,
  comparisonOperator: filterCreateFormConfiguration[0].comparisonOperators[0],
  value: ''
} as FilterCriteria;

export default function FilterCreateForm({closeForm}: { closeForm: () => void }) {
  const dispatch = useAppDispatch();
  const [formName, setFormName] = useState('');
  const [criteria, setCriteria] = useState([initialCriterion]);

  const handleAddCriteria = () => {
    setCriteria([...criteria, initialCriterion]);
  };

  const handleRemoveCriteria = (index: number) => {
    const newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    setCriteria(newCriteria);
  };

  const handleTypeChange = (index: number, field: string, value: string) => {
    const newCriteria = criteria.map((criterion, i) => {
      if (i === index) {
        const indexOfType = filterCreateFormConfiguration.findIndex((config) => config.type === value);
        return {
          type: filterCreateFormConfiguration[indexOfType].type,
          comparisonOperator: filterCreateFormConfiguration[indexOfType].comparisonOperators[0],
          value: ''
        } as FilterCriteria;
      }
      return criterion;
    });
    setCriteria(newCriteria);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newCriteria = criteria.map((crit, i) => {
      if (i === index) {
        return {...crit, [field]: value};
      }
      return crit;
    });
    setCriteria(newCriteria);
  };

  const handleSubmit = (event: FormEvent) => {
    const filter: Filter = {name: formName, criteria: criteria};
    dispatch(createFilter(filter));
    event.preventDefault();
    closeForm();
  };

  return <form onSubmit={handleSubmit}>
    <TextField id="filter-name" label="Filter name"
               required
               onChange={(event) => setFormName(event.target.value)}
               variant="standard" fullWidth margin="normal"/>
    <div className="flex flex-col mt-6 gap-6">
      {criteria.map((criterion, index) => (
        <div className="grid grid-cols-6 gap-3" key={`criterion-${index}`}>
          <div key={`${criteria.length}${index}`} className="col-span-6 md:col-span-5 flex gap-3">
            <Select
              value={criterion.type}
              variant="standard"
              fullWidth
              onChange={(e) => handleTypeChange(index, 'type', e.target.value)}>
              {filterCreateFormConfiguration.map((config) =>
                <MenuItem key={config.type}
                          value={config.type}>
                  {config.type}
                </MenuItem>)}
            </Select>
            {filterCreateFormConfiguration.map((config, i) => (
              <When key={"" + i} condition={config.type === criterion.type}>
                <Select
                  value={criterion.comparisonOperator}
                  variant="standard"
                  fullWidth
                  onChange={(e) => handleChange(index, 'comparisonOperator', e.target.value)}>
                  {config.comparisonOperators.map((operator, i) => (
                    <MenuItem key={i} value={operator}>{operator}</MenuItem>
                  ))}
                </Select>
                <Switch>
                  <Case condition={config.valueType === 'datepicker'}>
                    <TextField
                      type="date"
                      value={criterion.value}
                      required
                      onChange={(e) => handleChange(index, 'value', e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Case>
                  <Case condition={config.valueType === 'number'}>
                    <TextField
                      value={criterion.value}
                      type="number"
                      required
                      onChange={(e) => handleChange(index, 'value', e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Case>
                  <Default>
                    <TextField
                      value={criterion.value}
                      type="text"
                      required
                      onChange={(e) => handleChange(index, 'value', e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Default>
                </Switch>
              </When>
            ))}
          </div>
          <When condition={criteria.length > 1}>
            <Button variant="outlined"
                    className="col-span-6 md:col-span-1"
                    size="small"
                    fullWidth
                    onClick={() => handleRemoveCriteria(index)}>
              <RemoveIcon onClick={() => handleRemoveCriteria(index)}/>
            </Button>
          </When>
        </div>
      ))}
    </div>
    <div className="flex flex-col md:flex-row justify-between mt-6">
      <Button onClick={handleAddCriteria}>
        <AddIcon/>
        <p>Add criterion</p>
      </Button>
      <div className="flex flex-col md:flex-row gap-2">
        <Button type="button" variant="outlined" color="primary" onClick={closeForm}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
  </form>
}