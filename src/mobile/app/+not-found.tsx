import BaseView from '@/components/BaseView';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function NotFound() {
  return (
    <BaseView>
      <Box className='flex-1 justify-center items-center'>
        <Heading size="md">Not Found</Heading>
      </Box>
    </BaseView>
  );
}