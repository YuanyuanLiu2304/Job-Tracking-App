import { showStats } from "../../features/allJobsSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChartsContainer, Loading, StatContainer } from "../../components";

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector((store) => store.jobs);

  useEffect(() => {
    dispatch(showStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatContainer />

      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
