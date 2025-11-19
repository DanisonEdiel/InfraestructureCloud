
export interface menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

// Elementos del sidebar principal (dashboard)
const sidebarItem: menu[] = [
  { header: 'Inicio' },
  {
    title: 'Inicio',
    icon: 'si:projects-fill',
    to: 'post-create',
  },
  {
    title: 'Lista de Publicaciones',
    icon: 'tdesign:file-teams',
    to: 'post-list',
  },
];

export default sidebarItem;
