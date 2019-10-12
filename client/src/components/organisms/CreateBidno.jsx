import React, { Component } from 'react'
import RoutesService from "../RoutesService";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const google = window.google;




const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },

];


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));



export default class CreateBid extends Component {
  constructor(props) {
    super();
    this.state = {
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
      setSelectedDate: new Date('2014-08-18'),

    }
    this.routes = new RoutesService();
    this.classes = useStyles
    
 
  }
  // updateBidData(e,field) {
  //   let newState = {
  //     ...this.state
  //   }
  //   newState[field] = e.target.value;
  //   this.setState(newState);
  // }
  updateBidData = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
      };
  handleDateChange = date => {

        this.setState({
          ...this.state,
          setSelectedDate: date

        })
      };
      componentDidMount() {
        if (typeof google === 'undefined') {
          console.warn('Google Places was not initialized. LocationSearchBox will not function.');
          return;
        }
    
        const { country, onPlaceChanged } = this.props;
        const { places } = google.maps;
    
        let options;
    
        if (country) {
          options = {
            componentRestrictions: { country }
          };
        }
    
        const input = this.locationSearch;
    
        input.setAttribute('placeholder', '');
    
        if (!input._autocomplete) {
          input._autocomplete = new places.Autocomplete(input, options);
    
          input._autocomplete.addListener('place_changed', () => {
            onPlaceChanged && onPlaceChanged(input._autocomplete.getPlace())
          }).bind(input._autocomplete);
        }
      }

  sendForm(e) {
    e.preventDefault();
    const {deadLine, from, to, location} = this.state;
    this.routes.createBid(deadLine, from, to, location)

  }
  render() {
    return (
      <React.Fragment>
      <h1>Crea tu mudanza</h1>
      
        <form className={this.classes.container} noValidate autoComplete="off">
        <TextField><TextField ref={ref => (this.locationSearch = ref.input)} hintText="Search nearby" /></TextField>

        <TextField
        id="date outlined-name"
        label="Fecha de finalización"
        type="date"
        defaultValue="2019-11-01"
        className={this.classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-name"
        label="Name"
        className={this.classes.textField}
        value={this.state.name}
        onChange={this.updateBidData('name')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        error
        id="outlined-error"
        label="Error"
        defaultValue="Hello World"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        disabled
        id="outlined-disabled"
        label="Disabled"
        defaultValue="Hello World"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-email-input"
        label="Email"
        className={this.classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        className={this.classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-read-only-input"
        label="Read Only"
        defaultValue="Hello World"
        className={this.classes.textField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-dense"
        label="Dense"
        className={clsx(this.classes.textField, this.classes.dense)}
        margin="dense"
        variant="outlined"
      />
      <TextField
        id="outlined-dense-multiline"
        label="Dense multiline"
        className={clsx(this.classes.textField, this.classes.dense)}
        margin="dense"
        variant="outlined"
        multiline
        rowsMax="4"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax="4"
        value={this.state.multiline}
        onChange={this.updateBidData('multiline')}
        className={this.classes.textField}
        margin="normal"
        helperText="hello"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows="4"
        defaultValue="Default Value"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-helperText"
        label="Helper text"
        defaultValue="Default Value"
        className={this.classes.textField}
        helperText="Some important text"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-number"
        label="Number"
        value={this.state.age}
        onChange={this.updateBidData('age')}
        type="number"
        className={this.classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        className={this.classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        className={this.classes.textField}
        value={this.state.currency}
        onChange={this.updateBidData('currency')}
        SelectProps={{
          MenuProps: {
            className: this.classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Native select"
        className={this.classes.textField}
        value={this.state.currency}
        onChange={this.updateBidData('currency')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: this.classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
        id="outlined-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        helperText="Full width!"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-bare"
        className={this.classes.textField}
        defaultValue="Bare"
        margin="normal"
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />
   
      </form>
      </React.Fragment>
    )
  }
}
