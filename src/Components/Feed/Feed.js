import logo from "../../Images/blank-profile-picture-973460__340.webp";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

import { logout } from "../../ActionCreators/loginActionData";
import { getfilteredNews } from "../../ActionCreators/newsActionData";
import Loading from "../Loading/Loading";

const Feed = ({
  getfilteredNews,
  filteredNews,
  filteredMsg,
  isAuthenticated,
  currentUser,
  logout,
}) => {
  const navigate = useNavigate();
  const [allNews, setAllNews] = useState([]);
  const currentTime = new Date().getTime();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const handleSortByOpen = () => setSortByOpen(true);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleClose = () => {
    setSortByOpen(false);
    setFilterOpen(false);
  };
  const [filterCategory, setFilterCategory] = useState("technology");
  const [authorState, setAuthorState] = useState({
    SteveJobs: false,
    Matt: false,
    Christian: false,
  });
  const [techState, setTechState] = useState({
    TECH: false,
    UI: false,
    DESIGN: false,
  });
  const { SteveJobs, Matt, Christian } = authorState;
  const { TECH, UI, DESIGN } = techState;

  useEffect(() => {
    setFilterCategory(authorFilter);
  }, [authorState]);

  useEffect(() => {
    setFilterCategory(technologyFilter);
  }, [techState]);

  const handleAuthorChange = (event) => {
    setAuthorState({
      ...authorState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTechChange = (event) => {
    setTechState({
      ...techState,
      [event.target.name]: event.target.checked,
    });
  };

  const rootUrl = "https://news-feed-app-backend.onrender.com";
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

  useEffect(async () => {
    await axios
      .get(`${rootUrl}/api/news/all`)
      .then((res) => setAllNews(res.data.news))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let tempArr = allNews;
    if (sortBy) {
      tempArr.sort((a, b) => {
        let date1 = new Date(a.postTime).getTime();
        let date2 = new Date(b.postTime).getTime();
        return date2 - date1;
      });
    } else {
      tempArr.sort((a, b) => {
        let date1 = new Date(a.postTime).getTime();
        let date2 = new Date(b.postTime).getTime();
        return date1 - date2;
      });
    }
    setAllNews(tempArr);
  }, [sortBy]);

  useEffect(() => {
    setAllNews(filteredNews);
  }, [filteredNews]);

  const handleLoginNavigate = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleApply = () => {
    getfilteredNews(authorState, techState);
    handleClose(true);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  const authorFilter = (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={SteveJobs}
                onChange={handleAuthorChange}
                name="SteveJobs"
              />
            }
            label="Steve Jobs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Matt}
                onChange={handleAuthorChange}
                name="Matt"
              />
            }
            label="Matt"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Christian}
                onChange={handleAuthorChange}
                name="Christian"
              />
            }
            label="Christian"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );

  const technologyFilter = (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={TECH}
                onChange={handleTechChange}
                name="TECH"
              />
            }
            label="Tech"
          />
          <FormControlLabel
            control={
              <Checkbox checked={UI} onChange={handleTechChange} name="UI" />
            }
            label="UI"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={DESIGN}
                onChange={handleTechChange}
                name="DESIGN"
              />
            }
            label="Design"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* <Loading /> */}
      <div className="feedContainer">
        <div>
          {isAuthenticated ? (
            <div style={{ display: "flex" }}>
              <img className="feedUserImage" src={logo} alt="sample" />

              <div className="profileBtn">
                <span style={{ fontWeight: "bold" }}>Welcome</span>{" "}
                <span
                  onClick={handleRegister}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {" "}
                  {currentUser !== null ? currentUser.name : ""}
                </span>
              </div>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <img className="feedUserImage" src={logo} alt="sample" />
              <div className="profileBtn">
                <span style={{ fontWeight: "bold" }}>Welcome</span>{" "}
                <span
                  onClick={handleRegister}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {" "}
                  User
                </span>
              </div>
              <button className="logoutBtn" onClick={handleLoginNavigate}>
                Login
              </button>
            </div>
          )}
        </div>
        <div className="feedFilters">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="searchBar"
          />
          <div>
            <Button onClick={handleSortByOpen}>Sort by</Button>
            <Modal
              open={sortByOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Sort By
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, display: "flex" }}
                >
                  <div
                    style={
                      sortBy === true
                        ? {
                            backgroundColor: "grey",
                            color: "white",
                            width: "100%",
                            cursor: "pointer",
                            borderRadius: 5,
                            paddingLeft: 5,
                          }
                        : { width: "100%", cursor: "pointer" }
                    }
                    onClick={() => {
                      setSortBy(!sortBy);
                      // setSortByOpen(false);
                    }}
                  >
                    Most Recent
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>

          <div>
            <Button onClick={handleFilterOpen}>Filter</Button>
            <Modal
              open={filterOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Filter By
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, display: "flex" }}
                >
                  <div>
                    <div
                      className="feedFilter"
                      onClick={() => setFilterCategory(technologyFilter)}
                    >
                      Technology
                    </div>
                    <div
                      className="feedFilter"
                      onClick={() => setFilterCategory(authorFilter)}
                    >
                      Author
                    </div>
                  </div>
                  <div>
                    <div>{filterCategory}</div>
                    <div>
                      <input
                        type="button"
                        value="Reset"
                        onClick={() => {
                          setAuthorState({
                            SteveJobs: false,
                            Matt: false,
                            Christian: false,
                          });
                          setTechState({
                            TECH: false,
                            UI: false,
                            DESIGN: false,
                          });
                        }}
                      />
                      <input
                        type="button"
                        value="Apply"
                        onClick={handleApply}
                      />
                    </div>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="newSectionContainer">
          {allNews.map((news, key) => {
            let postTime = new Date(news.postTime).getTime();
            let timeDifference = currentTime - postTime;
            let daysDifference = Math.floor(
              timeDifference / 1000 / 60 / 60 / 24
            );
            let hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);
            let minutesDifference = Math.floor(timeDifference / 1000 / 60);
            return (
              <div key={key} className="newsSection">
                <div>
                  <img
                    src={news.imageUrl}
                    className="feedImage"
                    onError={(event) => {
                      event.target.src =
                        "https://www.legacylitbooks.com/wp-content/uploads/2017/07/missingbook.png?fit=480%2C720";
                      event.onerror = null;
                    }}
                  />
                </div>
                <div
                  style={{
                    overflow: "auto",
                    width: "100%",
                    height: "115px",
                  }}
                >
                  <div>
                    {news.newsType}
                    <span className="postTime">
                      {daysDifference !== 0
                        ? `${daysDifference} days ago`
                        : hoursDifference !== 0
                        ? `${hoursDifference} hours ago`
                        : `${minutesDifference} minutes ago`}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      width: "100%",
                    }}
                  >
                    {news.content}
                  </div>
                  <div
                    style={{
                      color: "black",
                      fontSize: "small",
                      position: "absolute",
                      bottom: "1.5%",
                      width: "100%",
                      fontWeight: "bold",
                      backgroundColor: "rgba(255, 255, 255)",
                      letterSpacing: "0.3px",
                      borderRadius: "3px",
                      padding: "2px",
                    }}
                  >
                    by {news.author}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Feed.propTyes = {
  getfilteredNews: PropTypes.func.isRequired,
  filteredNews: PropTypes.array,
  filteredMsg: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  filteredNews: state.news.filteredNews,
  filteredMsg: state.news.filteredMsg,
  isAuthenticated: state.login.isAuthenticated,
  currentUser: state.login.user,
});
export default connect(mapStateToProps, { getfilteredNews, logout })(Feed);
