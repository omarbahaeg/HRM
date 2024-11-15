import { Menu, Button, Box } from '@mantine/core';
import { 
  IconDownload,
  IconFileTypePdf, // For PDF
  IconFileSpreadsheet, // For Excel
  IconFileTypeCsv, // For CSV
  IconFileCode2 // For JSON
} from '@tabler/icons-react';
import React from 'react';

interface ExportMenuProps {
  type: 'all' | 'selected';
  selectedCount?: number;
  onExport: (format: string) => void;
  allowedFormats: string[];
}

export const ExportMenu = ({ 
  type, 
  selectedCount = 0, 
  onExport,
  allowedFormats 
}: ExportMenuProps) => {
  const isSelected = type === 'selected';
  const isDisabled = isSelected && selectedCount === 0;
  
  return (
    <Menu shadow="md" width={170}>
      <Menu.Target>
        <Button
          leftSection={
            isSelected ? (
              <Box 
                style={{
                  backgroundColor: isDisabled ? "#f8f9fa" : "#006e28",
                  color: isDisabled ? "#adb5bd" : "white",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "14px",
                  fontWeight: 600,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                {selectedCount}
              </Box>
            ) : (
              <IconDownload size={18} />
            )
          }
          radius="xl"
          disabled={isDisabled}
          color={!isSelected ? "custom-green" : undefined}
          variant={isSelected ? "outline" : "filled"}
          styles={(theme) => ({
            root: {
              paddingLeft: isSelected ? 5 : undefined,
              borderColor: isSelected ? (isDisabled ? "transparent" : "#006e28") : undefined,
              color: isSelected ? (isDisabled ? theme.colors.gray[5] : "inherit") : undefined,
              backgroundColor: !isSelected ? "#006e28" : undefined,
              transition: "background-color 0.2s ease",
              "&:not(:disabled):hover": {
                backgroundColor: !isSelected ? theme.colors["custom-green"][7] : undefined
              }
            }
          })}
        >
          {type === 'all' ? 'Export All Data' : 'Selected Rows'}
        </Button>
      </Menu.Target>

      <Menu.Dropdown style={{ borderRadius: '10px' }}>
        <Menu.Label>Choose Format</Menu.Label>
        {allowedFormats.includes('pdf') && (
          <Menu.Item 
            leftSection={<IconFileTypePdf size={18} stroke={1.5} />}
            onClick={() => onExport('pdf')}
          >
            Export as PDF
          </Menu.Item>
        )}
        {allowedFormats.includes('excel') && (
          <Menu.Item 
            leftSection={<IconFileSpreadsheet size={18} stroke={1.5} />}
            onClick={() => onExport('excel')}
          >
            Export as Excel
          </Menu.Item>
        )}
        {allowedFormats.includes('csv') && (
          <Menu.Item 
            leftSection={<IconFileTypeCsv size={18} stroke={1.5} />}
            onClick={() => onExport('csv')}
          >
            Export as CSV
          </Menu.Item>
        )}
        {allowedFormats.includes('json') && (
          <Menu.Item 
            leftSection={<IconFileCode2 size={18} stroke={1.5} />}
            onClick={() => onExport('json')}
          >
            Export as JSON
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};