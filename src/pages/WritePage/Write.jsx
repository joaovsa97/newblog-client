import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as filestack from "filestack-js";
import ReactQuill from "react-quill";
import Button from "../../components/Button/Button.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

import { api } from "../../services/api.js";

import "react-quill/dist/quill.snow.css";
import "./style.scss";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];


const Write = (props) => {
  const { client } = props

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileURL = await client.upload(file[0]);

      const obj = {
        title: title,
        summary: summary,
        desc: desc,
        file: fileURL.url,
      };
      await api.post("/post/new", obj).then(navigate("/"));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="postFormContainer">
      {isLoading && <Spinner message={"Finalizando sua postagem..."} />}
      <form action="" className="postForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título da postagem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="summary"
          placeholder="Subtítulo da postagem"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files)}
          required
        />
        <ReactQuill
          modules={modules}
          formats={formats}
          value={desc}
          onChange={(newValue) => setDesc(newValue)}
          required
        />
        <Button text={"Publicar postagem"} />
      </form>
    </div>
  );
};

export default Write;
