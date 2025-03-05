import { useNavigate } from "react-router";
import BackArrowIcon from "./ui/icons/back-arrow";
import { Analytics } from "~/lib/analytics";

const Back = ({ projectId = "" }: { projectId: string }) => {
  const navigate = useNavigate();

  const onClick = () => {
    Analytics.track("back-click");
    if (window.history.length > 2) {
      return navigate(-1);
    }
    navigate(`/project/${projectId}`);
  };

  return <BackArrowIcon onClick={onClick} />;
};

export default Back;
