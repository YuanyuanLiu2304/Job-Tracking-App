import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import { deleteJob, setEditJob } from "../features/jobSlice";
const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position} </h5>
          <p> {company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <div className="job-info">
            <span className="icon">
              <FaLocationArrow />
            </span>
            <span className="text">{jobLocation}</span>
          </div>
          <div className="job-info">
            <span className="icon">
              <FaCalendarAlt />
            </span>
            <span className="text">{createdAt.toString().slice(0, 10)}</span>
          </div>
          <div className="job-info">
            <span className="icon">
              <FaBriefcase />
            </span>
            <span className="text">{jobType}</span>
          </div>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/dashboard/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    status,
                    jobType,
                  })
                )
              }
            >
              edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
