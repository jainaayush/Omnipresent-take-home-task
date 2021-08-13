import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InfoForm() {
	const classes = useStyles();
	
	const [selectedCountry, setselectedCountry] = useState("Algeria");
	const [country, setCountry] = useState([]);
	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then(response => response.json())
  		.then(data => setCountry(data));
	}, []);

  const handleCountryChange = (event) => {
    setselectedCountry(event.target.value);
  };

	const formSubmit = (event) => {
		event.preventDefault();
		console.log("form is submited");
		
		
		//console.log(finalData);
	}
	//console.log(finalData);
	
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employ Details
      </Typography>
			<form className={""} onSubmit={formSubmit} >
      <Grid container spacing={3}>
				<Grid item xs={12}>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Country Of Work</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedCountry}
								onChange={handleCountryChange}
							>
								{country.map((d)=> {
									return <MenuItem value={d.name}>{d.name}</MenuItem>
								})}
							</Select>
					</FormControl>
        </Grid>
              </Grid>
			</form>
    </React.Fragment>
  );
}