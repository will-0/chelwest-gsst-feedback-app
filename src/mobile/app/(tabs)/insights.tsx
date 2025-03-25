import BaseView from '@/components/BaseView';
import PatientForm from '@/components/custom/PatientForm';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { userId } from '@/constants/dev';
import { Patient, useCreatePatientMutation, useDeletePatientMutation } from '@/state/api';

export default function HomeScreen() {

  const [createPatient, { isLoading }] = useCreatePatientMutation();
  const [deletePatients] = useDeletePatientMutation();

  const makeSomePatients = () => {
    for (let i = 0; i < 3; i++) {
      const patient: Patient = {
        mrn: `${Math.floor(Math.random() * 1000000)}`,
        ratings: [{
          rating: Math.floor(Math.random() * 10),
          rater: userId,
          is_consultant: false,
        }]
      }
      createPatient(patient);
    }
    for (let i = 0; i < 3; i++) {
      const consScore = Math.floor(Math.random() * 10);
      
      const patient: Patient = {
        mrn: `${Math.floor(Math.random() * 1000000)}`,
        ratings: [{
          rating: Math.floor(Math.random() * 10),
          rater: userId,
          is_consultant: false,
        },
        {
          rating: Math.floor(Math.random() * 10),
          rater: 3,
          is_consultant: true,
        }]
      }
      createPatient(patient);
    }
  }
  return (
    <BaseView>
      <Box className='flex-1 justify-center items-center w-full gap-4 p-8'>
        <Heading>In Progress...</Heading>
        <Box className='w-full bg-secondary-200 flex flex-col justify-between items-start p-4 gap-2'>
          <Heading>DEVELOPMENT SECTION</Heading>
          <Text>Use button below to reset all data</Text>
          <Button onPress={() => deletePatients("placeholder")}>
            <ButtonText>Reset all</ButtonText>
          </Button>
          <Text>Use button below to make some fake data</Text>
          <Button onPress={makeSomePatients}>
            <ButtonText>Generate Fake Data</ButtonText>
          </Button>
        </Box>
      </Box>
    </BaseView>
  );
}