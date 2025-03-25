import BaseView from '@/components/BaseView';
import PatientForm from '@/components/custom/PatientForm';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <BaseView>
      <Box className='flex-1 justify-center items-center w-full'>
        <Heading>In Progress...</Heading>
      </Box>
    </BaseView>
  );
}