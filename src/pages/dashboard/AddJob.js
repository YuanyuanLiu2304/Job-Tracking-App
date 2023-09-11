import { FormRow, FormRowSelect } from "../../components";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../assets/wrappers/AddJob";
import {
  handleJobInput,
  clearValues,
  createJob,
  editJob,
} from "../../features/jobSlice";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobLocation || !company || !position) {
      toast.error("please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(
      createJob({
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInput({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleJobInput({ name: "jobLocation", value: user.location }));
    }
  }, []);
  return (
    <Wrapper>
      <div className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="position"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            labelText="company"
            value={company}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleChange}
          />
          <FormRowSelect
            status={jobType}
            name="jobType"
            labelText="job type"
            handleChange={handleChange}
            statusOptions={jobTypeOptions}
          />
          {/* job status and job type */}
          <FormRowSelect
            status={status}
            name="status"
            labelText="status"
            handleChange={handleChange}
            statusOptions={statusOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
