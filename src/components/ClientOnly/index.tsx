import * as React from "react";

type Props = {
  children: React.ReactNode;
  loader?: React.ReactNode;
};

const ClientOnly = ({ children, loader = null }: Props) => {
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
