import * as yup from 'yup';

import type { FormData } from '@/types';

export const formSchema: yup.ObjectSchema<FormData> = yup.object().shape({
  text: yup
    .string()
    .required('Text is required')
    .min(3, 'At least 3 characters'),
  file1: yup
    .mixed<FileList>()
    .required('File 1 required')
    .test(
      'size',
      'Max 2MB',
      (value) => !value?.[0]?.size || value[0].size <= 2 * 1024 * 1024
    )
    .test(
      'type',
      'JPEG/PNG/PDF only',
      (value) =>
        value &&
        value[0] &&
        ['image/jpeg', 'image/png', 'application/pdf'].includes(value[0].type)
    ),
  file2: yup
    .mixed<FileList>()
    .required('File 2 required')
    .test(
      'size',
      'Max 2MB',
      (value) => !value?.[0]?.size || value[0].size <= 2 * 1024 * 1024
    )
    .test(
      'type',
      'JPEG/PNG/PDF only',
      (value) =>
        value &&
        value[0] &&
        ['image/jpeg', 'image/png', 'application/pdf'].includes(value[0].type)
    ),
});
