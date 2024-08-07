import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { server } from '@/utils/constant'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
                const token = localStorage.getItem('authToken'); // Adjust to your method of storing tokens
                const response = await axios.get(`${server}/api/v1/job/getadminjobs`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Adjust token type if needed
                    }
                });
                if (response.data.success) { 
                    dispatch(setAdminJobs(response.data.jobs));
                }
            } catch (error) {
                console.error("Failed to fetch admin jobs:", error);
            }
        };

        fetchAdminJobs();
    }, [dispatch]);

    return {};
};

export default useGetAllAdminJobs;
