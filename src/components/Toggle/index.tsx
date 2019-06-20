import * as React from "react";

type Arg = {
  open: boolean;
  onToggle: () => void;
};

type Props = {
  children: (arg: Arg) => React.ReactNode;
  initial?: boolean;
};

const Toggle = ({ children, initial }: Props) => {
  const [open, setOpen] = React.useState(Boolean(initial));

  return children({
    open,
    // @ts-ignore: this is just BS
    onToggle: React.useCallback(() => setOpen(o => !o), []),
  });
};

export default Toggle;
