import * as React from "react";

type Props = {
  children: React.ReactNode;
  loader?: React.ReactNode;
};

// @ts-ignore: Really no idea what's his problem
const ClientOnly: React.FunctionComponent<Props> = ({ children, loader = null }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return loader;
  }

  return children;
};

export default ClientOnly;
