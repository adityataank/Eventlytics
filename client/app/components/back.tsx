import { useNavigate } from "react-router";
import BackArrowIcon from "./ui/icons/back-arrow";

const Back = () => {
  const navigate = useNavigate();

  const onClick = () => navigate(-1);

  return <BackArrowIcon onClick={onClick} />;
};

export default Back;
