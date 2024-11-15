// Table Props Types
export interface VSHTableProps {
  // UI Props
  className?: string;
  style?: React.CSSProperties;
  primaryColor?: string;
  
  // Toolbar Props
  showTopToolbar?: boolean;
  showBottomToolbar?: boolean;
  showTableBorder?: boolean;
  showSearchBox?: boolean;
  searchPlaceholder?: string;
  gap?: string;
  
  // Text Props
  noDataText?: string;
  noResultsText?: string;
  
  // Feature Flags
  enablePagination?: boolean;
  enableColumnResizing?: boolean;
  enableRowSelection?: boolean;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  enableDensityToggle?: boolean;
  enableFullScreenToggle?: boolean;
  enableColumnVisibilityToggle?: boolean;
  enableRowActions?: boolean;
  enableDetailPanel?: boolean;
  enableStriped?: boolean;
  enableHover?: boolean;
  enableExport?: boolean;
  enableColumnDragging?: boolean;
  enableFilterPopover?: boolean;
  enableRowDragging?: boolean;
  
  // Style Props
  tableBackgroundColor?: string;
  headerBackgroundColor?: string;
  rowBackgroundColor?: string;
  hoverBackgroundColor?: string;
  selectedRowBackgroundColor?: string;
  borderColor?: string;
  
  // Pagination Props
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  
  // Export Props
  exportTypes?: string[];
  
  // Column Props
  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  filterDisplayMode?: 'popover' | 'subheader';
  filterVariant?: string;
  dragControls?: {
    dragHandle: boolean;
    dragHandlePosition: 'start' | 'end';
  };
  
  // Data Props
  data?: any[];
  columns?: any[];
  selectedColumns?: string[];
  fields?: string[];
  columnOptions?: any[];
  
  // Event Handlers
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selection: any) => void;
  onExport?: (format: string, type: string, data: any[]) => void;
  onColumnOrderChange?: (order: string[]) => void;
  onRowOrderChange?: (oldIndex: number, newIndex: number, data: any[]) => void;
  
  // Table Layout Types
  tableLayout: TableLayoutProps;
  tableInterface: TableInterfaceProps;
  bodyLayout: BodyLayoutProps;
  tableOptions: TableOptionsProps;
  
  // Table Layout Props
  header?: boolean;
  headerLeftSection?: boolean;
  headerRightSection?: boolean;
  footer?: boolean;
  footerLeftSection?: boolean;
  footerRightSection?: boolean;
  tableInterface?: {
    searchToggleVisibility?: boolean;
    searchToggle?: boolean;
    filterToggleVisibility?: boolean;
    filterToggle?: boolean;
    columnVisibility?: boolean;
    densityToggle?: boolean;
    fullScreenToggle?: boolean;
    densityType?: 'Small' | 'Medium' | 'Large';
    searchPlaceholder?: string;
    gap?: string;
    selected?: boolean;
    expand?: boolean;
    actions?: boolean;
    actionType?: 'More' | 'Icons';
    actionMoreConfig?: {
      iconType: 'Vertical' | 'Horizontal';
      menuItems: Array<{
        label: string;
        icon: string;
        action: string;
      }>;
    };
    actionIconsConfig?: {
      gap: string;
      icons: Array<{
        icon: string;
        action: string;
      }>;
    };
  };
}

// Table State Types
export interface TableState {
  rowSelection: Record<string, boolean>;
  globalFilter: string;
  isLoading: boolean;
  tableData: any[];
  currentColumnOrder: string[];
}

// Cell Renderer Types
export interface TableCellRendererProps {
  dataType: string;
  value: any;
  row: any;
  columnConfig: any;
  globalFilter: string;
  primaryColor: string;
  getUnitMilliseconds: (unit: string) => number;
}

// Table Layout Types
export interface TableLayoutProps {
  header: boolean;
  headerLeftSection: boolean;
  headerRightSection: boolean;
  footer: boolean;
  footerLeftSection: boolean;
  footerRightSection: boolean;
}

// Export Data Config Types
export interface ExportDataConfigProps {
  gap: string;
  exportAllData: boolean;
  selectedRows: boolean;
  exportTypes: string[];
}

// Table Interface Types
export interface TableInterfaceProps {
  exportDataConfig: ExportDataConfigProps;
  searchToggleVisibility: boolean;
  searchToggle: boolean;
  filterToggleVisibility: boolean;
  filterToggle: boolean;
  filterType: 'Default' | 'Popover';
  columnVisibility: boolean;
  densityToggle: boolean;
  densityType: 'Small' | 'Medium' | 'Large';
  fullScreenToggle: boolean;
  alertBanner: boolean;
  pagination: boolean;
  rowsPerPage: number[];
  selected?: boolean;
  expand?: boolean;
  actions?: boolean;
  actionType?: 'More' | 'Icons';
  actionMoreConfig?: {
    iconType: 'Vertical' | 'Horizontal';
    menuItems: Array<{
      label: string;
      icon: string;
      action: string;
    }>;
  };
  actionIconsConfig?: {
    gap: string;
    icons: Array<{
      icon: string;
      action: string;
    }>;
  };
  bodyLayout?: {
    selected?: boolean;
    expand?: boolean;
    actions?: boolean;
    actionType?: 'More' | 'Icons';
    actionMoreConfig?: {
      iconType: 'Vertical' | 'Horizontal';
      menuItems: Array<{
        label: string;
        icon: string;
        action: string;
      }>;
    };
    actionIconsConfig?: {
      gap: string;
      icons: Array<{
        icon: string;
        action: string;
      }>;
    };
  };
}

// Action Config Types
export interface MenuItemProps {
  label: string;
  icon: string;
  action: string;
}

export interface ActionIconProps {
  icon: string;
  action: string;
}

export interface ActionMoreConfigProps {
  iconType: 'Vertical' | 'Horizontal';
  menuItems: MenuItemProps[];
}

export interface ActionIconsConfigProps {
  gap: string;
  icons: ActionIconProps[];
}

// Body Layout Types
export interface BodyLayoutProps {
  selected: boolean;
  expand: boolean;
  actions: boolean;
  actionType: 'More' | 'Icons';
  actionMoreConfig: ActionMoreConfigProps;
  actionIconsConfig: ActionIconsConfigProps;
}

// Table Options Types
export interface TableOptionsProps {
  rowHover: boolean;
  rowNumbers: boolean;
  tableBorder: boolean;
  columnBorder: boolean;
  rowBorder: boolean;
  stripesRow: boolean;
  rowDragging: boolean;
  columnDragging: boolean;
  rowResizing: boolean;
  columnResizing: boolean;
}

export interface TableConfigProps {
  // تعريف الخصائص بشكل مباشر
  header?: boolean;
  headerLeftSection?: boolean;
  headerRightSection?: boolean;
  footer?: boolean;
  footerLeftSection?: boolean;
  footerRightSection?: boolean;
  
  // ... باقي الخصائص
  handleExport?: (format: string, type: string) => void;
}
