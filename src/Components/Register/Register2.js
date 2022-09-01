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

  const genderDropDownOptions = (
    <ul>
      <li>Male</li>
      <li>Female</li>
      <li>Not Specified</li>
    </ul>
  );
  const handleGenderChange = (e) => {
    console.log(e);
    document.getElementById("genderInput").outerHTML = genderDropDownOptions;
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
    <div>
      <form className="profileContainer" onSubmit={handleSubmit}>
        <h2 style={{ width: "100%" }}>User Profile</h2>
        <div className="inputSection">
          <label htmlFor="name">Username</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="contactNumber">Contact</label>
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
        <div className="inputSection">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            name="gender"
            default="select"
            value={gender}
            id="genderInput"
            onClick={handleGenderChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
