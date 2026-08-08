"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type MenuState = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const MenuContext = createContext<MenuState>({
  open: false,
  toggle: () => {},
  close: () => {},
});

export const useMenu = () => useContext(MenuContext);

/**
 * Open state of the slide-in navigation.
 *
 * It lives above both consumers because two separate controls drive it: the
 * round burger, which is fixed to the viewport, and the "Menu" text button in
 * the header top bar, which the reference shows in place of the inline links
 * on small screens.
 */
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, toggle, close }), [open, toggle, close]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}