import { Box, Group, TextInput, ActionIcon } from "@mantine/core";
import { Table } from "@tanstack/react-table";
import { 
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton 
} from "mantine-react-table";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ExportMenu } from "./ExportMenu";
import { useState, useEffect } from 'react';

interface TableHeaderProps {
  table: Table<any>;
  headerLeftSection?: boolean;
  headerRightSection?: boolean;
  showSearchBox?: boolean;
  searchPlaceholder?: string;
  primaryColor?: string;
  handleExportWrapper: (type: string, format: string) => void;
  searchToggleVisibility?: boolean;
  searchToggle?: boolean;
  filterToggleVisibility?: boolean;
  filterToggle?: boolean;
  columnVisibility?: boolean;
  densityToggle?: boolean;
  fullScreenToggle?: boolean;
  gap?: number;
  filterType?: "Default" | "Popover";
  densityType?: "Small" | "Medium" | "Large";
  exportDataConfig: {
    gap: number;
    exportAllData: boolean;
    selectedRows: boolean;
    exportTypes: string[];
  };
}

export const TableHeader = ({ 
  table,
  headerLeftSection = true,
  headerRightSection = true,
  showSearchBox = true,
  searchPlaceholder = "Search...",
  primaryColor = '#006e28',
  handleExportWrapper,
  searchToggleVisibility = true,
  searchToggle = true,
  filterToggleVisibility = true,
  filterToggle = true,
  columnVisibility = true,
  densityToggle = true,
  fullScreenToggle = true,
  gap = 8,
  exportDataConfig = {
    gap: 8,
    exportAllData: true,
    selectedRows: true,
    exportTypes: ["pdf", "excel", "csv", "json"]
  },
}: TableHeaderProps) => {
  const [showSearch, setShowSearch] = useState(searchToggle);
  const [showFilters, setShowFilters] = useState(filterToggle);
  const selectedRows = table.getSelectedRowModel().rows.length;
  const searchValue = table.getState().globalFilter;

  useEffect(() => {
    setShowSearch(searchToggle);
    table.setShowGlobalFilter(searchToggle);
  }, [searchToggle, table]);

  useEffect(() => {
    setShowFilters(filterToggle);
    table.setShowColumnFilters(filterToggle);
  }, [filterToggle, table]);

  useEffect(() => {
    console.log('exportDataConfig changed:', exportDataConfig);
  }, [exportDataConfig]);

  const handleDensityChange = () => {
    const currentDensity = table.getState().density;
    let newDensity: 'xs' | 'md' | 'lg';

    switch (currentDensity) {
      case 'xs':
        newDensity = 'md';
        break;
      case 'md':
        newDensity = 'lg';
        break;
      default:
        newDensity = 'xs';
    }

    table.setDensity(newDensity);
  };

  console.log('Header ExportDataConfig:', exportDataConfig);
  console.log('TableHeader Props:', { exportDataConfig });

  return (
    <Box p="md">
      <Group justify="space-between" align="center">
        {headerLeftSection && (
          <Group gap={exportDataConfig.gap}>
            {exportDataConfig.exportAllData && (
              <ExportMenu
                type="all"
                onExport={(format) => handleExportWrapper('all', format)}
                allowedFormats={exportDataConfig.exportTypes}
              />
            )}
            {exportDataConfig.selectedRows && (
              <ExportMenu
                type="selected"
                selectedCount={selectedRows}
                onExport={(format) => handleExportWrapper('selected', format)}
                allowedFormats={exportDataConfig.exportTypes}
              />
            )}
          </Group>
        )}

        {headerRightSection && (
          <Group gap={gap}>
            {showSearchBox && showSearch && (
              <TextInput
                placeholder={searchPlaceholder}
                value={searchValue ?? ''}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                leftSection={<IconSearch size={16} />}
                rightSection={searchValue ? (
                  <ActionIcon 
                    variant="subtle" 
                    color="gray" 
                    onClick={() => table.setGlobalFilter('')}
                    size="sm"
                  >
                    <IconX size={14} />
                  </ActionIcon>
                ) : null}
                size="sm"
                w={260}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: 'transparent !important',
                    border: '1px solid #ccc !important',
                    transition: 'border-color 0.2s ease !important',
                    '&:hover': {
                      borderColor: '#666 !important'
                    },
                    '&:focus': {
                      borderColor: `${primaryColor} !important`,
                      outline: 'none !important'
                    }
                  }
                }}
              />
            )}
            {searchToggleVisibility && (
              <MRT_ToggleGlobalFilterButton 
                table={table}
                onClick={() => {
                  const newState = !showSearch;
                  setShowSearch(newState);
                  table.setShowGlobalFilter(newState);
                }}
              />
            )}
            {filterToggleVisibility && (
              <MRT_ToggleFiltersButton 
                table={table}
                onClick={() => {
                  const newState = !showFilters;
                  setShowFilters(newState);
                  table.setShowColumnFilters(newState);
                }}
              />
            )}
            {columnVisibility && (
              <MRT_ShowHideColumnsButton table={table} />
            )}
            {densityToggle && (
              <MRT_ToggleDensePaddingButton table={table} />
            )}
            {fullScreenToggle && (
              <MRT_ToggleFullScreenButton table={table} />
            )}
          </Group>
        )}
      </Group>
    </Box>
  );
};
