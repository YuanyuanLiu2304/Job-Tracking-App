import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { getAllJobs, changePage } from "../features/allJobsSlice";
import Job from "./Job";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const JobsContainer = () => {
  const dispatch = useDispatch();

  const {
    jobs,
    isLoading,
    numOfPages,
    totalJobs,
    page,
    search,
    jobSearchStatus,
    jobSearchType,
    sort,
  } = useSelector((store) => store.jobs);

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, jobSearchStatus, jobSearchType, sort]);

  const next = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prev = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {totalJobs} job{totalJobs > 1 && "s"} found
      </h2>
      <div className="jobs">
        {" "}
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>

      {numOfPages >= 1 && (
        <section className="pageBtn-container">
          <button className="prev-btn" onClick={prev}>
            <HiChevronDoubleLeft /> prev
          </button>
          <div className="btn-container">
            {pages.map((pageNumber) => {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                  onClick={() => dispatch(changePage(pageNumber))}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button className="next-btn" onClick={next}>
            next
            <HiChevronDoubleRight />
          </button>
        </section>
      )}
    </Wrapper>
  );
};

export default JobsContainer;
