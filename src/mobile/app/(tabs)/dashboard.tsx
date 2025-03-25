import BaseView from '@/components/BaseView';
import PatientForm from '@/components/custom/PatientForm';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useGetPatientsQuery } from '@/state/api';
import { ScrollView } from 'react-native';
import { SearchBar } from 'react-native-screens';

export default function HomeScreen() {

  const {
    data: patients,
    isSuccess
  } = useGetPatientsQuery();

  return (
    <BaseView>
      <Box className='flex flex-1 flex-col justify-start items-center w-full p-8'>
        <Heading size="2xl">Ratings</Heading>
        <ScrollView className='w-full'>
          <Box className='flex flex-col gap-4 w-full pl-0 pr-0 pt-4 pb-4'>
            {
              patients?.map((patient, index) => (
                <Box key={index} className='w-full p-4 bg-secondary-300 rounded-lg'>
                  <Heading size='lg' className='mb-2'>{patient.mrn}</Heading>
                  <Box className='flex flex-row justify-between items-center'>
                    <Heading size='md'>Ratings</Heading>
                    <Box className='flex flex-row'>
                      {
                        isSuccess && patient.ratings.map((rating, index) => (
                          <Box key={index} className='bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mx-1'>
                            <Heading size='sm'>{rating.rating}</Heading>
                          </Box>
                        ))
                      }
                    </Box>
                  </Box>
                </Box>
              ))
            }
          </Box>
        </ScrollView>
      </Box>
    </BaseView>
  );
}