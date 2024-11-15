import { Box, Group, Text, Pagination, Select } from "@mantine/core";
import { Table } from "@tanstack/react-table";

interface TableFooterProps {
  table: Table<any>;
  primaryColor: string;
  footerLeftSection?: boolean;
  footerRightSection?: boolean;
}

export const TableFooter = ({ 
  table, 
  primaryColor,
  footerLeftSection = true,
  footerRightSection = true
}: TableFooterProps) => {
  return (
    <Box p="md">
      <Group justify="space-between" align="center">
        {footerLeftSection && (
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {table.getSelectedRowModel().rows.length} row(s) selected
            </Text>
            <Text size="sm" c="dimmed">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </Text>
          </Group>
        )}

        {footerRightSection && (
          <Group gap="xs" align="center">
            <Text size="sm">Rows per page</Text>
            <Select
              size="sm"
              w={70}
              value={String(table.getState().pagination.pageSize)}
              onChange={(value) => table.setPageSize(Number(value))}
              data={['5', '10', '20', '50'].map((value) => ({
                value,
                label: value
              }))}
            />
            <Pagination
              value={table.getState().pagination.pageIndex + 1}
              onChange={(page) => table.setPageIndex(page - 1)}
              total={table.getPageCount()}
              color={primaryColor}
              size="sm"
              withEdges
              styles={(theme) => ({
                control: {
                  '&[data-active]': {
                    backgroundColor: primaryColor,
                    color: 'white'
                  }
                }
              })}
            />
          </Group>
        )}
      </Group>
    </Box>
  );
}; 