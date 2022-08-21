import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
// import { ThemeContext } from "./context/ThemeContext";
import Intro from "./components/Intro";
import Toggle from "./components/Toggle";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Works from "./components/Works";
import Footer from "./components/Footer";
import { useParams } from "react-router";
import { apiCommon } from "../../../../services/models/CommonModel";
import "./styles/style.css";

const Portfolio = () => {
  const [isLoading, setLoading] = useState(true);
  const [portfolioDetails, setPortfolioDetails] = useState([]);
  // const [darkTheme, setDarkTheme] = useContext(ThemeContext);

  const { id } = useParams();

  useEffect(() => {
    const ac = new AbortController();

    const getPortfolio = async (id) => {
      try {
        apiCommon.getSingle(id, ac.signal, "portfolio").then((portfolio) => {
          setPortfolioDetails(portfolio.message);
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!portfolioDetails.length) getPortfolio(id);
    return () => ac.abort();
  }, [id, portfolioDetails.length]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className={`text-${portfolioDetails.font} bg-{}`}>
            <Toggle />
            {/* <Topbar
              portfolioDetails={portfolioDetails}
              // darkTheme={darkTheme} setDarkTheme={setDarkTheme}
            /> */}
            <Intro portfolioDetails={portfolioDetails} />
            <Projects portfolioDetails={portfolioDetails} />
            <Skills portfolioDetails={portfolioDetails} />
            <Works portfolioDetails={portfolioDetails} />
            <Footer />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Portfolio;