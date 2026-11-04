import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
}

function Contenedor({ clase = "container", children }: Props) {
  return (
    <div className={clase}>
      {children}
    </div>
  );
}

export default Contenedor;
