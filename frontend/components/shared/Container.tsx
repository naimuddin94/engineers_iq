import { TChildrenProps } from "@/types";

function Container({ children }: TChildrenProps) {
  return <section className="px-6">{children}</section>;
}

export default Container;
