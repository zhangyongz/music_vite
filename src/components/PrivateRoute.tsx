import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setLyricShow, selectUid, setLoginShow } from "@/store/features/users/usersSlice";

interface Props {
  component: React.ComponentType
  needAuth?: boolean,
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  needAuth = false,
  path
}) => {
  const uid = useAppSelector(selectUid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLyricShow(false));
    if (!uid && needAuth) {
      dispatch(setLoginShow(true));
    }
  });

  if (uid || !needAuth) {
    return <RouteComponent />;
  } else {
    return <Navigate to={`/?path=${path}`} replace={true} />;
  }
};