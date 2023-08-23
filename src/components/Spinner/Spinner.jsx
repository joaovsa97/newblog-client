import loading from "../../assets/Loading.svg";
import "./style.scss";

const Spinner = (props) => {
  const { message } = props;
  return (
    <div>
      <div className="loadingSpinnerContainer">
        <img src={loading} alt="Loading Spinner" />

        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default Spinner;
