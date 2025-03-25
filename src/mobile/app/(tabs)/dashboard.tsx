import BaseView from '@/components/BaseView';
import PatientCard from '@/components/custom/PatientCard';
import AppSearchBox from '@/components/custom/SearchBox';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useGetPatientsQuery } from '@/state/api';
import { useState } from 'react';
import { ScrollView } from 'react-native';

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
        <AppSearchBox search={search} setSearch={setSearch} />
        <ScrollView className='w-full'>
          <Box className='flex flex-col gap-4 w-full p-2'>
            {
              patients?.filter((value) => {
                if (search === '') {
                  return value;
                }
                else if (value.mrn.toLowerCase().startsWith(search.toLowerCase())) {
                  return value;
                }
              }).map((patient, index) => <PatientCard key={index} index={index} patient={patient} isSuccess={isSuccess} />)
            }
          </Box>
        </ScrollView>
      </Box>
    </BaseView>
  );
}
