import { useState, useEffect } from "react";

let height = 1;

export default function usePanelStack(open: boolean) {
  const [state, setState] = useState(height);

  useEffect(() => {
    if (open) {
      setState(height++);
    } else {
      height = Math.max(height - 1, 0);
      setState(height);
    }
  }, [open]);

  return state;
}
