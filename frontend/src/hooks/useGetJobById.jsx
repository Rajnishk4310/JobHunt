import { setSingleJobById } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { server } from '@/utils/constant'

const useGetJobById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${server}/api/v1/job/${id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
        }
      } catch (error) {
        console.log("Error occurred while fetching Job details", error);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, dispatch]);
};

export default useGetJobById;
