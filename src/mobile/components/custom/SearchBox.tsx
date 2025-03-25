import { Box } from '@/components/ui/box';
import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';

export default function AppSearchBox({search, setSearch}: {search: string, setSearch: (value: string) => void}) {
    return <Box className='w-full p-2'>
      <Input>
        <InputField value={search} onChangeText={setSearch} />
        <InputSlot className='pr-4'>
          <InputIcon as={SearchIcon} />
        </InputSlot>
      </Input>
    </Box>;
  }
  