import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { InputLabel, MenuItem, Select, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Validation from "../../Validation/Validation";
import PropTypes from "prop-types";
import { clearError, register } from "../../ActionCreators/loginActionData";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("female");
  const [language, setLanguage] = useState("hindi");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dateDOB, setDateDOB] = useState("");
  const [monthDOB, setMonthDOB] = useState("");
  const [yearDOB, setYearDOB] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [terms, setTerms] = useState("no");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleGender = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };
  const handleLanguage = (event, newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleTerms = (e) => {
    setTerms(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = {
      name,
      email,
      password,
      contactNumber,
      gender,
      language,
      maritalStatus,
      dateDOB,
      monthDOB,
      yearDOB,
      birthTime,
      terms,
    };
    const validationErrors = Validation(inputs);
    console.log(validationErrors);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      const dateOfBirth = dateDOB + "/" + monthDOB + "/" + yearDOB;
      register({
        name,
        email,
        password,
        contactNumber,
        gender,
        language,
        maritalStatus,
        dateOfBirth,
        birthTime,
      });
      handleOpen(true);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div style={{ display: "flex", border: "2px solid red", width: "100%" }}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Congratulation
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, display: "flex" }}
            >
              User Profile Updated Successfully
            </Typography>
          </Box>
        </Modal>
      </div>
      <form className="profileContainer" onSubmit={handleSubmit}>
        <h2>User Profile</h2>
        <div className="inputSection">
          <div>Username</div>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter name here"
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            {errors.name && <p className="validationErrors">{errors.name}</p>}
          </div>
        </div>
        <div className="inputSection">
          <div>E-mail</div>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Your email ID"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {errors.email && <p className="validationErrors">{errors.email}</p>}
          </div>
        </div>
        <div className="inputSection">
          <div>Password</div>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Min 8 char"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {errors.password && (
              <p className="validationErrors">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="inputSection">
          <div>Phone Number</div>
          <input
            type="text"
            name="contactNumber"
            value={contactNumber}
            placeholder="Enter mobile no"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <div>
            {errors.contactNumber && (
              <p className="validationErrors">{errors.contactNumber}</p>
            )}
          </div>
        </div>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleGender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <div>
          Language
          <ToggleButtonGroup
            color="primary"
            value={language}
            exclusive
            onChange={handleLanguage}
          >
            <ToggleButton value="hindi">Hindi</ToggleButton>
            <ToggleButton value="english">English</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="inputSection">
          Marital Status
          <Box
            sx={{
              width: 150,
              maxHeight: 40,
              // border: "2px solid blue",
              outline: "none",
            }}
          >
            <FormControl
              hiddenLabel
              sx={{ width: "100%", position: "relative" }}
            >
              <Select
                sx={{ height: 35, width: 150 }}
                value={maritalStatus}
                label="marital"
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <MenuItem value={"married"}>Married</MenuItem>
                <MenuItem value={"unmarried"}>Unmarried</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            {errors.maritalStatus && (
              <p className="validationErrors">{errors.maritalStatus}</p>
            )}
          </div>
        </div>
        <div className="inputSection">
          Date of Birth
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxHeight: 35,
              // border: "2px solid blue",
              outline: "none",
            }}
          >
            <FormControl
              hiddenLabel
              sx={{ width: "100%", position: "relative" }}
            >
              <InputLabel id="demo-simple-select-label">DD</InputLabel>
              <Select
                sx={{ height: 35, width: 90 }}
                value={dateDOB}
                label="dateDOB"
                onChange={(e) => setDateDOB(e.target.value)}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              hiddenLabel
              sx={{ width: "100%", position: "relative" }}
            >
              <InputLabel id="demo-simple-select-label">MM</InputLabel>
              <Select
                sx={{ height: 35, width: 90 }}
                value={monthDOB}
                label="monthDOB"
                onChange={(e) => setMonthDOB(e.target.value)}
              >
                <MenuItem value={"1"}>Jan</MenuItem>
                <MenuItem value={"2"}>Feb</MenuItem>
                <MenuItem value={"3"}>Mar</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              hiddenLabel
              sx={{ width: "100%", position: "relative" }}
            >
              <InputLabel id="demo-simple-select-label">YYYY</InputLabel>
              <Select
                sx={{ height: 35, width: 90 }}
                value={yearDOB}
                label="yearDOB"
                onChange={(e) => setYearDOB(e.target.value)}
              >
                <MenuItem value={"1990"}>1990</MenuItem>
                <MenuItem value={"1991"}>1991</MenuItem>
                <MenuItem value={"1992"}>1992</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            {errors.dateOfBirth && (
              <p className="validationErrors">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>
        <div className="inputSection" style={{ display: "inline-block" }}>
          Time of Birth
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              {/* <MobileTimePicker
              label="For mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            /> */}
              <DesktopTimePicker
                label="For desktop"
                value={birthTime}
                onChange={(newValue) => {
                  setBirthTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <div>
            {errors.birthTime && (
              <p className="validationErrors">{errors.birthTime}</p>
            )}
          </div>
        </div>
        <div>
          <Radio
            checked={terms === "yes"}
            onChange={handleTerms}
            value="yes"
            name="radio-buttons"
            inputProps={{ "aria-label": "yes" }}
          />{" "}
          I accept the terms and privacy policy
          <div>
            {errors.terms && <p className="validationErrors">{errors.terms}</p>}
          </div>
        </div>
        <input
          type="submit"
          value="Save"
          className="loginInputSection"
          id="registerSave"
        />
        <input
          type="button"
          value="Feed"
          className="loginInputSection"
          id="registerFeed"
          onClick={() => navigate("/")}
        />
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string,
  // isRegistered: PropTypes.bool,
  // clearError: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  // errorMessage: state.login.errorMessage,
  // isRegistered: state.login.isRegistered,
  // isLoading: state.login.loading,
});

export default connect(mapStateToProps, { register, clearError })(Register);
