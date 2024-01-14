import { React, useEffect } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";
import Chart from "../components/Chart";
import InfoCards from "../components/InfoCards";
import Widget from "../components/Widget";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import { fetchUserStatistic } from "../actions/users";

const Home = (props) => {
  useEffect(() => {
    const userLS = getLocalStorage("user");
    const userSS = getSessionStorage("user");
    if (!userLS && !userSS) {
      window.location.href = "/";
    }

    props.fetchUserStatistic();
  }, []);

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <InfoCards />
        <Chart
          title="Novi korisnički nalozi"
          data={props.userStatistics}
          y="total"
          x="name"
          marginX={3}
        />
        <Widget />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userStatistics: state.statistics.users,
  };
};

export default connect(mapStateToProps, { fetchUserStatistic })(Home);
