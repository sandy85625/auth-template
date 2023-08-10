import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { ProgramFormInput } from '../../../interfaces/nft-forms';
import LoadingSpinner from '../../loaders/LoadingSpinner';
import SuccessComponent from '../../messages/SuccessComponent';
import ErrorComponent from '../../messages/ErrorComponent';
import { ICollection, fetchAllCollectionsByUserUID } from '../../../api/collection';
import { useAuth } from '../../../hooks/useAuth';
import { createProgram } from '../../../api/program';

const CollectionForm = () => {
  const { register, control, handleSubmit } = useForm<ProgramFormInput>({
        defaultValues: {
          ProgramCollections: [],
          ProgramIntrestedUsers: []
        }
      });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<ICollection[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
        if(user) fetchAllCollectionsByUserUID(user.uid)
        .then(setCollections)
        .catch(setErrorMessage)
    }

    fetchData()
  }, [user])
  
  const onSubmit: SubmitHandler<ProgramFormInput> = async (data) => {
      if(user) { 
        setIsLoading(true);
        try {

          const program: ProgramFormInput = {
            ProgramName: data.ProgramName,
            ProgramDescription: data.ProgramDescription,
            ProgramCollections: data.ProgramCollections,
            ProgramIntrestedUsers: data.ProgramIntrestedUsers
          };
          
          await createProgram(program, user);
          setSuccessMessage('Collection created successfully!');
        } catch (error: any) {
          setErrorMessage('Error creating collection');
        } finally {
          setIsLoading(false);
        }
      } else {
        setErrorMessage('Please login to create a collection');
      }
  };

  // Reset function
  const resetForm = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="py-10 flex items-center justify-center">
      <div className={`items-center justify-center w-1/2 min-h-screen bg-white rounded-lg shadow-md`}>
        {isLoading ? (
          <LoadingSpinner />
        ) : successMessage ? (
          <SuccessComponent message={successMessage} reset={resetForm} />
        ) : errorMessage ? (
          <ErrorComponent message={errorMessage} reset={resetForm} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <h2 className="text-xl font-semibold mb-8 text-center">Create New Program</h2>
            <label className="block text-sm mb-2">Program Name:</label>
            <input {...register('ProgramName')} required type='text' placeholder='Collection name' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">Program Description:</label>
            <textarea {...register('ProgramDescription')} placeholder='Collection description' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">Add Collections:</label>
            <Controller
                name="ProgramCollections"
                control={control}
                render={({ field }) => (
                    <select
                    multiple
                    ref={field.ref}
                    className="block w-full border p-2 rounded mb-6"
                    onChange={e => {
                        // Get selected values from the select element
                        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                        field.onChange(selectedValues); // Update the form with selected values
                    }}
                    >
                    {collections?.map((collection, index) => (
                        <option key={index} value={collection.id}>
                        {collection.CollectionName}
                        </option>
                    ))}
                    </select>
                )}
                />
            <button type="submit" className="mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded">
              Create
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CollectionForm;
