import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { api } from "../../services/api.js";
import Button from "../../components/Button/Button.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

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

const EditPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [oldFile, setOldFile] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostById = async () => {
      const res = await api.get(`/post/${id}`);
      const postData = res.data;
      setTitle(postData[0].title);
      setSummary(postData[0].summary);
      setDesc(postData[0].desc);
      setOldFile(postData[0].img)
    };
    getPostById();
  }, []);

  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file[0]);
      const res = await api.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fileURL = await handleUpload();
      const obj = {
        title: title,
        summary: summary,
        desc: desc,
        file: fileURL,
        oldFile: oldFile
      };
      await api.put(`/post/update/${id}`, obj).then(navigate("/post/" + id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="postFormContainer">
      {isLoading && <Spinner message={"Aplicando alterações à sua postagem..."}/>}
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

export default EditPage;
