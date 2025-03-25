import React, { useEffect, useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Patient, useCreatePatientMutation } from '@/state/api';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronDownIcon } from '@/components/ui/icon';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { userId } from '@/constants/dev';

export default function PatientForm() {
    const [mrn, setMrn] = useState<string | undefined>(undefined);
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [clearFormToggle, setClearFormToggle] = useState<number>(0);

    const [addPatient, { isLoading }] = useCreatePatientMutation();
    const safeInsets = useSafeAreaInsets();
    const toast = useToast()
    const [toastId, setToastId] = React.useState("0")
    const handleToast = (message: string) => {
      if (!toast.isActive(toastId)) {
        showNewToast(message)
      }
    }
    const showNewToast = (message: string) => {
      const newId = `${Math.random()}`
      setToastId(newId)
      toast.show({
        id: newId,
        placement: "top",
        duration: 3000,
        render: ({ id }: {id: string}) => {
          const uniqueToastId = "toast-" + id
          return (
            <Toast nativeID={uniqueToastId} action="muted" variant="solid">
              <ToastTitle>Message</ToastTitle>
              <ToastDescription>
                {message}
              </ToastDescription>
            </Toast>
          )
        },
      })
    }

    const handleSubmit = async () => {
        if (mrn && rating !== undefined) {
            try {
                const newPatient: Patient = {
                    mrn,
                    ratings: [{
                        rating: rating,
                        rater: userId,
                        is_consultant: false,
                    }]
                };
                await addPatient(newPatient).unwrap();
                setMrn(undefined);
                setRating(undefined);
                handleToast("Patient added!")
                clearFormToggle === 0 ? setClearFormToggle(1) : setClearFormToggle(0);
            } catch (e) {
                console.error('Submission failed', e);
                handleToast("Failed to add patient")
            }
        }
    };

    return (
        <VStack className='p-8 w-full gap-4 items-center'>
            <Input>
                <InputField
                    value={mrn}
                    placeholder="Enter MRN"
                    onChangeText={setMrn}
                />
            </Input>
            <Select key={clearFormToggle} className="w-full" onValueChange={(rating) => setRating(parseInt(rating))}>
                <SelectTrigger variant="outline" size="md" >
                    <SelectInput className='flex-1' placeholder="Add Rating" />
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
                isDisabled={(mrn === undefined) || (rating === undefined) || isLoading}
            >
                <Text className='text-typography-0'>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Text>
            </Button>
        </VStack>
    );
}