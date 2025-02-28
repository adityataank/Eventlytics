import type { HeaderProps } from "types";
import Dropdown from "./dropdown";
import Logo from "./logo";
import { parseOptions } from "~/lib/utils";
import { useNavigate, useParams } from "react-router";

function Header({ projects = [] }: HeaderProps) {
  const navigate = useNavigate();

  const params = useParams();

  const parsedOptions = parseOptions(projects);

  const changeProject = (projectId: string) =>
    navigate(`/project/${projectId}`);

  return (
    <header className="fixed top-0 h-44 w-full flex flex-col gap-6 items-center justify-center px-6 bg-white shadow-md rounded-b-xl  animate-in slide-in-from-top-[200%] duration-700">
      <Logo />
      <Dropdown
        options={parsedOptions}
        onSelect={changeProject}
        defaultValue={params?.projectId ?? ""}
        placeholder="Select a project"
      />
    </header>
  );
}

export default Header;
