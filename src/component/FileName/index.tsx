import React from "react";

interface FileNameProps {
  name: string;
}

const FileName: React.FC<FileNameProps> = ({ name }) => {
  return <div style={{ background: "black", color: "white" }}>{name}</div>;
};

export default FileName;

(FileName as any).isMDXComponent = true;
