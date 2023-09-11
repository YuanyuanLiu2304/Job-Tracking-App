import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { handleSearch, clearFilters } from "../features/allJobsSlice";
const JobSearchContainer = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    search,
    jobSearchStatus,
    jobSearchType,
    sort,
    sortOptions,
  } = useSelector((store) => store.jobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const [typeSearch, setTypeSearch] = useState("");

  const debounce = () => {
    let id;
    return (e) => {
      setTypeSearch(e.target.value);
      clearTimeout(id);
      id = setTimeout(() => {
        dispatch(handleSearch({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleChange = (e) => {
    dispatch(handleSearch({ name: e.target.name, value: e.target.value }));
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            labelText="search"
            value={typeSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect
            name="jobSearchStatus"
            status={jobSearchStatus}
            labelText="status"
            handleChange={handleChange}
            statusOptions={["all", ...statusOptions]}
          />
          <FormRowSelect
            name="jobSearchType"
            status={jobSearchType}
            labelText="type"
            handleChange={handleChange}
            statusOptions={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            status={sort}
            labelText="sort"
            handleChange={handleChange}
            statusOptions={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => dispatch(clearFilters())}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default JobSearchContainer;
