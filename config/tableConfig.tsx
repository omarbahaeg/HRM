import { ActionIcon, Group, Menu, Box, Flex, Avatar, Text, Badge } from "@mantine/core";
import { IconUserCircle, IconSend, IconTrash, IconDotsVertical, IconDotsHorizontal } from "@tabler/icons-react";
import { DetailPanel } from "../components/DetailPanel";
import { ProfileProgress } from "../components/ProfileProgress";
import { filterFns } from '../utils/filters';
import { TableCellRendererProps, TableConfigProps } from './types';
import React from 'react';

// Components
const TableCellRenderer: React.FC<TableCellRendererProps> = ({
  dataType,
  value,
  row,
  columnConfig,
  globalFilter,
  primaryColor,
  getUnitMilliseconds
}) => {
  const wrapContent = (content: React.ReactNode) => (
    <Box sx={{ width: '100%', height: '100%', cursor: 'pointer' }}>
      {content}
    </Box>
  );

  const highlightText = (text: string) => {
    if (!globalFilter || !text) return text;
    
    const parts = String(text).split(new RegExp(`(${globalFilter})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === globalFilter.toLowerCase() ? (
            <Text key={i} span bg="yellow.2" fw={500}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  switch (dataType) {
    case 'text':
      return wrapContent(highlightText(String(value)));
      
    case 'imagebox':
      return wrapContent(
        <Flex align="center" gap="md" sx={{ padding: '8px 0' }}>
          <Avatar 
            src={row.original[columnConfig?.imageboxConfig?.avatarField]} 
            size="md" 
            radius="xl"
          />
          <Box>
            <Text size="sm" fw={500} lineClamp={1}>
              {highlightText(row.original[columnConfig?.imageboxConfig?.labelField])}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {highlightText(row.original[columnConfig?.imageboxConfig?.sublabelField])}
            </Text>
          </Box>
        </Flex>
      );
      
    case 'badge':
      const matchedRule = columnConfig?.badgeConfig?.rules?.find(
        (rule: any) => rule.condition === String(value)
      );
      return wrapContent(
        <Badge 
          color={matchedRule?.color || 'gray'} 
          variant="light"
        >
          {value}
        </Badge>
      );
      
    case 'progress':
      const progressValue = Number(value) || 0;
      const ranges = columnConfig?.progressConfig?.ranges || [];
      let progressColor = primaryColor;

      for (const range of ranges) {
        if (progressValue <= range.value) {
          progressColor = range.color;
          break;
        }
      }

      return (
        <Box>
          <ProfileProgress 
            value={progressValue} 
            color={progressColor}
            sx={{
              '.mantine-Progress-root': {
                width: '100%',
                height: '20px'
              },
              '.mantine-Progress-bar': {
                transition: 'width 0.3s ease'
              },
              '.mantine-Progress-label': {
                color: 'white',
                fontWeight: 500,
                fontSize: '12px',
                position: 'relative',
                zIndex: 1
              }
            }}
          />
        </Box>
      );
      
    case 'date':
      try {
        const date = new Date(value);
        const config = columnConfig?.dateConfig;
        let formattedDate;
        
        if (config?.formatType === 'relative') {
          const rtf = new Intl.RelativeTimeFormat('en', { 
            numeric: config?.useNumbers === 'words' ? 'auto' : 'always' 
          });
          const now = new Date();
          const diff = date.getTime() - now.getTime();
          const unit = config?.timeUnit?.toLowerCase() || 'days';
          const unitValue = Math.round(diff / getUnitMilliseconds(unit));
          formattedDate = rtf.format(unitValue, unit as Intl.RelativeTimeFormatUnit);
        } else {
          const options: Intl.DateTimeFormatOptions = {};
          if (config?.dateStyle !== 'none') {
            options.dateStyle = config?.dateStyle as any;
          }
          if (config?.timeStyle !== 'none') {
            options.timeStyle = config?.timeStyle as any;
          }
          options.hour12 = config?.useAMPM ?? true;
          
          formattedDate = new Intl.DateTimeFormat('en', options).format(date);
        }
        return wrapContent(formattedDate);
      } catch (error) {
        console.error('Error formatting date:', error);
        return wrapContent(value);
      }
      
    default:
      return wrapContent(highlightText(String(value)));
  }
};

const renderRowActionMenuItems = ({ row }: { row: any }) => (
  <>
    <Menu.Item
      leftSection={<IconUserCircle size={16} />}
      onClick={() => {}}
    >
      View Profile
    </Menu.Item>
    <Menu.Item
      leftSection={<IconSend size={16} />}
      onClick={() => {}}
    >
      Send Email
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      leftSection={<IconTrash size={16} />}
      color="red"
      onClick={() => {}}
    >
      Delete
    </Menu.Item>
  </>
);

// Configuration Functions
const createBaseConfig = (props: TableConfigProps) => {
  return {
    columns: props.tableColumns,
    data: props.data,
    enableRowSelection: true,
    enableExpanding: true,
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
      },
      'mrt-row-expand': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
      },
      'mrt-row-actions': {
        size: 40,
        enableResizing: false,
        enableColumnFilter: false,
      },
    },
    renderRowActions: ({ row }) => (
      <Group spacing={4}>
        {props.tableInterface?.actionType === 'More' ? (
          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                {props.tableInterface?.actionMoreConfig?.iconType === 'Vertical' ? (
                  <IconDotsVertical size={16} />
                ) : (
                  <IconDotsHorizontal size={16} />
                )}
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {props.tableInterface?.actionMoreConfig?.menuItems?.map((item, index) => (
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
          <Group gap={props.tableInterface?.actionIconsConfig?.gap || '8px'}>
            {props.tableInterface?.actionIconsConfig?.icons?.map((item, index) => (
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
      </Group>
    ),
    renderDetailPanel: props.enableDetailPanel ? ({ row }) => (
      <DetailPanel
        row={row}
        onApprove={(id) => console.log('Approve:', id)}
        onReject={(id) => console.log('Reject:', id)}
      />
    ) : undefined,
    mantineTableProps: {
      striped: props.enableStriped,
      highlightOnHover: true,
      withBorder: props.showTableBorder,
      borderColor: props.borderColor,
      style: {
        backgroundColor: props.tableBackgroundColor,
      },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => console.log('Row clicked:', row),
      style: {
        backgroundColor: row.getIsSelected()
          ? props.selectedRowBackgroundColor
          : 'inherit',
      },
    }),
  };
};

const createStateConfig = (props: TableConfigProps) => ({
  state: {
    rowSelection: props.rowSelection,
    globalFilter: props.globalFilter,
    isLoading: props.isLoading,
    columnOrder: props.columnOrder,
    columnPinning: {
      left: ['mrt-row-select', 'mrt-row-expand'],
      right: ['mrt-row-actions']
    },
  },
  onRowSelectionChange: props.setRowSelection,
  onGlobalFilterChange: props.setGlobalFilter,
});

const createFeatureConfig = (props: TableConfigProps) => ({
  enablePagination: props.enablePagination,
  enableColumnResizing: props.enableColumnResizing,
  enableRowSelection: props.enableRowSelection,
  enableColumnFilters: props.enableColumnFilters,
  enableGlobalFilter: props.enableGlobalFilter,
  enableDensityToggle: props.enableDensityToggle,
  enableFullScreenToggle: props.enableFullScreenToggle,
  enableColumnVisibilityToggle: props.enableColumnVisibilityToggle,
  enableRowActions: props.enableRowActions,
  enableDetailPanel: props.enableDetailPanel,
  enableColumnDragging: props.enableColumnDragging,
  enableRowOrdering: props.enableRowDragging,
});

const createToolbarConfig = (props: TableConfigProps) => ({
  enableTopToolbar: props.enableTopToolbar,
  enableBottomToolbar: props.enableBottomToolbar,
  renderTopToolbar: props.renderTopToolbar,
  renderBottomToolbar: props.renderBottomToolbar,
});

const createFilterConfig = (props: TableConfigProps) => ({
  filterFns,
  enableFilterMatchHighlighting: true,
  enableColumnFilterModes: props.enableFilterPopover,
  columnFilterDisplayMode: props.filterDisplayMode,
});

const createTableColumns = (
  columns: any[], 
  primaryColor: string, 
  globalFilter: string, 
  getUnitMilliseconds: (unit: string) => number
) => {
  if (!columns || !Array.isArray(columns)) {
    return [];
  }

  return columns.map((column: any) => {
    if (!column || typeof column !== 'object') {
      return null;
    }

    const columnId = String(column.fieldId || column.accessorKey || `column_${Math.random().toString(36).substr(2, 9)}`);

    return {
      id: columnId,
      accessorFn: (row: any) => {
        if (column.staticValue !== undefined) {
          return column.staticValue;
        }
        return row[columnId];
      },
      header: column.title || column.header,
      size: column.size || 200,
      enableResizing: column.enableResizing ?? true,
      enableSorting: column.enableSorting ?? true,
      enableClickToCopy: column.enableClickToCopy ?? false,
      enableColumnFilter: true,
      filterVariant: column.filterVariant || 'text',
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        return React.createElement(TableCellRenderer, {
          dataType: column.dataType,
          value: cell.getValue(),
          row: row,
          columnConfig: column,
          globalFilter: globalFilter,
          primaryColor: primaryColor,
          getUnitMilliseconds: getUnitMilliseconds
        });
      }
    };
  }).filter(Boolean);
};

const createTableConfig = (props: TableConfigProps) => {
  const baseConfig = createBaseConfig(props);
  const stateConfig = createStateConfig(props);
  const featureConfig = createFeatureConfig(props);
  const toolbarConfig = createToolbarConfig(props);
  const filterConfig = createFilterConfig(props);

  return {
    ...baseConfig,
    ...stateConfig,
    ...featureConfig,
    ...toolbarConfig,
    ...filterConfig,
    renderDetailPanel: ({ row }) => (
      <DetailPanel
        row={row}
        onApprove={(id) => console.log('Approve:', id)}
        onReject={(id) => console.log('Reject:', id)}
      />
    ),
    renderRowActionMenuItems,
  };
};

// Exports
export {
  TableCellRenderer,
  createTableColumns,
  createTableConfig,
  createBaseConfig,
  createStateConfig,
  createFeatureConfig,
  createFilterConfig,
  createToolbarConfig,
  type TableCellRendererProps,
  type TableConfigProps
};
