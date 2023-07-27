import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { CollectionFieldProps, CollectionFormInput } from '../../../interfaces/nft-forms';
import LoadingSpinner from '../../loaders/LoadingSpinner';
import SuccessComponent from '../../messages/SuccessComponent';
import ErrorComponent from '../../messages/ErrorComponent';
import { createCollection } from '../../../api/collection';
import { useAuth } from '../../../hooks/useAuth';

const CollectionAttributeField: React.FC<CollectionFieldProps> = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'CollectionAttributesList',
  });

  const nftTraitOptions = ['Background', 'Character', 'Accessory']; // Define your options here

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className='flex flex-col'>
          <select {...register(`CollectionAttributesList.${index}.trait_type`)} required className='border p-2 rounded'>
            <option disabled defaultValue="" value=""> -- select a trait type -- </option>
            {nftTraitOptions.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input defaultValue={field.value} {...register(`CollectionAttributesList.${index}.value`)} required placeholder='Value' className='border p-2 rounded' />
          <input defaultValue={field.percentage} {...register(`CollectionAttributesList.${index}.percentage`)} required placeholder='Percentage' type="number" className='border p-2 rounded' />
          <button type='button' onClick={() => remove(index)} className='ml-2 text-red-500'>Remove</button>
        </div>
      ))}
      <button type='button' onClick={() => append({ trait_type: '', value: '', percentage: 0 })} className='mt-2 text-blue-500'>Add Attribute</button>
    </div>
  );
};

const CollectionForm = () => {
  const { register, control, handleSubmit } = useForm<CollectionFormInput>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CollectionFormInput> = async (data) => {
      if(user) { 
        setIsLoading(true);
        try {

          const collection: CollectionFormInput = {
            CollectionPublished: false,
            CollectionName: data.CollectionName,
            CollectionDescription: data.CollectionDescription,
            CollectionBasePrice: data.CollectionBasePrice,
            NFTClass: data.NFTClass,
            CollectionTotalNumberOfNFTs: data.CollectionTotalNumberOfNFTs,
            CollectionAttributesList: data.CollectionAttributesList,
          };

          await createCollection(collection, user);
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
  }

  const nftClassOptions = ['Bronze', 'Silver', 'Gold', 'Platinum']; // Define your options here

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
          <form onSubmit={handleSubmit(onSubmit)} className='p-8'>
            <h2 className="text-xl font-semibold mb-8 text-center">Create New Collection</h2>
            <label className="block text-sm mb-2">Collection Name:</label>
            <input {...register('CollectionName')} required type='text' placeholder='Collection name' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">Collection Description:</label>
            <textarea {...register('CollectionDescription')} placeholder='Collection description' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">NFT Class:</label>
            <Controller 
              name='NFTClass' 
              control={control}
              defaultValue={nftClassOptions[0]} // set default value
              render={({ field }) => (
                <select {...field} required className='block w-full border p-2 rounded mb-6'>
                  {nftClassOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            />
            <label className="block text-sm mb-2">Total Number of NFTs in Collection:</label>
            <input {...register('CollectionTotalNumberOfNFTs')} required placeholder='Total number of NFTs' type='number' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">Base Price:</label>
            <input {...register('CollectionBasePrice')} required placeholder='Base price' type='number' step='0.01' className='block w-full border p-2 rounded mb-6' />
            <label className="block text-sm mb-2">Attributes:</label>
            <CollectionAttributeField control={control} register={register} />
            <button type='submit' className='mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded'>Create</button>
          </form>
        )}
      </div>
    </div> 
  );
};

export default CollectionForm;
