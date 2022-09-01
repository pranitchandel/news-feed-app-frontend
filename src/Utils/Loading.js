import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import UserLoading from "../Components/Loading/Loading";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Loading = ({ loading }) => {
  return (
    <div>
      {loading ? (
        // <Box sx={{ width: "100%" }}>
        //   <LinearProgress />
        // </Box>
        <div style={{ height: "5px" }}>
          <UserLoading />
        </div>
      ) : (
        <div style={{ height: "5px" }}></div>
      )}
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.login.loading,
});

export default connect(mapStateToProps, {})(Loading);
