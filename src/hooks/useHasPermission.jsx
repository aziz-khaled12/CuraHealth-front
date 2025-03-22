import { useSelector } from "react-redux";

const useHasPermission = (permission) => {
  const user = useSelector((state) => state.auth.user);
  
  return user?.permissions.includes(permission);
};

export default useHasPermission;
