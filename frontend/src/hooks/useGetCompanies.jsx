import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

                // Retrieve the token from storage
                const token = localStorage.getItem('authToken');

                // Include the token in the request headers
                const res = await axios.get("https://job-hunt-fawn.vercel.app/api/v1/company/getcompany", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
        };

        fetchCompany();
    }, [dispatch]);

    return {};
};

export default useGetCompanies;
