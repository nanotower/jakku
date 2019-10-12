import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Geosuggest from 'react-geosuggest';



export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [values, setValues] = React.useState({
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
    date: new Date()
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha de finalización"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora de recogida"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora límite de recogida"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          inputProps={{
            step: 450, 
          }}
        />
         <TextField
        // id="outlined-name"
        // label="Dirección"
        // value={values.name}
        // onChange={handleChange('name')}
        // margin="normal"
        // variant="outlined"
      >
        <Geosuggest id="outlined-name" placeholder="Donde vas a entregar los productos" country="es" />
      </TextField>
      <TextField
      
        label="react-number-format"
        variant="outlined"
        value={values.numberformat}
        onChange={handleChange('numberformat')}
        id="outlined-name"
        InputProps={{
          inputComponent: Geosuggest ,style:{"outline":"0"}, 
        }}
      />
      
      
  
   
    </MuiPickersUtilsProvider>
  );
}