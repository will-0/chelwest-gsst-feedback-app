import React from 'react';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Patient } from '@/state/api';
import { userId } from '@/constants/dev';
import { Badge, BadgeIcon, BadgeText } from '../ui/badge';
import { CheckIcon, HelpCircleIcon, MessageCircleIcon, TrashIcon } from '../ui/icon';

interface PatientCardProps {
    index: number;
    patient: Patient;
    isSuccess: boolean;
}

export default function PatientCard({ index, patient, isSuccess }: PatientCardProps) {

    const yourRating = patient.ratings.find(rating => rating.rater === userId)?.rating;
    const consRating = patient.ratings.find(rating => rating.is_consultant)?.rating;
    return (
        <Box key={index} className='p-4 bg-secondary-200 rounded-lg shadow-sm shadow-secondary-500 flex flex-row justify-between items-center'>
            <Heading size='md'>MRN: {patient.mrn}</Heading>
            <Box className='flex flex-row gap-1'>
                {
                    consRating !== undefined &&
                    <Badge className='rounded-lg bg-green-200' size="lg" variant="solid" action="muted">
                        <BadgeText>{consRating}</BadgeText>
                        <BadgeIcon as={CheckIcon} className="ml-2" />
                    </Badge>
                }
                <Badge className='rounded-lg bg-orange-200' size="lg" variant="solid" action="muted">
                    <BadgeText>{yourRating}</BadgeText>
                    <BadgeIcon as={MessageCircleIcon} className="ml-2" />
                </Badge>
            </Box>
        </Box>
    );
};