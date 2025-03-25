import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Patient } from '@/state/api';

export default function PatientCard(index: number, patient: Patient, isSuccess: boolean) {
    return (
        <Box key={index} className='w-full p-4 bg-secondary-300 rounded-lg'>
            <Heading size='lg' className='mb-2'>{patient.mrn}</Heading>
            <Box className='flex flex-row justify-between items-center'>
                <Heading size='md'>Ratings</Heading>
                <Box className='flex flex-row'>
                    {isSuccess && patient.ratings.map((rating, index) => (
                        <Box key={index} className='bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mx-1'>
                            <Heading size='sm'>{rating.rating}</Heading>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}