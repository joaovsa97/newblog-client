import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import { api } from "../../services/api";
import { AuthContext } from "../../context/authContext";
import * as filestack from "filestack-js";

import Button from "../../components/Button/Button.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./style.scss";

const PostPage = (props) => {
  const { client } = props

  const navigate = useNavigate();
  const { id } = useParams();
  const [info, setInfo] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/post/${id}`);
        setInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (info[0].img) {
      await client
        .remove(info[0].img.split("/")[3])
        .then(await api.delete(`/post/delete/${id}`))
        .then(navigate("/"));
    } else {
      console.log(info[0].img);
    }
  };

  return (
    <div>
      {!info && <Spinner message={"Carregando..."} />}
      {info &&
        info.map((post) => {
          return (
            <div className="post" key={post._id}>
              <div className="header">
                <div className="userinfo">
                  <div className="title">
                    <h1>{post.title}</h1>
                  </div>
                  <span>
                    Publicado por: <b>{post.userId.username}</b>
                  </span>
                  <p>
                    {format(new Date(post.createdAt), "dd/MM/yyyy")}
                    <span> às </span>
                    {format(new Date(post.createdAt), "HH:mm")}
                  </p>
                  {currentUser && currentUser.id === post.userId._id && (
                    <div className="action-btn">
                      <Link to={`/post/update/` + post._id}>
                        <Button text={"Editar Publicação"} />
                      </Link>
                      <button onClick={() => handleDelete()}>
                        Excluir Publicação
                      </button>
                    </div>
                  )}
                </div>
                <div className="image">
                  <img src={post.img} alt="" />
                </div>
              </div>
              <div className="content">
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                ></p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostPage;
