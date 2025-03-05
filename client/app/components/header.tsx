import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Dropdown from "./dropdown";
import Logo from "./logo";

import { parseOptions } from "~/lib/utils";
import { Analytics } from "~/lib/analytics";

import type { HeaderProps } from "types";

function Header({ projects = [] }: HeaderProps) {
  const navigate = useNavigate();

  const params = useParams();

  const parsedOptions = parseOptions(projects);

  useLayoutEffect(() => {
    Analytics.track("page-visit", { page_name: "dashboard" });
  }, []);

  const changeProject = (projectId: string) => {
    const projectName = parsedOptions.find(
      (project) => project?.value === projectId
    )?.label;
    Analytics.track("project-change", { name: projectName });
    navigate(`/project/${projectId}`);
  };

  return (
    <header className="fixed top-0 h-44 w-full flex flex-col gap-6 items-center justify-center px-6 bg-white shadow-md rounded-b-xl animate-in slide-in-from-top-[200%] duration-700 md:flex-row md:h-24 md:rounded-b-none md:justify-between md:px-12">
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
