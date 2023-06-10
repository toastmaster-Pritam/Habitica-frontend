import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  // const [refresh, setRefresh] = useState(false);

  // console.log(user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  // useEffect(() => {
  //   toast.success("welcome!");
  //   setRefresh(prev=>!prev)
  // }, [refresh]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
