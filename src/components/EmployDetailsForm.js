import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
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
		width: 350,
  },
	grid: {
		marginTop: 23,
		color: 'black',
	},
	grid2: {
		marginTop: 8,
		color: 'black',
	},
	datePickeer: {
		width: 350,
		color: 'black',
	},
}));

export default function EmployDetailsForm() {
	const classes = useStyles();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [holidayAllowance, setHolidayAllowance] = useState("");
	const [countries, setCountry] = useState([]);
	const [selectedDate, setSelectedDate] = useState();
	const [selectedCountry, setselectedCountry] = useState("Afghanistan");
	const [maritalStatus, setMaritalStatus] = useState("");
	const [socialInsurence, setSocialInsurence] = useState("");
	const [children, setChildren] = useState("");
	const [workingHours, setWorkingHours] = useState("");

	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then(response => response.json())
  		.then(data => setCountry(data));
	}, []);

  const handleCountryChange = (event) => {
    setselectedCountry(event.target.value);
  }; 

	const formSubmit = (event) => {
		console.log("form is submited");
		let employData = {};
		employData = {
			"first name": firstName,
			"last name": lastName,
			"date of birth": selectedDate,
			"holiday allowance": holidayAllowance,
			"country": selectedCountry,
		};

		if (socialInsurence !== "") {
			employData["social insurence"] =  socialInsurence;
		}
		if (children !== "") {
			employData["children"] =  children;
		}
		if (maritalStatus !== "") {
			employData["marital status"] =  maritalStatus;
		}
		if (workingHours !== "") {
			employData["working hours"] =  workingHours;
		}
		console.log("finalData", employData);
		event.preventDefault();
	}

	const renderHolidayAllowance = (minimum , maximum, message) => {
		return <><TextField
			required
			id="holidayAllowance"
			name="holidayAllowance"
			label="Holiday allowance"
			fullWidth
			InputProps={{
				inputProps: { 
						max: maximum, min: minimum
				}
			}}
			type="number"
			onChange={(e) => setHolidayAllowance(e.target.value)}
		/><span className="holidaymessage">({message})</span></>
	}

	const dateFormatter = str => {
    return str;
  };

	const renderMaritalStatus = () => {
		return <FormControl component="fieldset">
			<FormLabel component="legend">Marital status</FormLabel>
			<RadioGroup aria-label="maritalStatus" name="maritalStatus" value={maritalStatus} onChange={(e)=> {setMaritalStatus(e.target.value)}} row={true}>
				<FormControlLabel value="married" control={<Radio />} label="Married" />
				<FormControlLabel value="unMarried" control={<Radio />} label="Unmarried" />
			</RadioGroup>
		</FormControl>
	}

	const extraFields = () => {
		if (selectedCountry === "Spain") {
			return <>
				<Grid item xs={12} sm={6}>
					{renderHolidayAllowance(30, 365, "min 30 days")}
        </Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="socialNumber"
						name="socialNumber"
						label="Social Insurance Number"
						fullWidth
						type="number"
						onChange={(e) => setSocialInsurence(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{renderMaritalStatus()}
				</Grid>
			</>
		} else if (selectedCountry === "Ghana") {
			return <>
				<Grid item xs={12} sm={6}>
					{renderHolidayAllowance(0, 365, "No laws on holiday allowance")}
        </Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="children"
						name="children"
						label="Number Of Children"
						fullWidth
						type="number"
						onChange={(e) => setChildren(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{renderMaritalStatus()}
				</Grid>
			</>
		} else if (selectedCountry === "Brazil") {
			return <>
				<Grid item xs={12} sm={6}>
					{renderHolidayAllowance(0, 40, "max 40 days")}
        </Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="workingHours"
						name="workingHours"
						label="Working Hours"
						fullWidth
						type="number"
						onChange={(e) => setWorkingHours(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}></Grid>
			</>
		} else {
			return <Grid item xs={12} sm={6}>
				{renderHolidayAllowance(0, 365, "No holiday allowance limit")}
			</Grid>
		}
	}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employ Details
      </Typography>
			<form className={""} onSubmit={formSubmit} method="post">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
						onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
						onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
				<Grid item xs={12} sm={6} className={selectedDate ? classes.grid : classes.grid2}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							required
							label={selectedDate ? "" : "Date of birth"}
							value={selectedDate}
							onChange={setSelectedDate}
							className={classes.datePickeer}
							rifmFormatter={dateFormatter}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Country</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedCountry}
								onChange={handleCountryChange}
							>
								{countries.map((d)=> {
									return <MenuItem value={d.name}>{d.name}</MenuItem>
								})}
							</Select>
					</FormControl>
        </Grid>
				{extraFields()}
				<Grid item xs={12}></Grid>
				<Grid item xs={12} sm={6}>
					<Button
							type="reset"
							variant="contained"
							className="ButtonStyle"
						>
            Reset
          </Button>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
							type="submit"
							variant="contained"
							color="primary"
							className="ButtonStyle"
						>
            Submit Details
          </Button>
				</Grid>
      </Grid>
			</form>
    </React.Fragment>
  );
}