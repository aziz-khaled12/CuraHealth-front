import { useSelector } from "react-redux";

const useHasPermission = (permission) => {
  const { permissions } = useSelector((state) => state.auth);
  
  console.log("Permissions in useHasPermission:", permissions);

  return permissions.includes(permission);
};

export default useHasPermission;
