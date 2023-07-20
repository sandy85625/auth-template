import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { createCollection } from '../../../api/collection';
import { INFTClassFieldProps, INFTFormInput } from '../../../interfaces';
import { useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import LoadingSpinner from '../../loaders/LoadingSpinner';
import SuccessComponent from '../../messages/SuccessComponent';
import ErrorComponent from '../../messages/ErrorComponent';


const NFTMetadataField: React.FC<INFTClassFieldProps> = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nft_metadatas',
  });

  const nftClassOptions = ['Bronze', 'Silver', 'Gold', 'Platinum']; // Define your options here

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className='flex flex-col'>
          <select {...register(`nft_metadatas.${index}.trait_class`)} className='border p-2 rounded'>
            <option disabled defaultValue="" value=""> -- select a trait class -- </option>
            {nftClassOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input defaultValue={field.trait_name} {...register(`nft_metadatas.${index}.trait_name`)} placeholder='Trait Name' className='border p-2 rounded' />
          <input defaultValue={field.trait_value} {...register(`nft_metadatas.${index}.trait_value`)} placeholder='Trait Value' className='border p-2 rounded' />
          <div className='flex flex-row items-justify'>
            <input defaultValue={field.trait_count} {...register(`nft_metadatas.${index}.trait_count`)} placeholder='Trait Count' className='border p-2 rounded' />
            <button type='button' onClick={() => remove(index)} className='ml-2 text-red-500'>
              Remove
            </button>
          </div>
        </div>
      ))}
      <button type='button' onClick={() => append({ trait_class: '', trait_name: '', trait_value: '', trait_count: 0 })} className='mt-2 text-blue-500'>
        Add Metadata
      </button>
    </div>
  );
};


const NFTForm = () => {
  const { register, control, handleSubmit } = useForm<INFTFormInput>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const onSubmit: SubmitHandler<INFTFormInput> = async (data) => {
    if(user) { 
      setIsLoading(true);
      try {
        await createCollection(data, user);
        setSuccessMessage(true);
      } catch (error: any) {
        setErrorMessage(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage(true);
    }
  };

  // Reset function
  const resetForm = () => {
    setSuccessMessage(false);
    setErrorMessage(false);
  }

  return (
    <div className="py-10 flex items-center justify-center">
      <div className={`items-center justify-center w-1/2 min-h-screen bg-white rounded-lg shadow-md`}>
        {isLoading ? (
          <LoadingSpinner />
        ) : successMessage ? (
          <SuccessComponent message="Collection created successfully!" reset={resetForm} />
        ) : errorMessage ? (
          <ErrorComponent message="Error creating collection" reset={resetForm} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='p-8'>
              <h2 className="text-xl font-semibold mb-8 text-center">Create New Collection</h2>
              <label className="block text-sm mb-2">Name:</label>
              <input {...register('name')} type='text' placeholder='Collection name' className='block w-full border p-2 rounded mb-6' />
              <label className="block text-sm mb-2">Description:</label>
              <textarea {...register('description')} placeholder='Collection description' className='block w-full border p-2 rounded mb-6' />
              <label className="block text-sm mb-2">Base Price:</label>
              <input {...register('nft_base_price')} placeholder='Collection base price' type='number' className='block w-full border p-2 rounded mb-6' />
              <label className="block text-sm mb-2">External Url:</label>
              <input {...register('nft_external_url')} placeholder='Collection URL' type='url' className='block w-full border p-2 rounded mb-6' />
              <label className="block text-sm mb-2">Metadata:</label>
              <NFTMetadataField control={control} register={register}/>
              <button type='submit' className='mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded'>
                  Create
              </button>
          </form>
          )
        }
      </div>
  </div> 
  );
};

export default NFTForm;
