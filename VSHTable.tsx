import { useMemo, useState, useEffect } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MantineProvider, Box, Group, ActionIcon, Menu } from "@mantine/core";
import styles from './styles/VSHTable.module.css';
import { createTableColumns, } from './config/tableConfig';
import { DEFAULT_VALUES,  DEFAULT_TABLE_LAYOUT, DEFAULT_TABLE_INTERFACE, DEFAULT_BODY_LAYOUT, THEME_COLORS } from './config/constants';
import type { VSHTableProps, TableState } from './config/types';
import { IconDotsVertical, IconDotsHorizontal } from "@tabler/icons-react";
import { TableFooter } from './components/TableFooter';
import { TableHeader } from './components/TableHeader';
import { Checkbox } from '@mantine/core';

export const VSHTable: React.FC<VSHTableProps> = ({ 
  // UI Props
  className,
  style,
  primaryColor = DEFAULT_VALUES.PRIMARY_COLOR,
  
  // Table Layout Props - نستخدم القيم من tableLayout مباشرة
  tableLayout = DEFAULT_TABLE_LAYOUT,
  
  // Data Props
  data = [],
  columns: userColumns,
  
  onExport,
  onColumnOrderChange,
  onRowOrderChange,
  footerLeftSection = true,
  footerRightSection = true,
  showSearchBox,
  tableInterface = DEFAULT_TABLE_INTERFACE,
  bodyLayout = DEFAULT_BODY_LAYOUT,
}) => {
  // تحويل قيم tableLayout.topbarConfig إلى القيم المناسبة
  const {
    gap: topbarGap = 8,
    searchPlaceholder = "Search...",
    searchToggle = true,
    filterToggle = true,
    columnVisibility = true,
    densityToggle = true,
    fullScreenToggle = true,
    searchToggleVisibility = true,
    filterToggleVisibility = true,
    filterType = "Default",
    densityType = "Medium",
    exportDataConfig = {
      gap: 8,
      exportAllData: true,
      selectedRows: true,
      exportTypes: ["pdf", "excel", "csv", "json"]
    }
  } = tableLayout?.topbarConfig || {};

  // تحويل densityType إلى القيمة المناسبة
  const getDensityValue = (type: string): 'xs' | 'md' | 'lg' => {
    switch (type.toLowerCase()) {
      case 'small': return 'xs';
      case 'large': return 'lg';
      default: return 'md';
    }
  };

  const initialDensity = getDensityValue(densityType);

  // State Management
  const [tableState, setTableState] = useState<TableState>({
    rowSelection: {},
    globalFilter: '',
    isLoading: false,
    tableData: data,
    currentColumnOrder: []
  });

  // تحويل الأعمدة باستخدام createTableColumns
  const processedColumns = useMemo(() => 
    createTableColumns(
      userColumns,
      primaryColor,
      tableState.globalFilter,
      (unit: string) => 0 // يمكنك تنفيذ getUnitMilliseconds هنا
    ),
    [userColumns, primaryColor, tableState.globalFilter]
  );

  const handleExportWrapper = (type: string, format: string) => {
    if (onExport) {
      onExport(format, type, data);
    }
  };

  // تجهيز الأعمدة مع إضافة الأعمدة الخاصة
  const columns = useMemo(() => {
    const specialColumns = [];
    
    // إضافة عمود Select
    if (tableInterface.fields?.selected) {
      specialColumns.push({
        id: 'mrt-row-select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
      });
    }

    // إضافة عمود Expand
    if (tableInterface.fields?.expand) {
      specialColumns.push({
        id: 'mrt-row-expand',
        header: '',
        cell: ({ row }) => (
          <ActionIcon
            onClick={row.getToggleExpandedHandler()}
            variant="subtle"
            color="gray"
          >
            {row.getIsExpanded() ? '-' : '+'}
          </ActionIcon>
        ),
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
      });
    }

    // دمج الأعمدة الخاصة مع الأعمدة العادية
    return [...specialColumns, ...userColumns];
  }, [userColumns, tableInterface.fields]);

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: bodyLayout?.selected ?? true,
    enableExpanding: bodyLayout?.expand ?? true,
    enableRowActions: bodyLayout?.actions ?? true,
    
    // تكوين عمود Actions
    renderRowActions: ({ row }) => {
      if (!bodyLayout?.actions) return null;
      
      return (
        <Box>
          {bodyLayout?.actionType === 'More' ? (
            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  {bodyLayout?.actionMoreConfig?.iconType === 'Vertical' ? (
                    <IconDotsVertical size={16} />
                  ) : (
                    <IconDotsHorizontal size={16} />
                  )}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {bodyLayout?.actionMoreConfig?.menuItems?.map((item, index) => (
                  <Menu.Item
                    key={index}
                    leftSection={item.icon}
                    onClick={() => {
                      if (item.action && typeof window[item.action] === 'function') {
                        window[item.action](row.original);
                      }
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group gap={bodyLayout?.actionIconsConfig?.gap || '8px'}>
              {bodyLayout?.actionIconsConfig?.icons?.map((item, index) => (
                <ActionIcon
                  key={index}
                  onClick={() => {
                    if (item.action && typeof window[item.action] === 'function') {
                      window[item.action](row.original);
                    }
                  }}
                >
                  {item.icon}
                </ActionIcon>
              ))}
            </Group>
          )}
        </Box>
      );
    },

    // تكوين DetailPanel
    renderDetailPanel: bodyLayout?.expand ? ({ row }) => (
      <Box p="md">
        <pre>{JSON.stringify(row.original, null, 2)}</pre>
      </Box>
    ) : undefined,

    // تكوين الجدول
    tableColumns: [...processedColumns] || [],  // تأكد من أن tableColumns موجود
    data: tableState.tableData || [],            // تأكد من أن tableData موجود
    
    // State Management
    rowSelection: tableState.rowSelection,
    setRowSelection: (selection) => 
      setTableState(prev => ({ ...prev, rowSelection: selection })),
    globalFilter: tableState.globalFilter,
    setGlobalFilter: (filter) => 
      setTableState(prev => ({ ...prev, globalFilter: filter })),
    isLoading: tableState.isLoading,
    
    // Layout Controls
    showTopToolbar: true,
    showBottomToolbar: true,
    showHeaderLeftSection: true,
    showHeaderRightSection: true,
    showFooterLeftSection: footerLeftSection,
    showFooterRightSection: footerRightSection,
    
    // Interface Controls
    exportConfig: DEFAULT_TABLE_INTERFACE.exportDataConfig,
    searchToggleVisibility: true,
    searchToggle: true,
    filterToggleVisibility: true,
    filterToggle: true,
    filterType: 'Default',
    columnVisibility: true,
    densityToggle: true,
    fullScreenToggle: true,
    alertBanner: true,
    pagination: true,
    rowsPerPage: [10, 25, 50, 100],
    
    // Event Handlers
    handleExport: onExport,
    onColumnOrderChange: onColumnOrderChange,
    onRowOrderChange: onRowOrderChange,
    
    // Other Props
    primaryColor: primaryColor,
    density: initialDensity,
    columnOrder: tableState.currentColumnOrder,
    
    // Feature Flags
    enablePagination: true,
    enableColumnResizing: true,
    enableRowSelection: bodyLayout?.selected ?? true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnVisibilityToggle: true,
    enableRowActions: bodyLayout?.actions ?? true,
    enableDetailPanel: false,
    enableColumnDragging: false,
    enableFilterPopover: true,
    enableRowDragging: false,
    enableExpanding: bodyLayout?.expand ?? true,

    // نستخدم قيم tableLayout مباشرة
    enableTopToolbar: tableLayout.header,
    renderTopToolbar: ({ table }) => (
      <TableHeader 
        table={table}
        headerLeftSection={tableLayout?.headerLeftSection}
        headerRightSection={tableLayout?.headerRightSection}
        handleExportWrapper={handleExportWrapper}
        exportDataConfig={exportDataConfig}
        searchPlaceholder={searchPlaceholder}
        gap={topbarGap}
        showSearchBox={showSearchBox}
        searchToggleVisibility={searchToggleVisibility}
        searchToggle={searchToggle}
        filterToggleVisibility={filterToggleVisibility}
        filterToggle={filterToggle}
        columnVisibility={columnVisibility}
        densityToggle={densityToggle}
        fullScreenToggle={fullScreenToggle}
        primaryColor={primaryColor}
        filterType={filterType}
        densityType={densityType}
      />
    ),

    // تكوين الشريط السفلي
    enableBottomToolbar: tableLayout.footer,
    renderBottomToolbar: ({ table }) => (
      <TableFooter 
        table={table} 
        primaryColor={primaryColor}
        footerLeftSection={tableLayout.footerLeftSection ?? footerLeftSection}
        footerRightSection={tableLayout.footerRightSection ?? footerRightSection}
      />
    ),

    // تحديث إعدادات الترقيم
    paginationDisplayMode: 'pages',
    positionPagination: 'bottom',
    mantinePaginationProps: {
      showRowsPerPage: true,
      withEdges: true,
      boundaries: 1,
      size: 'sm',
      radius: 'sm',
      withControls: true,
      getItemProps: (page: number) => ({
        style: {
          backgroundColor: table.getState().pagination.pageIndex === page ? primaryColor : undefined,
          color: table.getState().pagination.pageIndex === page ? 'white' : undefined,
          border: 'none'
        }
      })
    },
    mantineRowsPerPageProps: {
      size: 'sm',
      style: {
        borderRadius: '4px',
        border: '1px solid #dee2e6',
        paddingRight: '8px',
        paddingLeft: '8px'
      }
    },

    // إضافة تكوين الفلتر
    enableColumnFilters: true,
    enableFilters: true,
    enableColumnFilterModes: true,
    columnFilterDisplayMode: filterType === 'Popover' ? 'popover' : 'subheader',
    initialState: { showColumnFilters: true },
    mantineFilterSelectProps: {
      withinPortal: true,
    },
    mantineTableHeadCellProps: {
      sx: {
        '.mantine-ActionIcon-root': {
          color: 'gray'
        }
      }
    },

    // تحديث تكوين الأعمدة
    columns: [...processedColumns].map(column => {
      const baseColumn = {
        ...column,
        enableColumnFilter: true,
        enableColumnFilterModes: true,
      };

      // تخصيص filterVariant حسب نوع العمود
      switch (column.dataType) {
        case 'date':
          return {
            ...baseColumn,
            filterVariant: 'date-range',
            filterFn: 'betweenInclusive',
          };
        
        case 'number':
        case 'progress':
          return {
            ...baseColumn,
            filterVariant: 'range',
            filterFn: 'betweenInclusive',
          };
        
        case 'select':
        case 'badge':
          return {
            ...baseColumn,
            filterVariant: 'select',
            filterSelectOptions: column.filterOptions || [],
            filterFn: 'equals',
          };
        
        default:
          return {
            ...baseColumn,
            filterVariant: 'text',
            filterFn: 'fuzzy',
            columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith', 'endsWith'],
          };
      }
    }),

    // تعريف دوال الفلترة
    filterFns: {
      fuzzy: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        return String(value)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      },
      contains: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        return String(value)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      },
      startsWith: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        return String(value)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase());
      },
      endsWith: (row, columnId, filterValue) => {
        const value = row.getValue(columnId);
        return String(value)
          .toLowerCase()
          .endsWith(String(filterValue).toLowerCase());
      },
      betweenInclusive: (row, columnId, filterValues) => {
        const value = row.getValue(columnId);
        const min = filterValues[0];
        const max = filterValues[1];
        return value >= min && value <= max;
      }
    },

    // إضافة تكوين Density
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
      withBorder: true,
      // تحويل قيم Density إلى القيم المناسبة
      verticalSpacing: tableInterface.densityType?.toLowerCase() === 'small' 
        ? 'xs'
        : tableInterface.densityType?.toLowerCase() === 'large'
          ? 'lg'
          : 'md',
    },

    // تكوين عمود Actions
    renderRowActions: ({ row }) => {
      if (!bodyLayout?.actions) return null;
      
      return (
        <Box>
          {bodyLayout?.actionType === 'More' ? (
            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  {bodyLayout?.actionMoreConfig?.iconType === 'Vertical' ? (
                    <IconDotsVertical size={16} />
                  ) : (
                    <IconDotsHorizontal size={16} />
                  )}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {bodyLayout?.actionMoreConfig?.menuItems?.map((item, index) => (
                  <Menu.Item
                    key={index}
                    leftSection={item.icon}
                    onClick={() => {
                      if (item.action && typeof window[item.action] === 'function') {
                        window[item.action](row.original);
                      }
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group gap={bodyLayout?.actionIconsConfig?.gap || '8px'}>
              {bodyLayout?.actionIconsConfig?.icons?.map((item, index) => (
                <ActionIcon
                  key={index}
                  onClick={() => {
                    if (item.action && typeof window[item.action] === 'function') {
                      window[item.action](row.original);
                    }
                  }}
                >
                  {item.icon}
                </ActionIcon>
              ))}
            </Group>
          )}
        </Box>
      );
    },

    // تكوين عمود Expand
    renderDetailPanel: bodyLayout?.expand ? ({ row }) => (
      <Box p="md">
        <pre>{JSON.stringify(row.original, null, 2)}</pre>
      </Box>
    ) : undefined,

    // تكوين الأعمدة الخاصة
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
        visibilityMode: 'remove',
      },
      'mrt-row-expand': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
        visibilityMode: 'remove',
      },
      'mrt-row-actions': {
        size: 100,
        enableResizing: false,
        enableColumnFilter: false,
        visibilityMode: 'remove',
      },
    },

    // تحديد تريب وتثبيت الأعمدة
    enableColumnPinning: false,
    enableColumnOrdering: true,
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
        enablePinning: true,
        enableColumnActions: false,
        enableColumnDragging: false,
        enableColumnOrdering: false,
        grow: false,
      },
      'mrt-row-expand': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
        enablePinning: true,
        enableColumnActions: false,
        enableColumnDragging: false,
        enableColumnOrdering: false,
        grow: false,
      },
      'mrt-row-actions': {
        size: 75,
        enableResizing: false,
        enableColumnFilter: false,
        enablePinning: true,
        enableColumnActions: false,
        enableColumnDragging: false,
        enableColumnOrdering: false,
        grow: false,
      },
    },

    // تكوين الحالة الأولية مع ترتيب وتثبيت الأعمدة
    initialState: {
      columnPinning: {
        left: ['mrt-row-select', 'mrt-row-expand'],
        right: ['mrt-row-actions']
      },
      columnOrder: [
        'mrt-row-select',
        'mrt-row-expand',
        ...userColumns.map(col => col.id || col.accessorKey),
        'mrt-row-actions'
      ],
      showColumnFilters: true,
      showGlobalFilter: true,
      showRowActions: true,
      columnVisibility: {
        'mrt-row-select': bodyLayout?.selected ?? true,
        'mrt-row-expand': bodyLayout?.expand ?? true,
        'mrt-row-actions': bodyLayout?.actions ?? true,
      },
    },

    // تطبيق نوع الفلتر
    enableFilterMatchHighlighting: true,
    enableColumnFilterModes: filterType === 'Popover',
  });

  // إضاف useEffect لمراقبة تغييرات densityType بعد تهيئة table
  useEffect(() => {
    table.setDensity(getDensityValue(densityType));
  }, [densityType]);

  // إضافة useEffect لمراقبة تغييرات tableLayout
  useEffect(() => {
    console.log('tableLayout changed:', tableLayout);
  }, [tableLayout]);

  // Theme Configuration
  const theme = {
    primaryColor: 'custom-green',
    colors: {
      'custom-green': [...THEME_COLORS, primaryColor],
    },
  };

  return (
    <div className={`${styles.appContainer} ${className || ''}`} style={style}>
      <MantineProvider theme={theme}>
        <div className={styles.tableContainer}>
          <MantineReactTable table={table} />
        </div>
      </MantineProvider>
    </div>
  );
};
export type { VSHTableProps };
