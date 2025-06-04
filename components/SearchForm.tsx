import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';

const SearchForm = ({query} : {query?: string}) => {

  return (
    <Form action = "/" scroll = {false} className='search-form'>
      <input type="text" 
        name='query'
        defaultValue=''
        className='search-input'
        placeholder='searchstartups'
      />

      <div className='flex gap-2'>
        {query && (<SearchFormReset />)}

        <button type='submit' className='search-btn text-white'>
            <search className='size-5' />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
