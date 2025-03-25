import BaseView from '@/components/BaseView';
import PatientForm from '@/components/custom/PatientForm';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useGetPatientsQuery } from '@/state/api';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from 'react-native-screens';

export default function HomeScreen() {

  const {
    data: patients,
    isSuccess
  } = useGetPatientsQuery();

  const [search, setSearch] = useState('');

  return (
    <BaseView>
      <Box className='flex flex-1 flex-col justify-start items-center w-full p-8 gap-4'>
        <Heading size="2xl">Ratings</Heading>
        <Input>
          <InputField value={search} onChangeText={setSearch} />
          <InputSlot className='pr-4'>
            <InputIcon as={SearchIcon} />
          </InputSlot>
        </Input>
        <ScrollView className='w-full'>
          <Box className='flex flex-col gap-4 w-full'>
            {
              patients?.filter((value) => {
                if (search === '') {
                  return value;
                }
                else if (value.mrn.toLowerCase().startsWith(search.toLowerCase())) {
                  return value;
                }
              }).map((patient, index) => (
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