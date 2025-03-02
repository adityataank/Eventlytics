import { useNavigate } from "react-router";
import BackArrowIcon from "./ui/icons/back-arrow";

const Back = ({ projectId = "" }: { projectId: string }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (window.history.length > 2) {
      return navigate(-1);
    }
    navigate(`/project/${projectId}`);
  };

  return <BackArrowIcon onClick={onClick} />;
};

export default Back;
