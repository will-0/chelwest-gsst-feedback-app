import React, { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Patient, useCreatePatientMutation } from '@/state/api';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronDownIcon } from '../ui/icon';

export default function PatientForm() {
    const [mrn, setMrn] = useState('');
    const [rating, setRating] = useState('');
    const [rater, setRater] = useState('');
    const [isConsultant, setIsConsultant] = useState<boolean | null>(null);

    const [addPatient, { isLoading, isSuccess, isError }] = useCreatePatientMutation();
    const safeInsets = useSafeAreaInsets();

    const handleSubmit = async () => {
        if (mrn && rating && rater && isConsultant !== null) {
            try {
                const newPatient: Patient = {
                    mrn,
                    ratings: [{
                        rating: parseInt(rating),
                        rater: parseInt(rater),
                        is_consultant: isConsultant,
                    }]
                };
                await addPatient(newPatient).unwrap();
                setMrn('');
                setRating('');
                setRater('');
                setIsConsultant(null);
            } catch (e) {
                console.error('Submission failed', e);
            }
        }
    };

    return (
        <VStack className='p-8 w-full gap-4 items-center'>
            <Input>
                <InputField
                    placeholder="Enter MRN"
                    onChangeText={setMrn}
                />
            </Input>
            <Select className="w-full" onValueChange={setRating}>
                <SelectTrigger variant="outline" size="md" >
                    <SelectInput className='flex-1' placeholder="Select option" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent style={{paddingBottom: safeInsets.bottom}}>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                            <SelectItem key={c} label={`${c}`} value={`${c}`}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>

            <Button
                className='bg-primary-400'
                onPress={handleSubmit}
                isDisabled={!mrn || !rating || !rater || isConsultant === null}
            >
                <Text className='text-typography-0'>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Text>
            </Button>

            {
                isSuccess ?
                    <Text>Patient added!</Text>
                    : isError ?
                        <Text>Something went wrong.</Text>
                        : <Text></Text>
            }
        </VStack>
    );
}