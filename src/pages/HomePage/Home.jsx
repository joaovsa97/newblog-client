import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Button from "../../components/Button/Button.jsx";

import { api } from "../../services/api";
import { AuthContext } from "../../context/authContext.js";
import "./style.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {posts.length < 1 && (
        <>
          <h1>Infelizmente ainda não há publicações 😢</h1>
          {currentUser ? (
            <h1>
              Seja o primeiro a publicar em nosso blog
              <Link to={"/new"}>
                <Button text={"clicando aqui"} />
              </Link>
            </h1>
          ) : (
            <h1>
              Se cadastre ou efetue o login para ser o primeiro a publicar em
              nosso blog
              <Link to={"/login"}>
                <Button text={"clicando aqui"} />
              </Link>
            </h1>
          )}
        </>
      )}
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Link to={`/post/${post._id}`}>
              <div className="card">
                <div className="image">
                  <img src={"http://localhost:8800/" + post.img} alt="" />
                </div>
                <div className="content">
                  <div className="card-header">
                    <h2>{post.title}</h2>
                  </div>
                  <div className="card-body">
                    <div className="desc">
                      <p>{post.summary}</p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <p>
                      <span className="date">
                        <span>
                          publicado em:
                          {format(new Date(post.createdAt), "d/MM/yyyy")}
                          <span> às </span>
                          {format(new Date(post.createdAt), "HH:mm")}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
