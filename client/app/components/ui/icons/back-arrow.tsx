import { ArrowLeft } from "lucide-react";

const BackArrowIcon = ({ onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="w-fit p-2 rounded-full cursor-pointer transition-colors hover:bg-gray-200"
    >
      <ArrowLeft />
    </div>
  );
};

export default BackArrowIcon;
