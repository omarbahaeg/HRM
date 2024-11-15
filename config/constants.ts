export const DEFAULT_VALUES = {
  PRIMARY_COLOR: '#198754',
  BACKGROUND_COLOR: 'transparent',
  HOVER_COLOR: '#f8fafc',
  BORDER_COLOR: '#e5e7eb',
  ROWS_PER_PAGE: 10,
  SEARCH_PLACEHOLDER: 'Search...',
  NO_DATA_TEXT: 'No records to display',
  NO_RESULTS_TEXT: 'No matching records found',
};

export const DEFAULT_TABLE_LAYOUT = {
  header: true,
  headerLeftSection: true,
  headerRightSection: true,
  footer: true,
  footerLeftSection: true,
  footerRightSection: true,
};

export const DEFAULT_TABLE_INTERFACE = {
  exportDataConfig: {
    gap: '8px',
    exportAllData: true,
    selectedRows: true,
    exportTypes: ['pdf', 'excel', 'csv', 'json']
  },
  searchToggleVisibility: true,
  searchToggle: true,
  filterToggleVisibility: true,
  filterToggle: true,
  filterType: 'Default' as 'Default' | 'Popover',
  columnVisibility: true,
  densityToggle: true,
  densityType: 'Medium' as 'Small' | 'Medium' | 'Large',
  fullScreenToggle: true,
  alertBanner: true,
  pagination: true,
  rowsPerPage: [5, 10, 25, 50, 100],
  searchPlaceholder: 'Search...',
  gap: 'xs',
  selected: true,
  expand: true,
  actions: true,
  actionType: 'More' as 'More' | 'Icons',
  actionMoreConfig: {
    iconType: 'Vertical' as 'Vertical' | 'Horizontal',
    menuItems: []
  },
  actionIconsConfig: {
    gap: '8px',
    icons: []
  },
  bodyLayout: {
    selected: true,
    expand: true,
    actions: true,
    actionType: 'More',
    actionMoreConfig: {
      iconType: 'Vertical',
      menuItems: []
    },
    actionIconsConfig: {
      gap: '8px',
      icons: []
    }
  }
};

export const DEFAULT_BODY_LAYOUT = {
  selected: true,
  expand: true,
  actions: true,
  actionType: 'More' as const,
  actionMoreConfig: {
    iconType: 'Vertical' as const,
    menuItems: []
  },
  actionIconsConfig: {
    gap: '8px',
    icons: []
  }
};

export const DEFAULT_TABLE_OPTIONS = {
  rowHover: true,
  rowNumbers: false,
  tableBorder: false,
  columnBorder: true,
  rowBorder: true,
  stripesRow: false,
  rowDragging: false,
  columnDragging: false,
  rowResizing: false,
  columnResizing: false
};

export const THEME_COLORS = [
  '#e6f2ec',
  '#cce6d9',
  '#b3d9c6',
  '#99ccb3',
  '#80bfa0',
  '#66b28d',
  '#4da67a',
  '#339967',
  '#198754',
];

export const DEFAULT_EXPORT_TYPES = ['pdf', 'excel', 'csv', 'json'];
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

export const DEFAULT_DRAG_CONTROLS = {
  dragHandle: true,
  dragHandlePosition: 'start' as const
}; 