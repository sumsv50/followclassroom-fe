import { useContext } from 'react';
import { UserRoleContext } from '../contexts';

function useUserRole() {
  const { userRole, setUserRole } = useContext(UserRoleContext);
  return { userRole, setUserRole };
}

export { useUserRole }