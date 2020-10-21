export interface NzMenu {
  inlineCollapsed?: boolean;
  inlineIndent?: number;
  mode?: 'vertical' | 'horizontal' | 'inline';
  selectable?: boolean;
  theme?: 'light' | 'dark';
  data?: (NzSubMenu | NzMenuItem)[];
}

export interface NzSubMenu {
  open?: boolean;
  disabled?: boolean;
  title?: string;
  icon?: string;
  menuClassName?: string;
  children?: NzMenuItem[];
}

export interface NzMenuItem {
  disabled?: boolean;
  selected?: boolean;
  matchRouter: boolean;
  matchRouterExact?: boolean;
  name?: string;
  icon?: string;
  link?: string;
}
