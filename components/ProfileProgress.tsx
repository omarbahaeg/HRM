import { Progress, Text, Box } from '@mantine/core';

interface ProfileProgressProps {
  value: number;
  color?: string;
}

export const ProfileProgress = ({ value, color = '#006e28' }: ProfileProgressProps) => {
  return (
    <Box style={{ width: '150px' }}>
      <Text size="sm" mb={5}>{value}%</Text>
      <Progress 
        value={value} 
        color={color}
        radius="xl"
        size="sm"
      />
    </Box>
  );
};