import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
  alHacerClic?: () => void;
}

function Boton({ clase = "btn btn-custom-action", children, alHacerClic }: Props) {
  return (
    <button type="button" className={clase} onClick={alHacerClic}>
      {children}
    </button>
  );
}

export default Boton;
