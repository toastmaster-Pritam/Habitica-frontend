import React, { useContext, useEffect, useState } from "react";
import { Context, URL } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const [tasks, setTasks] = useState([]);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${URL}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${URL}/task/mytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.myTasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form action="" onSubmit={SubmitHandler}>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            key={i._id}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
