'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './schema';
import toast from 'react-hot-toast';
import type { FormData } from '@/types';
import { usePostData } from '@/lib/hooks';

interface FormProps {
  readonly onSubmit: SubmitHandler<FormData>;
}

export default function Form({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      text: '',
      file1: undefined,
      file2: undefined,
    },
  });

  const { isSubmitting: isMutating } = usePostData();

  const handleFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const formData = new FormData();
    formData.append('text', data.text);
    if (data.file1[0]) formData.append('file1', data.file1[0]);
    if (data.file2[0]) formData.append('file2', data.file2[0]);

    onSubmit(data);
    toast.success('Profile updated successfully!', {
      duration: 4000,
      position: 'top-right',
      icon: '🎉',
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label
          htmlFor="text"
          className="text-sm font-medium text-gray-900 mb-1"
        >
          Bio
        </label>
        <input
          id="text"
          type="text"
          placeholder="Enter bio"
          className={`w-full p-2 border rounded-lg ${
            errors.text ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register('text')}
        />
        {errors.text && (
          <span className="text-red-500 text-sm mt-1">
            {errors.text.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="file1"
          className="text-sm font-medium text-gray-900 mb-1"
        >
          Avatar (File 1)
        </label>
        <input
          id="file1"
          type="file"
          className={`w-full p-2 border rounded-lg ${
            errors.file1 ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register('file1')}
        />
        {errors.file1 && (
          <span className="text-red-500 text-sm mt-1">
            {errors.file1.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="file2"
          className="text-sm font-medium text-gray-900 mb-1"
        >
          Resume (File 2)
        </label>
        <input
          id="file2"
          type="file"
          className={`w-full p-2 border rounded-lg ${
            errors.file2 ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register('file2')}
        />
        {errors.file2 && (
          <span className="text-red-500 text-sm mt-1">
            {errors.file2.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting || isMutating}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          !isValid || isSubmitting || isMutating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {isSubmitting || isMutating ? 'Submitting...' : 'Send POST'}
      </button>
    </form>
  );
}
