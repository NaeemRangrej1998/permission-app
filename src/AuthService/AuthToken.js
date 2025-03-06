import { useSelector } from "react-redux";

const useAuthToken = () => {
    const { token } = useSelector(state => state.auth);
    return token;
};

export default useAuthToken;
