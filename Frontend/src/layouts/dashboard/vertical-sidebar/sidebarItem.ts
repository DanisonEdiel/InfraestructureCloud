
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
    title: 'Publicaciones',
    icon: 'si:dashboard-duotone',
    to: 'dashboard',
  },
  { header: 'General' },
  {
    title: 'Lista de Publicaciones',
    icon: 'tdesign:file-teams',
    to: 'post-list',
  },
  {
    title: 'Crear publicación',
    icon: 'si:projects-fill',
    to: 'post-create',
  },
];

/**
 * Filtra los elementos del sidebar según los permisos del usuario
 * @param items Elementos del sidebar
 * @param userPermissions Permisos del usuario
 * @returns Elementos filtrados según los permisos
 */
export default sidebarItem;
