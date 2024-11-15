import { Box, Text, Title, Button, Grid, Badge, Group, Paper, List } from '@mantine/core';
import { IconFileText, IconShield, IconCertificate } from '@tabler/icons-react';
import { Employee } from '../types/employee';

interface DetailPanelProps {
  row: { original: Employee };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

interface DocumentProps {
  icon: React.ReactNode;
  title: string;
  status: 'verified' | 'pending' | 'rejected';
  date: string;
}

const Document = ({ icon, title, status, date }: DocumentProps) => (
  <Paper p="md" withBorder style={{ marginBottom: 10 }}>
    <Group>
      {icon}
      <Box style={{ flex: 1 }}>
        <Text size="sm" fw={500}>{title}</Text>
        <Text size="xs" c="dimmed">Uploaded: {date}</Text>
      </Box>
      <Badge 
        color={status === 'verified' ? 'green' : status === 'pending' ? 'yellow' : 'red'}
        variant="light"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </Group>
  </Paper>
);

export const DetailPanel = ({ row, onApprove, onReject }: DetailPanelProps) => {
  return (
    <Box p="xl" style={{ background: '#f8fafc' }}>
      <Grid>
        <Grid.Col span={4}>
          <Box style={{ textAlign: 'center' }}>
            <img
              alt="avatar"
              src={row.original.avatar}
              style={{ 
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Title order={3} mt="md">{row.original.firstName} {row.original.lastName}</Title>
            <Text c="dimmed">{row.original.specialization}</Text>
          </Box>
        </Grid.Col>
        
        <Grid.Col span={4}>
          <Box>
            <Text fw={500} mb={5}>License Number</Text>
            <Badge variant="light" color="blue" size="lg">{row.original.licenseNumber}</Badge>
          </Box>
          
          <Box mt="md">
            <Text fw={500} mb={5}>Education</Text>
            <Text>{row.original.education}</Text>
          </Box>
          
          <Box mt="md">
            <Text fw={500} mb={5}>Experience</Text>
            <Text>{row.original.experience}</Text>
          </Box>

          <Box mt="md">
            <Text fw={500} mb={5}>Bio</Text>
            <Text>{row.original.bio}</Text>
          </Box>
          
          <Box mt="md">
            <Text fw={500} mb={5}>Address</Text>
            <Text>{row.original.address}</Text>
          </Box>
          
          <Box mt="xl">
            <Button.Group>
              <Button
                color="green"
                onClick={() => onApprove(row.original.licenseNumber)}
                disabled={row.original.status === 'Approved'}
                style={{ backgroundColor: '#006e28' }}
              >
                Approve
              </Button>
              <Button
                color="red"
                onClick={() => onReject(row.original.licenseNumber)}
                disabled={row.original.status === 'Rejected'}
              >
                Reject
              </Button>
            </Button.Group>
          </Box>
        </Grid.Col>

        <Grid.Col span={4}>
          <Box>
            <Title order={4} mb="md">Documents</Title>
            
            <Document
              icon={<IconCertificate size={24} color="#006e28" />}
              title="Pharmacy License"
              status="verified"
              date="2023-12-01"
            />
            
            <Document
              icon={<IconShield size={24} color="#f59e0b" />}
              title="Liability Insurance"
              status="pending"
              date="2023-12-15"
            />
            
            <Document
              icon={<IconFileText size={24} color="#006e28" />}
              title="Resume"
              status="verified"
              date="2023-11-30"
            />
          </Box>

          <Box mt="xl">
            <Title order={4} mb="md">Additional Information</Title>
            <List spacing="sm">
              <List.Item>
                <Text fw={500}>Languages</Text>
                <Text size="sm" c="dimmed">English, Spanish</Text>
              </List.Item>
              <List.Item>
                <Text fw={500}>Certifications</Text>
                <Text size="sm" c="dimmed">Board Certified Pharmacotherapy Specialist (BCPS)</Text>
              </List.Item>
              <List.Item>
                <Text fw={500}>Availability</Text>
                <Text size="sm" c="dimmed">Full-time, Weekends</Text>
              </List.Item>
            </List>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};