import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Sidebar from "../Dashbord/sidebarAdmin";
import DashboardContent from "../Dashbord/dashContenu";
import { useHistory } from "react-router-dom";
import Notifications from "../notification/Notifications";
import Tous from "../statique/tous";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState("Tous");
  const history = useHistory();

  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_A");
    localStorage.removeItem("role");
    localStorage.removeItem("adminData");
    localStorage.removeItem("isLoggedIn");
    history.push("/login");
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Grid container style={{ margin: 0, height: "100%" }}>
        <Grid item xs={9} md={2} style={{ height: "100%", overflowY: "auto" }}>
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        </Grid>
        <Grid item xs={10} md={10} style={{ height: "100%", overflowY: "auto" }}>
          <div style={{ width: "100%", height: "100%", overflowX: "hidden", overflowY: "hidden" }}>
            <DashboardContent selectedContent={selectedContent} />
            <Notifications />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
