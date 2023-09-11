import Wrapper from "../assets/wrappers/StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { useSelector } from "react-redux";

const StatContainer = () => {
  const { stats } = useSelector((store) => store.jobs);

  const defaultStats = [
    {
      title: "pending application",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <section className="stat-container">
      {defaultStats.map((stat, index) => {
        return (
          <Wrapper key={index} color={stat.color} bcg={stat.bcg}>
            <header>
              <span className="count">{stat.count}</span>
              <span className="icon">{stat.icon}</span>
            </header>
            <h5 className="title">{stat.title}</h5>
          </Wrapper>
        );
      })}
    </section>
  );
};

export default StatContainer;
